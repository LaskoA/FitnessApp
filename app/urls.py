from django.urls import path, include
from rest_framework import routers

from app.views import (
    ShapeViewSet,
    WaterViewSet,
    ExerciseViewSet,
    TrainingViewSet,
    ProgramViewSet,
)

router = routers.DefaultRouter()

router.register("shapes", ShapeViewSet)
router.register("water", WaterViewSet)
router.register("exercises", ExerciseViewSet)
router.register("trainings", TrainingViewSet)
router.register("programs", ProgramViewSet)


urlpatterns = [path("", include(router.urls))]

app_name = "app"
