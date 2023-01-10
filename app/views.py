from rest_framework import viewsets, mixins
from rest_framework.viewsets import GenericViewSet

from app.models import (
    Shape,
    Day,
    Exercise,
    Training,
    Program,
)

from app.serializers import (
    ShapeSerializer,
    DaySerializer,
    ExerciseSerializer,
    TrainingSerializer,
    ProgramSerializer,
)


class ShapeViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet
):
    queryset = Shape.objects.all()
    serializer_class = ShapeSerializer


class DayViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet
):
    queryset = Day.objects.all()
    serializer_class = DaySerializer


class ExerciseViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet
):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer


class TrainingViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet
):
    queryset = Training.objects.all()
    serializer_class = TrainingSerializer


class ProgramViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet
):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer
