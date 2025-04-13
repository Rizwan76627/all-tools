document.addEventListener('DOMContentLoaded', function() {
    const minValue = document.getElementById('minValue');
    const maxValue = document.getElementById('maxValue');
    const quantity = document.getElementById('quantity');
    const generateBtn = document.getElementById('generateBtn');
    const results = document.getElementById('results');
    const numbersContainer = document.getElementById('numbersContainer');
    const copyNumbersBtn = document.getElementById('copyNumbersBtn');

    generateBtn.addEventListener('click', function() {
        const min = parseInt(minValue.value);
        const max = parseInt(maxValue.value);
        const qty = parseInt(quantity.value);

        if (isNaN(min) || isNaN(max) || isNaN(qty)) {
            alert('Please enter valid numbers');
            return;
        }

        if (min >= max) {
            alert('Minimum value must be less than maximum value');
            return;
        }

        if (qty < 1 || qty > 100) {
            alert('Quantity must be between 1 and 100');
            return;
        }

        const numbers = [];
        for (let i = 0; i < qty; i++) {
            numbers.push(getRandomInt(min, max));
        }

        displayResults(numbers);
    });

    copyNumbersBtn.addEventListener('click', function() {
        const textToCopy = numbersContainer.textContent;
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                const originalText = copyNumbersBtn.textContent;
                copyNumbersBtn.textContent = 'Copied!';
                setTimeout(() => {
                    copyNumbersBtn.textContent = originalText;
                }, 2000);
            });
    });

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function displayResults(numbers) {
        numbersContainer.innerHTML = numbers.join(', ');
        results.classList.remove('d-none');
    }
});