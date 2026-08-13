from django.conf import settings
from django.db import models
from books.models import Book


class WishlistItem(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="wishlist_items")
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="wishlisted_by")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [models.UniqueConstraint(fields=("user", "book"), name="unique_wishlist_book_per_user")]
        ordering = ["-created_at"]
