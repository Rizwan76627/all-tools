document.addEventListener('DOMContentLoaded', function() {
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const caseButtons = document.querySelectorAll('[data-case]');
    const copyBtn = document.getElementById('copyBtn');

    // Add event listeners to all case buttons
    caseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const caseType = this.getAttribute('data-case');
            convertCase(caseType);
        });
    });

    // Copy to clipboard
    copyBtn.addEventListener('click', function() {
        if (!outputText.value) return;
        
        outputText.select();
        document.execCommand('copy');
        
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    });

    function convertCase(caseType) {
        const text = inputText.value;
        if (!text) return;

        let convertedText;
        switch(caseType) {
            case 'lower':
                convertedText = text.toLowerCase();
                break;
            case 'upper':
                convertedText = text.toUpperCase();
                break;
            case 'title':
                convertedText = text.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
                break;
            case 'sentence':
                convertedText = text.toLowerCase().replace(/^\s*\w|\.\s*\w/g, char => char.toUpperCase());
                break;
            case 'camel':
                convertedText = text.toLowerCase()
                    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
                    .replace(/^./, char => char.toLowerCase());
                break;
            case 'pascal':
                convertedText = text.toLowerCase()
                    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
                    .replace(/^./, char => char.toUpperCase());
                break;
            case 'snake':
                convertedText = text.toLowerCase()
                    .replace(/\s+/g, '_')
                    .replace(/[^a-zA-Z0-9_]/g, '');
                break;
            case 'kebab':
                convertedText = text.toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^a-zA-Z0-9-]/g, '');
                break;
            default:
                convertedText = text;
        }

        outputText.value = convertedText;
    }
});