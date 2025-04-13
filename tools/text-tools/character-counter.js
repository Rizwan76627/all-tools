document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('textInput');
    const charCount = document.getElementById('charCount');
    const wordCount = document.getElementById('wordCount');
    const lineCount = document.getElementById('lineCount');
    
    textInput.addEventListener('input', function() {
        const text = this.value;
        
        // Character count (including spaces)
        charCount.textContent = text.length;
        
        // Word count
        const words = text.trim() ? text.trim().split(/\s+/) : [];
        wordCount.textContent = words.length;
        
        // Line count
        const lines = text.trim() ? text.split('\n') : [];
        lineCount.textContent = lines.length;
    });
});