// Use https://tvjs.io/ for graphs

const currencies = ["AFN","ALL","BTC","DZD","USD","EUR","AOA","XCD","ARS","AMD","AWG","AUD","AZN","BSD","BHD","BDT","BBD","BYN","BZD","XOF","BMD","BTN","BOB","BAM","BWP","BRL","BND","BGN","BIF","KHR","XAF","CAD","CVE","KYD","CLP","CNY","COP","KMF","CDF","NZD","CRC","HRK","CUP","CZK","DKK","DJF","DOP","EGP","ERN","SZL","ETB","FJD","XPF","GMD","GEL","GHS","GIP","GTQ","GNF","GYD","HTG","HNL","HKD","HUF","ISK","INR","IDR","IRR","IQD","ILS","JMD","JPY","JOD","KZT","KES","KPW","KRW","KWD","KGS","LAK","LBP","LSL","LRD","LYD","CHF","MOP","MGA","MWK","MYR","MVR","MRU","MUR","MXN","MDL","MNT","MAD","MZN","MMK","NAD","NPR","ANG","NIO","NGN","MKD","NOK","OMR","PKR","PAB","PGK","PYG","PEN","PHP","PLN","QAR","RON","RUB","RWF","SHP","WST","STN","SAR","RSD","SCR","SLL","SGD","SBD","SOS","ZAR","SSP","LKR","SDG","SRD","SEK","SYP","TJS","TZS","THB","TOP","TTD","TND","TRY","TMT","UGX","UAH","AED","GBP","UYU","UZS","VUV","VES","VND","YER","ZMW","ZWL"];

// ***----Update intervals for cryptocurrency prices----***
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
    const searchForm = document.querySelector(".convert form");
    searchForm.addEventListener('submit', async event => {
        event.preventDefault();
        let currencyFrom = searchForm.currencyfrom.value.toUpperCase();
        let currencyTo = searchForm.currencyto.value.toUpperCase();
        let exchange;
        const result = document.querySelector(".convert .result");
        if (currencies.includes(currencyFrom) && currencies.includes(currencyTo)) {
            exchange = await getCurrencyPrice(currencyFrom, currencyTo);
            exchange = parseFloat(exchange).toFixed(2);
            result.style.display = "block";
            result.textContent = `1 ${currencyFrom.toUpperCase()} = ${exchange} ${currencyTo.toUpperCase()}`;
        }
        else {
            result.style.display = "block";
            result.textContent = "INVALID INPUT!";
        }
    })
    document.querySelector('.relaxbtn').addEventListener('click', async () => {
        let idea = await fetch("http://www.boredapi.com/api/activity?type=relaxation");
        idea = await idea.json();
        document.querySelector('.idea').textContent = idea.activity;
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
        else {
			document.querySelector(`.currencychangepercentage[data-${currency}]`).textContent = `${percentagechange}%`;
		}
		if (priceChange < 0) {
            document.querySelector(`svg[data-${currency}]`).classList.add("rotatesvg");
			document.querySelector(`svg[data-${currency}]`).style.color = "red";
			document.querySelector(`.currencychangepercentage[data-${currency}]`).style.color = "red";
		}
		else if (priceChange > 0 && priceChange != Infinity) {
			document.querySelector(`.currencychangepercentage[data-${currency}]`).style.color = "#29EF04";
            document.querySelector(`svg[data-${currency}]`).style.color = "#39FF14";
			if (document.querySelector(`svg[data-${currency}]`).classList.contains("rotatesvg")) {
				document.querySelector(`svg[data-${currency}]`).classList.remove("rotatesvg");
			}
		}
		else if (priceChange == 0) {
			document.querySelector(`svg[data-${currency}]`).style.color = "#eeeeee";
			document.querySelector(`.currencychangepercentage[data-${currency}]`).style.color = "#eeeeee";
		}
		prices[currency] = priceData;
		localStorage.setItem("currencyPrices", JSON.stringify(prices));
	}
}