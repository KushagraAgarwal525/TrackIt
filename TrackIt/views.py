from django.http import JsonResponse
from django.shortcuts import render
# from TrackIt.models import User, Watchlist, currencyPreferences
# Create your views here.

def register(request, email, password, confirm_password):
    if (password != confirm_password):
        return JsonResponse({'status': '2'})
    # return render(request, 'TrackIt/register.html')

def login(request):
    return render(request, 'TrackIt/login.html')

def index(request):
    return render(request, 'TrackIt/index.html')