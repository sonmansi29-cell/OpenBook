from django.db import IntegrityError
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from books.models import Book
from .models import Review
from .serializers import ReviewSerializer


class ReviewCreateView(APIView):
    def post(self, request):
        book_id = request.data.get("book_id")
        if not book_id:
            return Response({"book_id": ["This field is required."]}, status=status.HTTP_400_BAD_REQUEST)
        try:
            book = Book.objects.get(pk=book_id)
        except Book.DoesNotExist:
            return Response({"book_id": ["Book not found."]}, status=status.HTTP_404_NOT_FOUND)
        serializer = ReviewSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            review = Review.objects.create(user=request.user, book=book, **serializer.validated_data)
        except IntegrityError:
            return Response({"detail": "You have already reviewed this book."}, status=status.HTTP_400_BAD_REQUEST)
        return Response(ReviewSerializer(review).data, status=status.HTTP_201_CREATED)


class BookReviewListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, book_id):
        reviews = Review.objects.filter(book_id=book_id).select_related("user")
        return Response(ReviewSerializer(reviews, many=True).data)
