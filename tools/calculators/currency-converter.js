document.addEventListener('DOMContentLoaded', function() {
    const amountInput = document.getElementById('amount');
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const resultInput = document.getElementById('result');
    const convertBtn = document.getElementById('convertBtn');
    const lastUpdated = document.getElementById('lastUpdated');

    let exchangeRates = {};
    let lastUpdateTime = null;

    // Initialize with some default rates
    initializeWithDefaultRates();

    // Fetch latest rates
    fetchExchangeRates();

    // Convert on button click
    convertBtn.addEventListener('click', convertCurrency);

    // Also convert when any input changes
    [amountInput, fromCurrency, toCurrency].forEach(element => {
        element.addEventListener('input', convertCurrency);
    });

    function convertCurrency() {
        const amount = parseFloat(amountInput.value);
        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        const from = fromCurrency.value;
        const to = toCurrency.value;

        if (from === to) {
            resultInput.value = amountInput.value;
            return;
        }

        // Convert via USD as base if needed
        let result;
        if (from === 'USD') {
            result = amount * exchangeRates[to];
        } else if (to === 'USD') {
            result = amount / exchangeRates[from];
        } else {
            // Convert from currency -> USD -> target currency
            result = (amount / exchangeRates[from]) * exchangeRates[to];
        }

        resultInput.value = result.toFixed(4);
    }

    function fetchExchangeRates() {
        // Using ExchangeRate-API (free tier)
        fetch('https://open.er-api.com/v6/latest/USD')
            .then(response => response.json())
            .then(data => {
                if (data.result === 'success') {
                    exchangeRates = data.rates;
                    lastUpdateTime = new Date(data.time_last_update_utc);
                    lastUpdated.textContent = `Rates last updated: ${lastUpdateTime.toLocaleString()}`;
                }
            })
            .catch(error => {
                console.error('Error fetching exchange rates:', error);
                lastUpdated.textContent = 'Using default rates (may be outdated)';
            });
    }

    function initializeWithDefaultRates() {
        // Default rates in case API fails
        exchangeRates = {
            EUR: 0.92,
            GBP: 0.79,
            JPY: 151.53,
            CAD: 1.37,
            AUD: 1.52,
            CNY: 7.23,
            INR: 83.29
        };
    }
});