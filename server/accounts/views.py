from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Profile
from .serializers import ProfileUpdateSerializer, RegisterSerializer, UserSerializer


def token_pair_for(user):
    refresh = RefreshToken.for_user(user)
    return {"refresh": str(refresh), "access": str(refresh.access_token)}


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        Profile.objects.get_or_create(user=user)
        return Response({"user": UserSerializer(user).data, "tokens": token_pair_for(user)}, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email", "")
        password = request.data.get("password", "")
        user = authenticate(request, username=email, password=password)
        if user is None:
            return Response({"detail": "Invalid email or password."}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({"user": UserSerializer(user).data, "tokens": token_pair_for(user)})


class LogoutView(APIView):
    def post(self, request):
        refresh = request.data.get("refresh")
        if not refresh:
            return Response({"refresh": ["This field is required."]}, status=status.HTTP_400_BAD_REQUEST)
        try:
            RefreshToken(refresh).blacklist()
        except Exception:
            return Response({"detail": "Invalid or expired refresh token."}, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_204_NO_CONTENT)


class ProfileView(APIView):
    def get(self, request):
        Profile.objects.get_or_create(user=request.user)
        return Response(UserSerializer(request.user).data)

    def put(self, request):
        serializer = ProfileUpdateSerializer(request.user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(UserSerializer(user).data)
