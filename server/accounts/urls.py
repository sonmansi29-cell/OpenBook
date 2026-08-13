from django.urls import path
from .views import LoginView, LogoutView, ProfileView, RegisterView

urlpatterns = [
    path("register", RegisterView.as_view(), name="register"),
    path("register/", RegisterView.as_view()),
    path("login", LoginView.as_view(), name="login"),
    path("login/", LoginView.as_view()),
    path("logout", LogoutView.as_view(), name="logout"),
    path("logout/", LogoutView.as_view()),
    path("profile", ProfileView.as_view(), name="profile"),
    path("profile/", ProfileView.as_view()),
]
