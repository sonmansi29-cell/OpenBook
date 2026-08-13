from django.conf import settings
from django.db import models
from books.models import Book


class CartItem(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="cart_items")
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="cart_items")
    quantity = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [models.UniqueConstraint(fields=("user", "book"), name="unique_cart_book_per_user")]
        ordering = ["-updated_at"]
