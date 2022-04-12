// Use https://tvjs.io/ for graphs

const currencies = ["AED","AFN","ALL","AMD","ANG","AOA","ARS","AUD","AWG","AZN","BAM","BBD","BDT","BGN","BHD","BIF","BMD","BND","BOB","BRL","BSD","BTN","BWP","BYN","BZD","CAD","CDF","CHF","CLP","CNY","COP","CRC","CVE","CZK","DJF","DKK","DOP","DZD","EGP","ETB","EUR","FJD","GBP","GEL","GHS","GIP","GMD","GNF","GTQ","GYD","HKD","HNL","HRK","HTG","HUF","IDR","ILS","INR","IQD","IRR","ISK","JMD","JOD","JPY","KES","KGS","KHR","KMF","KPW","KRW","KWD","KYD","KZT","LAK","LBP","LKR","LRD","LSL","LYD","MAD","MDL","MGA","MKD","MMK","MNT","MOP","MRU","MUR","MVR","MWK","MXN","MYR","MZN","NAD","NGN","NIO","NOK","NPR","NZD","OMR","PAB","PEN","PGK","PHP","PKR","PLN","PYG","QAR","RON","RSD","RUB","RWF","SAR","SBD","SCR","SDG","SEK","SGD","SHP","SLL","SOS","SRD","SSP","STN","SYP","SZL","THB","TJS","TMT","TND","TOP","TRY","TTD","TZS","UAH","UGX","USD","UYU","UZS","VES","VND","VUV","WST","XAF","XCD","XOF","XPF","YER","ZAR","ZMW","ZWL"]
const symbols = {"USD": "$", "EUR": "€", "JPY": "¥", "GBP": "£"};
const cryptoPrices = {"BTC": "0.000", "ETH": "0.000", "SOL": "0.000", "AVAX": "0.000", "ADA": "0.000"};
const currencyPrices = {"USD": "0.000", "EUR": "0.000", "JPY": "0.000", "GBP": "0.000", "CHF" : "0.000"};
let intervalIds = [];

function clearAllIntervals() {
    for (let i = 0; i < intervalIds.length; i++) {
        clearInterval(intervalIds[i]);
    }
    intervalIds = [];
}

function updateAllSymbols(preference) {
    if (symbols[preference]) {
        let symbol = symbols[preference];
        document.querySelectorAll(`.pricesymbolavailable`).forEach(elm => elm.textContent = `${symbol}`);
        document.querySelectorAll(`.pricesymbolavailable`).forEach(elm => elm.style.display = "block")
        document.querySelectorAll(".pricesymbol").forEach(elm => elm.style.display = "none")
    }
    else {
        document.querySelectorAll(".pricesymbol").forEach( elm => elm.textContent = preference);
        document.querySelectorAll(".pricesymbol").forEach(elm => elm.style.display = "block")
        document.querySelectorAll(`.pricesymbolavailable`).forEach(elm => elm.style.display = "none")
    }
}

function resetLocalPrices() {
    sessionStorage.setItem("cryptoPrices", JSON.stringify(cryptoPrices));
    sessionStorage.setItem("currencyPrices", JSON.stringify(currencyPrices));
}

async function updateAllPrices(preference) {
    updateCryptoPrice("BTC", preference);
    updateCryptoPrice("ETH", preference);
    updateCryptoPrice("SOL", preference);
    updateCryptoPrice("AVAX", preference);
    updateCryptoPrice("ADA", preference);
	updateCurrencyPrice("USD", preference);
	updateCurrencyPrice("EUR", preference);
	updateCurrencyPrice("JPY", preference);
	updateCurrencyPrice("GBP", preference);
	updateCurrencyPrice("CHF", preference);
    updateAllSymbols(preference);
    // ***----Update intervals for cryptocurrency prices----***
    intervalIds.push(setInterval(() => {
        updateCryptoPrice("BTC", preference);
    }, 1000));
    intervalIds.push(setInterval(() => {
        updateCryptoPrice("ETH", preference);
    }, 1000));
    intervalIds.push(setInterval(() => {
        updateCryptoPrice("SOL", preference);
    }, 1000));
    intervalIds.push(setInterval(() => {
        updateCryptoPrice("AVAX", preference);
    }, 1000));
    intervalIds.push(setInterval(() => {
        updateCryptoPrice("ADA", preference);
    }, 1000));
    // ***--------------------------------------------------***
    // ***-------Update intervals for currency prices-------***
    intervalIds.push(setInterval(() => {
        updateCurrencyPrice("USD", preference);
    }, 1000));
    intervalIds.push(setInterval(() => {
        updateCurrencyPrice("EUR", preference);
    }, 1000));
    intervalIds.push(setInterval(() => {
        updateCurrencyPrice("JPY", preference);
    }, 1000));
    intervalIds.push(setInterval(() => {
        updateCurrencyPrice("GBP", preference);
    }, 1000));
    intervalIds.push(setInterval(() => {
        updateCurrencyPrice("CHF", preference);
    }, 1000));
    // ***--------------------------------------------------***
}

