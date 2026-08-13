from rest_framework import serializers
from .models import Review


class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source="user.username", read_only=True)
    book_id = serializers.IntegerField(source="book.id", read_only=True)

    class Meta:
        model = Review
        fields = ("id", "book_id", "user", "rating", "comment", "created_at", "updated_at")
        read_only_fields = ("id", "created_at", "updated_at")
