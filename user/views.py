from rest_framework import generics, viewsets, mixins
from user.serializers import UserSerializer, UserListSerializer
from .models import User


class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer


class ChangeView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class UsersViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet
):
    queryset = User.objects.all()
    serializer_class = UserListSerializer