document.addEventListener('DOMContentLoaded', async () => {
    getPreference();
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

    const dropdownMenu = document.querySelector(".dropdown-menu");
    currencies.forEach(currency => {
        const li = document.createElement('li');
        const btn = document.createElement('button')
        btn.textContent = currency;
        btn.classList.add('dropdown-item');
        btn.dataset["currency"] = currency;
        btn.addEventListener('click', () => updatePreference(currency));
        li.appendChild(btn);
        dropdownMenu.appendChild(li);
    })
})

async function getCryptoPrice(crypto, currency) {
    let priceData = await fetch(`https://api.coinbase.com/v2/prices/${crypto}-${currency}/spot`);
    priceData = await priceData.json();
    return priceData.data.amount;
}

async function updateCryptoPrice(crypto, currency) {
    let priceData = await getCryptoPrice(crypto, currency);
	priceData = (parseFloat(priceData).toFixed(2)).toString();
	let prices = sessionStorage.getItem("cryptoPrices");
    prices = JSON.parse(prices);
    if (priceData !== prices[crypto]) {
        document.querySelector(`.cryptoprice[data-${crypto}]`).textContent = `${priceData}`;
		let cryptoPercentageChange = ((parseFloat(priceData) - parseFloat(prices[crypto])) * 100.00/parseFloat(prices[crypto])).toFixed(3);
		if (cryptoPercentageChange == Infinity) {
			document.querySelector(`.cryptochangepercentage[data-${crypto}]`).textContent = "0.000%";
            document.querySelector(`svg[data-${crypto}]`).style.color = "#eeeeee";
			document.querySelector(`.cryptochangepercentage[data-${crypto}]`).style.color = "#eeeeee";
		}
		else {
			document.querySelector(`.cryptochangepercentage[data-${crypto}]`).textContent = `${cryptoPercentageChange}%`;
		}
		if (cryptoPercentageChange < 0) {
			document.querySelector(`svg[data-${crypto}]`).classList.add("rotatesvg");
			document.querySelector(`svg[data-${crypto}]`).style.color = "red";
			document.querySelector(`.cryptochangepercentage[data-${crypto}]`).style.color = "red";
		}
		else if (cryptoPercentageChange > 0 && cryptoPercentageChange != Infinity) {
			document.querySelector(`svg[data-${crypto}]`).style.color = "#39FF14";
			document.querySelector(`.cryptochangepercentage[data-${crypto}]`).style.color = "#29EF04";
			if (document.querySelector(`svg[data-${crypto}]`).classList.contains("rotatesvg")) {
				document.querySelector(`svg[data-${crypto}]`).classList.remove("rotatesvg");
			}
		}
		else if (cryptoPercentageChange == 0) {
			document.querySelector(`svg[data-${crypto}]`).style.color = "#eeeeee";
			document.querySelector(`.cryptochangepercentage[data-${crypto}]`).style.color = "#eeeeee";
		}
		prices[crypto] = priceData;
        sessionStorage.setItem("cryptoPrices", JSON.stringify(prices));
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
	let prices = sessionStorage.getItem("currencyPrices");
    prices = JSON.parse(prices);
	if (priceData !== prices[currency]) {
		document.querySelector(`.currencyprice[data-${currency}]`).textContent = `${priceData}`;
		let currencyPercentageChange = ((parseFloat(priceData) - parseFloat(prices[currency])) * 100/parseFloat(prices[currency])).toFixed(3);
		if (currencyPercentageChange == Infinity) {
			document.querySelector(`.currencychangepercentage[data-${currency}]`).textContent = "0.000%";
		}
        else {
			document.querySelector(`.currencychangepercentage[data-${currency}]`).textContent = `${currencyPercentageChange}%`;
		}
		if (currencyPercentageChange < 0 && currencyPercentageChange != -Infinity) {
            document.querySelector(`svg[data-${currency}]`).classList.add("rotatesvg");
			document.querySelector(`svg[data-${currency}]`).style.color = "red";
			document.querySelector(`.currencychangepercentage[data-${currency}]`).style.color = "red";
		}
		else if (currencyPercentageChange > 0 && currencyPercentageChange != Infinity) {
			document.querySelector(`.currencychangepercentage[data-${currency}]`).style.color = "#29EF04";
            document.querySelector(`svg[data-${currency}]`).style.color = "#39FF14";
			if (document.querySelector(`svg[data-${currency}]`).classList.contains("rotatesvg")) {
				document.querySelector(`svg[data-${currency}]`).classList.remove("rotatesvg");
			}
		}
		else if (currencyPercentageChange == 0) {
			document.querySelector(`svg[data-${currency}]`).style.color = "#eeeeee";
			document.querySelector(`.currencychangepercentage[data-${currency}]`).style.color = "#eeeeee";
		}
		prices[currency] = priceData;
		sessionStorage.setItem("currencyPrices", JSON.stringify(prices));
	}
}

async function getPreference() {
    let update = await fetch(`preference/`);
    update = await update.json();
    preference = update.currency;
    resetLocalPrices();
    updateAllPrices(preference);
    return
}

async function updatePreference(preference) {
    let update = await fetch(`preference/`, {method: "POST", body:JSON.stringify({currency: preference})});
    update = await update.json();
    if (update.status != 0){
        return;
    }
    clearAllIntervals();
    resetLocalPrices();
    updateAllPrices(preference);
    return
}