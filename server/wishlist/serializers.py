from rest_framework import serializers
from books.serializers import BookSerializer
from .models import WishlistItem


class WishlistItemSerializer(serializers.ModelSerializer):
    book = BookSerializer(read_only=True)

    class Meta:
        model = WishlistItem
        fields = ("id", "book", "created_at")
