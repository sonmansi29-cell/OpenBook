from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAdminUser
from .models import Book
from .serializers import BookSerializer


class BookListCreateView(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    http_method_names = ["get", "post", "head", "options"]

    def get_permissions(self):
        return [AllowAny()] if self.request.method == "GET" else [IsAdminUser()]


class BookDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    http_method_names = ["get", "put", "delete", "head", "options"]

    def get_permissions(self):
        return [AllowAny()] if self.request.method == "GET" else [IsAdminUser()]
