# Generated by Django 4.1.4 on 2023-01-05 08:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("user", "0005_alter_user_picture"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="user",
            name="picture",
        ),
        migrations.AddField(
            model_name="user",
            name="image_data",
            field=models.CharField(blank=True, max_length=999999999, null=True),
        ),
    ]
