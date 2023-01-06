# Generated by Django 4.1.4 on 2023-01-06 08:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0006_program_training_program"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="training",
            name="program",
        ),
        migrations.AlterField(
            model_name="program",
            name="difficulty",
            field=models.ForeignKey(
                choices=[("Easy", "Easy"), ("Medium", "Medium"), ("Hard", "Hard")],
                default="Easy",
                on_delete=django.db.models.deletion.CASCADE,
                to="app.training",
            ),
        ),
    ]
