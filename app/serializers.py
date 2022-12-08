from rest_framework import serializers

from app.models import Shape, Day, Exercise, Muscle, Training


class ShapeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shape
        fields = ("id", "height", "weight", "waist", "user")


class DaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Day
        fields = ("id", "day", "water")


class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ("id", "type", "info", "description", "video", "sets", "reps", "time_per_rep")


class MuscleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Muscle
        fields = ("id", "title", "exercises")


class MuscleListSerializer(MuscleSerializer):
    exercises = ExerciseSerializer()

    class Meta:
        model = Muscle
        fields = ("id", "title", "exercises")


class TrainingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Training
        fields = ("id", "name", "comment", "day", "muscles", "user")
