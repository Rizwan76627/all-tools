document.addEventListener('DOMContentLoaded', function() {
    const markdownInput = document.getElementById('markdownInput');
    const htmlOutput = document.getElementById('htmlOutput');
    const htmlPreview = document.getElementById('htmlPreview');
    const convertBtn = document.getElementById('convertBtn');
    const copyHtmlBtn = document.getElementById('copyHtmlBtn');

    // Configure marked.js
    marked.setOptions({
        breaks: true,
        gfm: true
    });

    convertBtn.addEventListener('click', function() {
        const markdown = markdownInput.value;
        if (!markdown.trim()) {
            alert('Please enter Markdown text');
            return;
        }

        const html = marked.parse(markdown);
        htmlOutput.value = html;
        htmlPreview.innerHTML = html;
    });

    copyHtmlBtn.addEventListener('click', function() {
        if (!htmlOutput.value) return;
        
        htmlOutput.select();
        document.execCommand('copy');
        
        const originalText = copyHtmlBtn.textContent;
        copyHtmlBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyHtmlBtn.textContent = originalText;
        }, 2000);
    });

    // Auto-convert when typing with debounce
    let timeout;
    markdownInput.addEventListener('input', function() {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            if (markdownInput.value.trim()) {
                convertBtn.click();
            }
        }, 500);
    });
});