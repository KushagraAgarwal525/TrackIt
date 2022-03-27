// Use https://tvjs.io/ for graphs

// setInterval(getCryptoPrice("BTC", "USD"), 1000);
// setInterval(getCurrencyPrice("GBP"), 1000);

let currentPrice = 0;
let currencyPrice = 0;

function getCryptoPrice(crypto, currency) {
    fetch(`https://api.coinbase.com/v2/prices/${crypto}-${currency}/buy`)
        .then(response => response.json())
        .then(data => {
            if (data.data.amount !== currentPrice) {
                console.table(data);
                currentPrice = data.data.amount;
            }
        })
}

function getCurrencyPrice(currency) {
    fetch(`https://api.coinbase.com/v2/exchange-rates?currency=${currency}`)
        .then(response => response.json())
        .then(data => {
            if (data.data.rates.USD !== currencyPrice) {
                console.log(data.data.rates.USD);
                currencyPrice = data.data.rates.USD;
            }
        })
}