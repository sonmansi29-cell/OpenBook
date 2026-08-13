from django.contrib import admin
from django.urls import include, path
from books.views import BookDetailView, BookListCreateView
from wishlist.views import WishlistAddView, WishlistRemoveView, WishlistView
from cart.views import CartAddView, CartRemoveView, CartUpdateView, CartView
from orders.views import OrderDetailView, OrderListCreateView
from reviews.views import BookReviewListView, ReviewCreateView
from payments.views import RazorpayOrderView, RazorpayVerifyView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/", include("accounts.urls")),
    path("api/books", BookListCreateView.as_view()),
    path("api/books/", BookListCreateView.as_view()),
    path("api/books/<int:pk>", BookDetailView.as_view()),
    path("api/books/<int:pk>/", BookDetailView.as_view()),
    path("api/wishlist", WishlistView.as_view()),
    path("api/wishlist/add", WishlistAddView.as_view()),
    path("api/wishlist/remove", WishlistRemoveView.as_view()),
    path("api/cart", CartView.as_view()),
    path("api/cart/add", CartAddView.as_view()),
    path("api/cart/update", CartUpdateView.as_view()),
    path("api/cart/remove", CartRemoveView.as_view()),
    path("api/orders", OrderListCreateView.as_view()),
    path("api/orders/<int:pk>", OrderDetailView.as_view()),
    path("api/reviews", ReviewCreateView.as_view()),
    path("api/reviews/book/<int:book_id>", BookReviewListView.as_view()),
    path("api/payments/razorpay/order", RazorpayOrderView.as_view()),
    path("api/payments/razorpay/verify", RazorpayVerifyView.as_view()),
]
