document.addEventListener('DOMContentLoaded', function() {
    // ... existing initialization code ...

    resizeBtn.addEventListener('click', function() {
        if (!selectedFile) return;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = function() {
            const width = parseInt(widthInput.value) || img.width;
            const height = parseInt(heightInput.value) || img.height;
            
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);

            const resizedUrl = canvas.toDataURL('image/jpeg', 0.9);
            
            downloadLink.href = resizedUrl;
            downloadLink.download = 'resized_' + selectedFile.name;
            downloadContainer.classList.remove('d-none');
        };

        img.src = URL.createObjectURL(selectedFile);
    });
});