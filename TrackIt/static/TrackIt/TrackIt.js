// Use https://tvjs.io/ for graphs

// ***--set update intervals for cryptocurrency prices--***

setInterval(() => {
    updateCryptoPrice("BTC", "USD");
}, 1000);
setInterval(() => {
    updateCryptoPrice("ETH", "USD");
}, 1000);
setInterval(() => {
    updateCryptoPrice("SOL", "USD");
}, 1000);
setInterval(() => {
    updateCryptoPrice("AVAX", "USD");
}, 1000);
setInterval(() => {
    updateCryptoPrice("ADA", "USD");
}, 1000);

// ***--------------------------------------------------***

// ***-----set update intervals for currency prices-----***

setInterval(() => {
    updateCurrencyPrice("USD", "USD");
}, 1000);
setInterval(() => {
    updateCurrencyPrice("EUR", "USD");
}, 1000);
setInterval(() => {
    updateCurrencyPrice("JPY", "USD");
}, 1000);
setInterval(() => {
    updateCurrencyPrice("GBP", "USD");
}, 1000);
setInterval(() => {
    updateCurrencyPrice("CHF", "USD");
}, 1000);

// ***--------------------------------------------------***

let cryptoPrices = {"BTC": 0, "ETH": 0, "SOL": 0, "AVAX": 0, "ADA": 0};
let currencyPrices = {"USD": 0, "EUR": 0, "JPY": 0, "GBP": 0, "CHF" : 0};

document.addEventListener('DOMContentLoaded', async () => {
    localStorage.setItem("cryptoPrices", JSON.stringify(cryptoPrices));
    localStorage.setItem("currencyPrices", JSON.stringify(currencyPrices));
    updateCryptoPrice("BTC", "USD");
    updateCryptoPrice("ETH", "USD");
    updateCryptoPrice("SOL", "USD");
    updateCryptoPrice("AVAX", "USD");
    updateCryptoPrice("ADA", "USD");
	updateCurrencyPrice("USD", "USD");
	updateCurrencyPrice("EUR", "USD");
	updateCurrencyPrice("JPY", "USD");
	updateCurrencyPrice("GBP", "USD");
	updateCurrencyPrice("CHF", "USD");

	document.querySelector(".login-link").addEventListener("click", () => {
		document.querySelector(".register").style.display = "none";
		document.querySelector(".login").style.display = "block";
		document.querySelector(".prices").style.display = "none";	
	})
	document.querySelector(".register-link").addEventListener("click", () => {
		document.querySelector(".login").style.display = "none";
		document.querySelector(".register").style.display = "block";
		document.querySelector(".prices").style.display = "none";	
	})
	document.querySelector(".logo-text").addEventListener("click", () => {
		document.querySelector(".register").style.display = "none";
		document.querySelector(".prices").style.display = "flex";
		document.querySelector(".login").style.display = "none";
	})
	document.querySelector(".register-redirect-link").addEventListener("click", () => {
		document.querySelector(".login").style.display = "none";
		document.querySelector(".register").style.display = "block";
		document.querySelector(".prices").style.display = "none";	
	})
	document.querySelector(".login-redirect-link").addEventListener("click", () => {
		document.querySelector(".login").style.display = "block";
		document.querySelector(".register").style.display = "none";
		document.querySelector(".prices").style.display = "none";	
	})
})

async function getCryptoPrice(crypto, currency) {
    let priceData = await fetch(`https://api.coinbase.com/v2/prices/${crypto}-${currency}/buy`);
    priceData = await priceData.json();
    return priceData.data.amount;
}

async function updateCryptoPrice(crypto, currency) {
    let priceData = await getCryptoPrice(crypto, currency);
	priceData = (parseFloat(priceData).toFixed(2)).toString();
	let prices = localStorage.getItem("cryptoPrices");
	prices = JSON.parse(prices);
    if (priceData !== prices[crypto]) {
        document.querySelector(`.cryptoprice[data-${crypto}]`).textContent = `$${priceData}`;
		percentagechange = ((parseFloat(priceData) - parseFloat(prices[crypto])) * 100/parseFloat(prices[crypto])).toFixed(3);
		if (percentagechange == Infinity) {
			document.querySelector(`.cryptochangepercentage[data-${crypto}]`).textContent = "0.000%";
		}
		else {
			document.querySelector(`.cryptochangepercentage[data-${crypto}]`).textContent = `${percentagechange}%`;
		}
		if (percentagechange < 0) {
			document.querySelector(`svg[data-${crypto}]`).classList.add("rotatesvg");
			document.querySelector(`svg[data-${crypto}]`).style.color = "red";
			document.querySelector(`.cryptochangepercentage[data-${crypto}]`).style.color = "red";
		}
		else if (percentagechange > 0 && percentagechange != Infinity) {
			document.querySelector(`svg[data-${crypto}]`).style.color = "#39FF14";
			document.querySelector(`.cryptochangepercentage[data-${crypto}]`).style.color = "#29EF04";
			if (document.querySelector(`svg[data-${crypto}]`).classList.contains("rotatesvg")) {
				document.querySelector(`svg[data-${crypto}]`).classList.remove("rotatesvg");
			}
		}
		else if (percentagechange == 0) {
			document.querySelector(`svg[data-${crypto}]`).style.color = "#eeeeee";
			document.querySelector(`.cryptochangepercentage[data-${crypto}]`).style.color = "#eeeeee";
		}
		prices[crypto] = priceData;
        localStorage.setItem("cryptoPrices", JSON.stringify(prices));
    }
}

async function getCurrencyPrice(currency, preference) {
    let currencyData = await fetch(`https://api.coinbase.com/v2/exchange-rates?currency=${currency}`);
    currencyData = await currencyData.json();
	return currencyData.data.rates[preference];
}

async function updateCurrencyPrice(currency, preference) {
	let priceData = await getCurrencyPrice(currency, preference);
	priceData = (parseFloat(priceData).toFixed(2)).toString();
	let prices = localStorage.getItem("currencyPrices");
	prices = JSON.parse(prices);
	if (priceData !== prices[currency]) {
		document.querySelector(`.currencyprice[data-${currency}]`).textContent = `$${priceData}`;
		let priceChange = ((parseFloat(priceData) - parseFloat(prices[currency])) * 100/parseFloat(prices[currency])).toFixed(3);
		if (priceChange == Infinity) {
			document.querySelector(`.currencychangepercentage[data-${currency}]`).textContent = "0.000%";
		}
		else if (priceChange < 0) {
			document.querySelector(`.currencychangepercentage[data-${currency}]`).textContent = `${priceChange}%`;
			document.querySelector(`.currencychangepercentage[data-${currency}]`).style.color = "red";
		}
		else if (priceChange > 0 && priceChange != Infinity) {
			document.querySelector(`.currencychangepercentage[data-${currency}]`).textContent = `${priceChange}%`;
			document.querySelector(`.currencychangepercentage[data-${currency}]`).style.color = "#29EF04";
		}
		else if (priceChange == 0) {
			document.querySelector(`.currencychangepercentage[data-${currency}]`).textContent = "0.000%";
			document.querySelector(`.currencychangepercentage[data-${currency}]`).style.color = "#eeeeee";
		}
		prices[currency] = priceData;
		localStorage.setItem("currencyPrices", JSON.stringify(prices));
	}
}