from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('register/<str:email>/<str:password>/<str:confirm_password>', views.register, name='register'),
    path('login/', views.login, name='login'),
]