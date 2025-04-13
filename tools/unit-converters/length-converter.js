document.addEventListener('DOMContentLoaded', function() {
    const inputValue = document.getElementById('inputValue');
    const inputUnit = document.getElementById('inputUnit');
    const outputValue = document.getElementById('outputValue');
    const outputUnit = document.getElementById('outputUnit');
    const convertBtn = document.getElementById('convertBtn');

    const conversionFactors = {
        mm: 1,
        cm: 10,
        m: 1000,
        km: 1000000,
        in: 25.4,
        ft: 304.8,
        yd: 914.4,
        mi: 1609344
    };

    convertBtn.addEventListener('click', function() {
        const value = parseFloat(inputValue.value);
        if (isNaN(value)) {
            alert('Please enter a valid number');
            return;
        }

        const fromUnit = inputUnit.value;
        const toUnit = outputUnit.value;
        
        // Convert to millimeters first
        const valueInMm = value * conversionFactors[fromUnit];
        // Convert to target unit
        const result = valueInMm / conversionFactors[toUnit];
        
        outputValue.value = result.toFixed(6);
    });

    // Convert automatically when any input changes
    [inputValue, inputUnit, outputUnit].forEach(element => {
        element.addEventListener('input', function() {
            if (inputValue.value) {
                convertBtn.click();
            }
        });
    });
});