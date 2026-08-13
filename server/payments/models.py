from django.db import models
from orders.models import Order


class Payment(models.Model):
    class Status(models.TextChoices):
        CREATED = "created", "Created"
        PAID = "paid", "Paid"
        FAILED = "failed", "Failed"

    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name="payment")
    provider = models.CharField(max_length=30, default="razorpay")
    provider_order_id = models.CharField(max_length=100, unique=True)
    provider_payment_id = models.CharField(max_length=100, blank=True)
    signature = models.CharField(max_length=255, blank=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.CREATED)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
