# Generated by Django 4.1.4 on 2023-01-04 18:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("user", "0004_user_picture"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="picture",
            field=models.ImageField(blank=True, null=True, upload_to="avatars"),
        ),
    ]
