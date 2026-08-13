from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from books.models import Book
from .models import CartItem
from .serializers import CartItemSerializer


def get_positive_quantity(data):
    try:
        quantity = int(data.get("quantity", 1))
    except (TypeError, ValueError):
        return None
    return quantity if quantity > 0 else None


class CartView(APIView):
    def get(self, request):
        items = CartItem.objects.filter(user=request.user).select_related("book")
        serialized = CartItemSerializer(items, many=True).data
        total = sum((item.book.price * item.quantity for item in items), 0)
        return Response({"items": serialized, "total": total})


class CartAddView(APIView):
    def post(self, request):
        book_id, quantity = request.data.get("book_id"), get_positive_quantity(request.data)
        if not book_id or not quantity:
            return Response({"detail": "book_id and a positive quantity are required."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            book = Book.objects.get(pk=book_id)
        except Book.DoesNotExist:
            return Response({"book_id": ["Book not found."]}, status=status.HTTP_404_NOT_FOUND)
        item, created = CartItem.objects.get_or_create(user=request.user, book=book, defaults={"quantity": quantity})
        if not created:
            item.quantity += quantity
            item.save(update_fields=["quantity", "updated_at"])
        return Response(CartItemSerializer(item).data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)


class CartUpdateView(APIView):
    def patch(self, request):
        book_id, quantity = request.data.get("book_id"), get_positive_quantity(request.data)
        if not book_id or not quantity:
            return Response({"detail": "book_id and a positive quantity are required."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            item = CartItem.objects.select_related("book").get(user=request.user, book_id=book_id)
        except CartItem.DoesNotExist:
            return Response({"book_id": ["Cart item not found."]}, status=status.HTTP_404_NOT_FOUND)
        item.quantity = quantity
        item.save(update_fields=["quantity", "updated_at"])
        return Response(CartItemSerializer(item).data)


class CartRemoveView(APIView):
    def delete(self, request):
        book_id = request.data.get("book_id")
        if not book_id:
            return Response({"book_id": ["This field is required."]}, status=status.HTTP_400_BAD_REQUEST)
        deleted, _ = CartItem.objects.filter(user=request.user, book_id=book_id).delete()
        if not deleted:
            return Response({"book_id": ["Cart item not found."]}, status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_204_NO_CONTENT)
