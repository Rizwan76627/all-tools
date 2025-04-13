document.addEventListener('DOMContentLoaded', function() {
    const colorPicker = document.getElementById('colorPicker');
    const colorPreview = document.getElementById('colorPreview');
    const hexValue = document.getElementById('hexValue');
    const rgbValue = document.getElementById('rgbValue');
    const hslValue = document.getElementById('hslValue');

    // Initialize
    updateColorValues(colorPicker.value);
    colorPreview.style.backgroundColor = colorPicker.value;

    // Event listener for color picker
    colorPicker.addEventListener('input', function() {
        updateColorValues(this.value);
        colorPreview.style.backgroundColor = this.value;
    });

    function updateColorValues(hex) {
        hexValue.value = hex.toUpperCase();
        
        // Convert HEX to RGB
        const r = parseInt(hex.substring(1, 3), 16);
        const g = parseInt(hex.substring(3, 5), 16);
        const b = parseInt(hex.substring(5, 7), 16);
        rgbValue.value = `rgb(${r}, ${g}, ${b})`;
        
        // Convert RGB to HSL
        const hsl = rgbToHsl(r, g, b);
        hslValue.value = `hsl(${Math.round(hsl[0])}, ${Math.round(hsl[1])}%, ${Math.round(hsl[2])}%)`;
    }

    function rgbToHsl(r, g, b) {
        r /= 255, g /= 255, b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0; // achromatic
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return [h * 360, s * 100, l * 100];
    }
});