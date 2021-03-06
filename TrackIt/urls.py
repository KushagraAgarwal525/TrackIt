from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('register/', views.register, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('preference/', views.preference, name='preferences'),
    path('isloggedin/', views.is_logged_in, name='is_logged_in'),
]