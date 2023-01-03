from django.urls import path

from user.views import CreateUserView, ChangeView

app_name = "user"

urlpatterns = [
    path("register/", CreateUserView.as_view(), name="create"),
    path("change/<int:pk>/", ChangeView.as_view(), name="change"),
]
