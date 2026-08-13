from rest_framework import serializers
from books.serializers import BookSerializer
from .models import CartItem


class CartItemSerializer(serializers.ModelSerializer):
    book = BookSerializer(read_only=True)
    subtotal = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ("id", "book", "quantity", "subtotal", "created_at", "updated_at")

    def get_subtotal(self, obj):
        return obj.book.price * obj.quantity
