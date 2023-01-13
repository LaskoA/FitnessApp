from rest_framework import serializers

from app.models import Shape, Day, Exercise, Training, Program


class ShapeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shape
        fields = ("id", "height", "weight", "waist", "glutes", "biceps",
                  "thighs", "calf", "neck", "shoulders", "chest", "forearm", "user_id")


class DaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Day
        fields = ("id", "day", "water")


class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ("id", "type", "info", "description", "muscle", "video", "sets", "reps", "rest", "time_per_rep")


class ProgramExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ("id",)


class ProgramSerializer(serializers.ModelSerializer):
    exercise_id = ProgramExerciseSerializer(source="exercises", many=True, read_only=True)

    class Meta:
        model = Program
        fields = ("id", "name", "difficulty", "exercise_id")


class TrainingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Training
        fields = ("id", "name", "comment", "day", "program", "user")
