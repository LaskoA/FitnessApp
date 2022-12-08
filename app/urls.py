from django.urls import path, include
from rest_framework import routers

from app.views import (
    ShapeViewSet,
    DayViewSet,
    ExerciseViewSet,
    MuscleViewSet,
    TrainingViewSet
)

router = routers.DefaultRouter()

router.register("shapes", ShapeViewSet)
router.register("days", DayViewSet)
router.register("exercises", ExerciseViewSet)
router.register("muscles", MuscleViewSet)
router.register("trainings", TrainingViewSet)


urlpatterns = [path("", include(router.urls))]

app_name = "app"
