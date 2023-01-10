from rest_framework import serializers

from app.models import Shape, Day, Exercise, Training, Program


class ShapeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shape
        fields = ("id", "height", "weight", "waist", "glutes", "biceps",
                  "thighs", "calf", "neck", "shoulders", "chest", "forearm", "user")


class DaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Day
        fields = ("id", "day", "water")


class DayTrainingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Day
        fields = ("id", "day")


class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ("id", "type", "info", "description", "video", "sets", "reps", "rest", "time_per_rep")


class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = ("id", "name", "difficulty")


class TrainingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Training
        fields = ("id", "name", "comment", "day", "program", "user")
