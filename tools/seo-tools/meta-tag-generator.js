document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generateBtn');
    const metaOutput = document.getElementById('metaOutput');
    
    generateBtn.addEventListener('click', function() {
        const title = document.getElementById('metaTitle').value;
        const description = document.getElementById('metaDescription').value;
        const keywords = document.getElementById('metaKeywords').value;
        
        const metaTags = `
<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}">
<meta name="description" content="${description}">
<meta name="keywords" content="${keywords}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:title" content="${title}">
<meta property="twitter:description" content="${description}">
        `;
        
        metaOutput.value = metaTags.trim();
    });
});