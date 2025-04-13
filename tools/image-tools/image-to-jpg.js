document.addEventListener('DOMContentLoaded', function() {
    // ... existing initialization code ...

    // Convert to JPG
    convertBtn.addEventListener('click', function() {
        if (!selectedFile) return;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            // Convert to JPG with selected quality
            const quality = qualitySlider.value / 100;
            const jpgUrl = canvas.toDataURL('image/jpeg', quality);

            // Create download link
            downloadLink.href = jpgUrl;
            downloadLink.download = selectedFile.name.replace(/\.[^/.]+$/, '') + '.jpg';
            downloadContainer.classList.remove('d-none');
        };

        img.src = URL.createObjectURL(selectedFile);
    });
});