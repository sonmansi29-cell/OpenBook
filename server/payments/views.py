from decimal import Decimal
from django.conf import settings
from django.db import transaction
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from orders.models import Order
from .models import Payment


def razorpay_client():
    if not settings.RAZORPAY_KEY_ID or not settings.RAZORPAY_KEY_SECRET:
        return None
    import razorpay
    return razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))


class RazorpayOrderView(APIView):
    def post(self, request):
        order_id = request.data.get("order_id")
        if not order_id:
            return Response({"order_id": ["This field is required."]}, status=status.HTTP_400_BAD_REQUEST)
        try:
            order = Order.objects.get(pk=order_id, user=request.user)
        except Order.DoesNotExist:
            return Response({"order_id": ["Order not found."]}, status=status.HTTP_404_NOT_FOUND)
        if order.status == Order.Status.PAID:
            return Response({"detail": "This order has already been paid."}, status=status.HTTP_400_BAD_REQUEST)
        existing = getattr(order, "payment", None)
        if existing and existing.status == Payment.Status.CREATED:
            return Response({"key_id": settings.RAZORPAY_KEY_ID, "razorpay_order_id": existing.provider_order_id, "amount": int(order.total * Decimal("100")), "currency": "INR"})
        client = razorpay_client()
        if client is None:
            return Response({"detail": "Razorpay is not configured."}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
        gateway_order = client.order.create({"amount": int(order.total * Decimal("100")), "currency": "INR", "receipt": f"openbook-{order.pk}"})
        payment, _ = Payment.objects.update_or_create(order=order, defaults={"provider_order_id": gateway_order["id"], "provider": "razorpay", "status": Payment.Status.CREATED})
        return Response({"key_id": settings.RAZORPAY_KEY_ID, "razorpay_order_id": payment.provider_order_id, "amount": gateway_order["amount"], "currency": gateway_order["currency"]}, status=status.HTTP_201_CREATED)


class RazorpayVerifyView(APIView):
    def post(self, request):
        order_id = request.data.get("order_id")
        payment_id = request.data.get("razorpay_payment_id")
        signature = request.data.get("razorpay_signature")
        if not all((order_id, payment_id, signature)):
            return Response({"detail": "order_id, razorpay_payment_id, and razorpay_signature are required."}, status=status.HTTP_400_BAD_REQUEST)
        client = razorpay_client()
        if client is None:
            return Response({"detail": "Razorpay is not configured."}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
        try:
            payment = Payment.objects.select_related("order").get(order_id=order_id, order__user=request.user, provider="razorpay")
        except Payment.DoesNotExist:
            return Response({"order_id": ["Payment order not found."]}, status=status.HTTP_404_NOT_FOUND)
        if payment.status == Payment.Status.PAID:
            return Response({"detail": "Payment has already been verified."}, status=status.HTTP_200_OK)
        try:
            client.utility.verify_payment_signature({"razorpay_order_id": payment.provider_order_id, "razorpay_payment_id": payment_id, "razorpay_signature": signature})
        except Exception:
            return Response({"detail": "Payment signature verification failed."}, status=status.HTTP_400_BAD_REQUEST)
        with transaction.atomic():
            payment.status = Payment.Status.PAID
            payment.provider_payment_id = payment_id
            payment.signature = signature
            payment.save(update_fields=["status", "provider_payment_id", "signature", "updated_at"])
            payment.order.status = Order.Status.PAID
            payment.order.save(update_fields=["status", "updated_at"])
        return Response({"detail": "Payment verified.", "order_id": payment.order_id, "status": Order.Status.PAID})
