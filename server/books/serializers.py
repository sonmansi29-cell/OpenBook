from rest_framework import serializers
from .models import Book


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ("id", "title", "author", "description", "price", "category", "rating", "stock", "image", "badge", "created_at")
        read_only_fields = ("id", "created_at")
