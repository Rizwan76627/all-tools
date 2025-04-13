document.addEventListener('DOMContentLoaded', function() {
    const passwordLength = document.getElementById('passwordLength');
    const lengthValue = document.getElementById('lengthValue');
    const uppercase = document.getElementById('uppercase');
    const lowercase = document.getElementById('lowercase');
    const numbers = document.getElementById('numbers');
    const symbols = document.getElementById('symbols');
    const generatedPassword = document.getElementById('generatedPassword');
    const copyBtn = document.getElementById('copyBtn');
    const generateBtn = document.getElementById('generateBtn');

    // Update length display
    passwordLength.addEventListener('input', function() {
        lengthValue.textContent = this.value;
    });

    // Generate password
    generateBtn.addEventListener('click', function() {
        const length = parseInt(passwordLength.value);
        const hasUpper = uppercase.checked;
        const hasLower = lowercase.checked;
        const hasNumber = numbers.checked;
        const hasSymbol = symbols.checked;

        if (!hasUpper && !hasLower && !hasNumber && !hasSymbol) {
            alert('Please select at least one character type');
            return;
        }

        generatedPassword.value = generatePassword(
            hasUpper, 
            hasLower, 
            hasNumber, 
            hasSymbol, 
            length
        );
    });

    // Copy to clipboard
    copyBtn.addEventListener('click', function() {
        if (!generatedPassword.value) return;
        
        generatedPassword.select();
        document.execCommand('copy');
        
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    });

    // Generate password function
    function generatePassword(upper, lower, number, symbol, length) {
        let charCodes = [];
        
        if (upper) charCodes = charCodes.concat(getRandomUpper());
        if (lower) charCodes = charCodes.concat(getRandomLower());
        if (number) charCodes = charCodes.concat(getRandomNumber());
        if (symbol) charCodes = charCodes.concat(getRandomSymbol());

        const passwordChars = [];
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charCodes.length);
            passwordChars.push(String.fromCharCode(charCodes[randomIndex]));
        }

        return passwordChars.join('');
    }

    // Helper functions for character codes
    function getRandomLower() {
        return Array.from({length: 26}, (_, i) => i + 97);
    }

    function getRandomUpper() {
        return Array.from({length: 26}, (_, i) => i + 65);
    }

    function getRandomNumber() {
        return Array.from({length: 10}, (_, i) => i + 48);
    }

    function getRandomSymbol() {
        const symbols = '!@#$%^&*(){}[]=<>/,.';
        return symbols.split('').map(char => char.charCodeAt(0));
    }
});