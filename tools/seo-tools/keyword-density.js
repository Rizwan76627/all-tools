document.addEventListener('DOMContentLoaded', function() {
    const analyzeBtn = document.getElementById('analyzeBtn');
    const resultsContainer = document.getElementById('resultsContainer');
    
    analyzeBtn.addEventListener('click', function() {
        const text = document.getElementById('textInput').value.toLowerCase();
        const keywords = document.getElementById('keywordsInput').value.toLowerCase().split(',');
        
        if (!text || !keywords.length) {
            alert('Please enter both text and keywords');
            return;
        }
        
        const wordCount = text.split(/\s+/).length;
        let resultsHtml = '<h4>Keyword Density Results</h4><ul class="list-group">';
        
        keywords.forEach(keyword => {
            keyword = keyword.trim();
            if (!keyword) return;
            
            const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
            const count = (text.match(regex) || []).length;
            const density = ((count / wordCount) * 100).toFixed(2);
            
            resultsHtml += `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    ${keyword}
                    <span class="badge bg-primary rounded-pill">${density}% (${count})</span>
                </li>
            `;
        });
        
        resultsHtml += '</ul>';
        resultsContainer.innerHTML = resultsHtml;
    });
});