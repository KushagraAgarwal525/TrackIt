from django.shortcuts import render
# from TrackIt.models import User, Watchlist, currencyPreferences
# Create your views here.

def register(request):
    return render(request, 'TrackIt/register.html')

def login(request):
    return render(request, 'TrackIt/login.html')

def index(request):
    return render(request, 'TrackIt/index.html')