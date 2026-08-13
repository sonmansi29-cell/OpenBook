from rest_framework import serializers
from books.serializers import BookSerializer
from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    book = BookSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = ("id", "book", "title", "unit_price", "quantity")


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ("id", "status", "total", "shipping_address", "items", "created_at", "updated_at")
        read_only_fields = ("id", "status", "total", "items", "created_at", "updated_at")
