document.addEventListener('DOMContentLoaded', function() {
    const inputTemp = document.getElementById('inputTemp');
    const inputUnit = document.getElementById('inputUnit');
    const outputTemp = document.getElementById('outputTemp');
    const outputUnit = document.getElementById('outputUnit');
    const convertBtn = document.getElementById('convertBtn');

    // Convert on button click
    convertBtn.addEventListener('click', convertTemperature);

    // Also convert when any input changes
    [inputTemp, inputUnit, outputUnit].forEach(element => {
        element.addEventListener('input', convertTemperature);
    });

    function convertTemperature() {
        const temp = parseFloat(inputTemp.value);
        if (isNaN(temp)) {
            alert('Please enter a valid temperature');
            return;
        }

        const fromUnit = inputUnit.value;
        const toUnit = outputUnit.value;

        if (fromUnit === toUnit) {
            outputTemp.value = inputTemp.value;
            return;
        }

        // Convert to Celsius first
        let celsius;
        switch(fromUnit) {
            case 'celsius':
                celsius = temp;
                break;
            case 'fahrenheit':
                celsius = (temp - 32) * 5/9;
                break;
            case 'kelvin':
                celsius = temp - 273.15;
                break;
        }

        // Convert from Celsius to target unit
        let result;
        switch(toUnit) {
            case 'celsius':
                result = celsius;
                break;
            case 'fahrenheit':
                result = (celsius * 9/5) + 32;
                break;
            case 'kelvin':
                result = celsius + 273.15;
                break;
        }

        outputTemp.value = result.toFixed(2);
    }
});