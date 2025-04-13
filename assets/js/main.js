document.addEventListener('DOMContentLoaded', function() {
    // Load header and footer
    loadHeader();
    loadFooter();
    
    // Load all tools
    loadTools();
    
    // Setup search functionality
    document.getElementById('searchBtn').addEventListener('click', searchTools);
    document.getElementById('searchTools').addEventListener('keyup', function(e) {
        if (e.key === 'Enter') searchTools();
    });
});

function loadHeader() {
    fetch('components/header.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('header-container').innerHTML = html;
        });
}

function loadFooter() {
    fetch('components/footer.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('footer-container').innerHTML = html;
        });
}

function loadTools() {
    const tools = [
        {
            name: 'Keyword Density Checker',
            category: 'SEO Tools',
            url: 'tools/seo-tools/keyword-density.html',
            icon: 'fa-chart-line'
        },
        {
            name: 'Character Counter',
            category: 'Text Tools',
            url: 'tools/text-tools/character-counter.html',
            icon: 'fa-font'
        },
        {
            name: 'Image to PDF Converter',
            category: 'Image Tools',
            url: 'tools/image-tools/image-to-pdf.html',
            icon: 'fa-file-pdf'
        },
        {
            name: 'Image to PNG',
            category: 'Image Tools',
            url: 'tools/image-tools/image-to-png.html',
            icon: 'fa-image'
        },
        {
            name: 'Image to JPG',
            category: 'Image Tools',
            url: 'tools/image-tools/image-to-jpg.html',
            icon: 'fa-image'
        },
        {
            name: 'Image Resizer',
            category: 'Image Tools',
            url: 'tools/image-tools/image-resizer.html',
            icon: 'fa-expand'
        },
        {
            name: 'Case Converter',
            category: 'Text Tools',
            url: 'tools/text-tools/case-converter.html',
            icon: 'fa-text-height'
        },
        {
            name: 'URL Encoder/Decoder',
            category: 'Text Tools',
            url: 'tools/text-tools/url-encoder-decoder.html',
            icon: 'fa-link'
        },
        {
            name: 'Base64 Encoder/Decoder',
            category: 'Developer Tools',
            url: 'tools/developer-tools/base64-encoder-decoder.html',
            icon: 'fa-code'
        },
        {
            name: 'JSON Formatter',
            category: 'Developer Tools',
            url: 'tools/developer-tools/json-formatter.html',
            icon: 'fa-brackets-curly'
        },
        {
            name: 'Markdown to HTML',
            category: 'Developer Tools',
            url: 'tools/developer-tools/markdown-to-html.html',
            icon: 'fa-code'
        },
        {
            name: 'Password Strength Checker',
            category: 'Security Tools',
            url: 'tools/security-tools/password-strength-checker.html',
            icon: 'fa-lock'
        },
        {
            name: 'Currency Converter',
            category: 'Calculators',
            url: 'tools/calculators/currency-converter.html',
            icon: 'fa-money-bill-wave'
        },
        {
            name: 'Temperature Converter',
            category: 'Calculators',
            url: 'tools/calculators/temperature-converter.html',
            icon: 'fa-temperature-high'
        },
        {
            name: 'Time Zone Converter',
            category: 'Calculators',
            url: 'tools/calculators/time-zone-converter.html',
            icon: 'fa-clock'
        },
        {
            name: 'QR Code Generator',
            category: 'Image Tools',
            url: 'tools/image-tools/qr-code-generator.html',
            icon: 'fa-qrcode'
        },
        {
            name: 'Color Code Picker',
            category: 'Developer Tools',
            url: 'tools/developer-tools/color-code-picker.html',
            icon: 'fa-palette'
        },
        {
            name: 'Meta Tag Generator',
            category: 'SEO Tools',
            url: 'tools/seo-tools/meta-tag-generator.html',
            icon: 'fa-tags'
        },
        {
            name: 'Word Counter',
            category: 'Text Tools',
            url: 'tools/text-tools/word-counter.html',
            icon: 'fa-list-ol'
        },
        {
            name: 'Image Comparator',
            category: 'Image Tools',
            url: 'tools/image-tools/image-comparator.html',
            icon: 'fa-columns'
        }
    ];

    const toolsContainer = document.getElementById('toolsContainer');
    
    tools.forEach(tool => {
        const toolCard = document.createElement('div');
        toolCard.className = 'tool-card card';
        toolCard.innerHTML = `
            <div class="card-body">
                <div class="d-flex align-items-center">
                    <i class="fas ${tool.icon} fa-2x me-3"></i>
                    <div>
                        <h5 class="card-title mb-1">${tool.name}</h5>
                        <small class="text-muted">${tool.category}</small>
                    </div>
                </div>
                <a href="${tool.url}" class="stretched-link"></a>
            </div>
        `;
        toolsContainer.appendChild(toolCard);
    });
}

function searchTools() {
    const searchTerm = document.getElementById('searchTools').value.toLowerCase();
    const toolCards = document.querySelectorAll('.tool-card');
    
    toolCards.forEach(card => {
        const toolName = card.querySelector('.card-title').textContent.toLowerCase();
        if (toolName.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}