# Generated by Django 4.0.1 on 2022-03-27 11:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('TrackIt', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Watchlist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('item', models.CharField(max_length=8)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='watchlist', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='currencyPreferences',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('currency', models.CharField(max_length=8)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='prefcurrency', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
