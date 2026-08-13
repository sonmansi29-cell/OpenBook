from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from books.models import Book


class Review(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="reviews")
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="reviews")
    rating = models.PositiveSmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [models.UniqueConstraint(fields=("user", "book"), name="unique_review_per_user_book")]
        ordering = ["-created_at"]
