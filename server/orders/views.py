from decimal import Decimal
from django.db import transaction
from rest_framework import generics, status
from rest_framework.response import Response
from cart.models import CartItem
from .models import Order, OrderItem
from .serializers import OrderSerializer


class OrderListCreateView(generics.ListCreateAPIView):
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).prefetch_related("items__book")

    def create(self, request, *args, **kwargs):
        with transaction.atomic():
            cart_items = list(CartItem.objects.select_for_update().select_related("book").filter(user=request.user))
            if not cart_items:
                return Response({"detail": "Your cart is empty."}, status=status.HTTP_400_BAD_REQUEST)
            unavailable = [item.book.title for item in cart_items if item.quantity > item.book.stock]
            if unavailable:
                return Response({"detail": "Insufficient stock.", "books": unavailable}, status=status.HTTP_400_BAD_REQUEST)
            total = sum((item.book.price * item.quantity for item in cart_items), Decimal("0.00"))
            order = Order.objects.create(user=request.user, total=total, shipping_address=request.data.get("shipping_address", {}))
            OrderItem.objects.bulk_create([
                OrderItem(order=order, book=item.book, title=item.book.title, unit_price=item.book.price, quantity=item.quantity)
                for item in cart_items
            ])
            for item in cart_items:
                item.book.stock -= item.quantity
                item.book.save(update_fields=["stock"])
            CartItem.objects.filter(pk__in=[item.pk for item in cart_items]).delete()
        return Response(OrderSerializer(Order.objects.prefetch_related("items__book").get(pk=order.pk)).data, status=status.HTTP_201_CREATED)


class OrderDetailView(generics.RetrieveAPIView):
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).prefetch_related("items__book")
