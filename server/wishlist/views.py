from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from books.models import Book
from .models import WishlistItem
from .serializers import WishlistItemSerializer


class WishlistView(APIView):
    def get(self, request):
        items = WishlistItem.objects.filter(user=request.user).select_related("book")
        return Response(WishlistItemSerializer(items, many=True).data)


class WishlistAddView(APIView):
    def post(self, request):
        book_id = request.data.get("book_id")
        if not book_id:
            return Response({"book_id": ["This field is required."]}, status=status.HTTP_400_BAD_REQUEST)
        try:
            book = Book.objects.get(pk=book_id)
        except Book.DoesNotExist:
            return Response({"book_id": ["Book not found."]}, status=status.HTTP_404_NOT_FOUND)
        item, created = WishlistItem.objects.get_or_create(user=request.user, book=book)
        return Response(WishlistItemSerializer(item).data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)


class WishlistRemoveView(APIView):
    def delete(self, request):
        book_id = request.data.get("book_id")
        if not book_id:
            return Response({"book_id": ["This field is required."]}, status=status.HTTP_400_BAD_REQUEST)
        deleted, _ = WishlistItem.objects.filter(user=request.user, book_id=book_id).delete()
        if not deleted:
            return Response({"book_id": ["Wishlist item not found."]}, status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_204_NO_CONTENT)
