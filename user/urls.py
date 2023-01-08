from django.urls import path, include
from rest_framework import routers

from user.views import CreateUserView, ChangeView, UsersViewSet

router = routers.DefaultRouter()
router.register("users", UsersViewSet)

app_name = "user"

urlpatterns = [
    path("", include(router.urls)),
    path("register/", CreateUserView.as_view(), name="create"),
    path("change/<int:pk>/", ChangeView.as_view(), name="change"),
]
