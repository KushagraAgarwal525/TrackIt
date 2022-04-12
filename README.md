
# TrackIt

A single page web-application to track ***cryptocurrencies*** and ***fiat currency*** prices.

## What

- Track prices of ***crpytocurrencies*** and ***fiat currencies***.
- Convert ***currency*** prices.
- TrackIt gives users the option to login to use some additional features like ***Currency Preferences*** to display all price data in the preferred currency.
- Find a way to ***relax*** after an exhausting day.


## How

TrackIt uses a *Coinbase* API to get quotes on all currencies which returns data in JSON. The application uses that data to display the correct information as required by the user. TrackIt also makes use of *Session Storage* to keep track of previous prices of different currencies to calculate percentage change. To keep track of *Currency Preferences* for differect users, a django model is used to store *User Preferences*.
TrackIt uses *bored* API for ideas to relax.

## Distinctiveness and Complexity

TrackIt is clearly distinct from all the other projects visited in the course.
It touches a different scope or a use case for django based web applications. What makes it truly distinct is the use of external API to get *real-time* data. The structure of the returned data is to be understood to be nicely able to make use of the API.

TrackIt is a fairly complex application since structure and endpoints of the API is to be understood. Along with that, the application makes *approx. 10 requests* every second to the CoinBase API to update the displayed data. The requests are managed effectively and concisely by making use of structured functions.  The API makes use of *Intervals, Sessions Storage, async, await* most of which were not necessarily used in the projects explored in the course. All of the requests to CoinBase and the TrackIt API are *asynchronous* making it more complex. The application also uses *media queries* to make the application mobile-responsive with *precision in UI*.

## Files

- ### Static
	- styles.css
		- Contains styles for UI for the web-application.
	- TrackIt.js
		- Contains functions to interact between the UI and the server.
		- Makes requests to the CoinBase API.
		- Manages Sessions Storage.

- ### Templates
	-	index.html
		- Contains *popular currency display, currency conversion* and *relax* divs.
	- layout.html
		- Contains *basic layout* for the web-application.
			- head
			- NavBar
	- login.html
		- Extends to *layout.html*
		- Contains HTML code for the *login page*
	- register.html
		- Extends to *layout.html*
		- Contains HTML code for the *register page*

- ### <span>views.py</span>
	- Contains views to run when specified urls are accessed.
	- Has views to 
		- login
		- register
		- logout
		- index
		- manage preferences
- ### <span>urls.py</span>
	- Contains specified *URL patterns* to 
		- index
		- login
		- logout
		- register
		- preference
- ### <span>models.py</span>
	- Contains *User*, *WatchList* and *currencyPreferences* model

## How to Run TrackIt

Run ***python <span>manage.py</span> runserver*** while in the root directory which contains the ***<span>manage.py</span>*** file.

## Features that can be Added
- WatchList

## Note
- The application supports all unique UN recognised currencies except *MRU*, *KPW*
- The application does not support currency conversion including popular currencies for *ERN* and *CUP*
- The *default currency* for all users is *USD* unless changed by the user after logging in.
- The prices are updated every second
- The prices start updating after the site is first loaded by the user hence, the price change percentage is 0.000% when the site first loads
- *Change percentages* are with respect to the last price change detected