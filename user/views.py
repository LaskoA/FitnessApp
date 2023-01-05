from rest_framework import generics
from user.serializers import UserSerializer
from .models import User


class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer


class ChangeView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
