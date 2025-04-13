document.addEventListener('DOMContentLoaded', function() {
    const videoUrl = document.getElementById('videoUrl');
    const fetchBtn = document.getElementById('fetchBtn');
    const thumbnailContainer = document.getElementById('thumbnailContainer');
    const thumbnailsRow = document.getElementById('thumbnailsRow');

    fetchBtn.addEventListener('click', function() {
        const url = videoUrl.value.trim();
        if (!url) {
            alert('Please enter a YouTube video URL');
            return;
        }

        const videoId = extractVideoId(url);
        if (!videoId) {
            alert('Invalid YouTube URL');
            return;
        }

        displayThumbnails(videoId);
    });

    function extractVideoId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    function displayThumbnails(videoId) {
        const thumbnails = [
            { name: 'Default', url: `https://img.youtube.com/vi/${videoId}/default.jpg` },
            { name: 'Medium Quality', url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` },
            { name: 'High Quality', url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` },
            { name: 'Standard Quality', url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg` },
            { name: 'Maximum Resolution', url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` }
        ];

        thumbnailsRow.innerHTML = '';
        thumbnails.forEach(thumb => {
            const col = document.createElement('div');
            col.className = 'col-md-4 mb-3';
            col.innerHTML = `
                <div class="card">
                    <img src="${thumb.url}" class="card-img-top" alt="${thumb.name}">
                    <div class="card-body">
                        <h6 class="card-title">${thumb.name}</h6>
                        <a href="${thumb.url}" class="btn btn-sm btn-success" download="thumbnail-${videoId}-${thumb.name}.jpg">Download</a>
                    </div>
                </div>
            `;
            thumbnailsRow.appendChild(col);
        });

        thumbnailContainer.classList.remove('d-none');
    }
});