from locale import currency
import re
from django.shortcuts import render
from django.urls import reverse
from django.http import HttpResponseRedirect
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import JsonResponse
from TrackIt.models import User, Watchlist, currencyPreferences
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.

currencies = ["AED","AFN","ALL","AMD","ANG","AOA","ARS","AUD","AWG","AZN","BAM","BBD","BDT","BGN","BHD","BIF","BMD","BND","BOB","BRL","BSD","BTC","BTN","BWP","BYN","BZD","CAD","CDF","CHF","CLP","CNY","COP","CRC","CVE","CZK","DJF","DKK","DOP","DZD","EGP","ETB","EUR","FJD","GBP","GEL","GHS","GIP","GMD","GNF","GTQ","GYD","HKD","HNL","HRK","HTG","HUF","IDR","ILS","INR","IQD","IRR","ISK","JMD","JOD","JPY","KES","KGS","KHR","KMF","KPW","KRW","KWD","KYD","KZT","LAK","LBP","LKR","LRD","LSL","LYD","MAD","MDL","MGA","MKD","MMK","MNT","MOP","MRU","MUR","MVR","MWK","MXN","MYR","MZN","NAD","NGN","NIO","NOK","NPR","NZD","OMR","PAB","PEN","PGK","PHP","PKR","PLN","PYG","QAR","RON","RSD","RUB","RWF","SAR","SBD","SCR","SDG","SEK","SGD","SHP","SLL","SOS","SRD","SSP","STN","SYP","SZL","THB","TJS","TMT","TND","TOP","TRY","TTD","TZS","UAH","UGX","USD","UYU","UZS","VES","VND","VUV","WST","XAF","XCD","XOF","XPF","YER","ZAR","ZMW","ZWL"]

def register(request):
    if request.method == "POST":
        email = request.POST["email"]
        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "TrackIt/register.html", {
                "message": "Passwords must match."
            })
        # Attempt to create new user
        try:
            user = User.objects.create_user(username = email, password = password)
            user.save()
        except IntegrityError:
            return render(request, "TrackIt/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    return render(request, 'TrackIt/register.html')

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        email = request.POST["email"]
        password = request.POST["password"]
        user = authenticate(request, username=email, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "TrackIt/login.html", {
                "message": "Invalid email and/or password."
            })
    return render(request, 'TrackIt/login.html')

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

def index(request):
    return render(request, 'TrackIt/index.html')

@csrf_exempt
def preference(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            currency = data["currency"]
            if currency not in currencies:
                return JsonResponse({"status": 1})    
            user = request.user
            if (currencyPreferences.objects.filter(user=user).count() == 0):
                pref = currencyPreferences.objects.create(user=user, currency=currency)
                pref.save()
                return JsonResponse({"status": 0})
            pref = currencyPreferences.objects.get(user=user)
            pref.currency = currency
            pref.save()
            return JsonResponse({"status": 0})
        except:
            return JsonResponse({"status": 1})
    try:
        user = request.user
        pref = currencyPreferences.objects.get(user=user)
        return JsonResponse({"status": 0, "currency": pref.currency})
    except:
        return JsonResponse({"status": 1, "currency": "USD"})

def is_logged_in(request):
    if request.user.is_authenticated:
        return JsonResponse({"status": 0})
    return JsonResponse({"status": 1})