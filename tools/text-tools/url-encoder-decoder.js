document.addEventListener('DOMContentLoaded', function() {
    const encodeInput = document.getElementById('encodeInput');
    const encodeBtn = document.getElementById('encodeBtn');
    const encodeOutput = document.getElementById('encodeOutput');
    const decodeInput = document.getElementById('decodeInput');
    const decodeBtn = document.getElementById('decodeBtn');
    const decodeOutput = document.getElementById('decodeOutput');

    encodeBtn.addEventListener('click', function() {
        const text = encodeInput.value.trim();
        if (!text) {
            alert('Please enter text to encode');
            return;
        }
        encodeOutput.value = encodeURIComponent(text);
    });

    decodeBtn.addEventListener('click', function() {
        const url = decodeInput.value.trim();
        if (!url) {
            alert('Please enter URL to decode');
            return;
        }
        try {
            decodeOutput.value = decodeURIComponent(url);
        } catch (e) {
            alert('Invalid encoded URL: ' + e.message);
        }
    });
});