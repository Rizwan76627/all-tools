document.addEventListener('DOMContentLoaded', function() {
    // Encode elements
    const encodeInput = document.getElementById('encodeInput');
    const encodeBtn = document.getElementById('encodeBtn');
    const encodeOutput = document.getElementById('encodeOutput');
    
    // Decode elements
    const decodeInput = document.getElementById('decodeInput');
    const decodeBtn = document.getElementById('decodeBtn');
    const decodeOutput = document.getElementById('decodeOutput');

    // Encode functionality
    encodeBtn.addEventListener('click', function() {
        const text = encodeInput.value.trim();
        if (!text) {
            alert('Please enter text to encode');
            return;
        }
        encodeOutput.value = btoa(text);
    });

    // Decode functionality
    decodeBtn.addEventListener('click', function() {
        const base64 = decodeInput.value.trim();
        if (!base64) {
            alert('Please enter Base64 to decode');
            return;
        }
        try {
            decodeOutput.value = atob(base64);
        } catch (e) {
            alert('Invalid Base64 input');
        }
    });
});