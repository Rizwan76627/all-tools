document.addEventListener('DOMContentLoaded', function() {
    const imageInput = document.getElementById('imageInput');
    const previewContainer = document.getElementById('previewContainer');
    const imagePreview = document.getElementById('imagePreview');
    const convertBtn = document.getElementById('convertBtn');
    const downloadContainer = document.getElementById('downloadContainer');
    const downloadLink = document.getElementById('downloadLink');
    const qualitySlider = document.getElementById('qualitySlider');
    const uploadArea = document.querySelector('.upload-area');

    let selectedFile = null;

    // Handle file selection
    imageInput.addEventListener('change', function(e) {
        if (e.target.files.length) {
            selectedFile = e.target.files[0];
            displayPreview(selectedFile);
        }
    });

    // Handle drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('border-primary');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('border-primary');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('border-primary');
        
        if (e.dataTransfer.files.length) {
            selectedFile = e.dataTransfer.files[0];
            displayPreview(selectedFile);
        }
    });

    // Display image preview
    function displayPreview(file) {
        if (!file.type.match('image.*')) {
            alert('Please select an image file');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            previewContainer.classList.remove('d-none');
            convertBtn.disabled = false;
        };
        reader.readAsDataURL(file);
    }

    // Convert to PNG
    convertBtn.addEventListener('click', function() {
        if (!selectedFile) return;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            // Convert to PNG with selected quality
            const quality = qualitySlider.value / 100;
            const pngUrl = canvas.toDataURL('image/png', quality);

            // Create download link
            downloadLink.href = pngUrl;
            downloadLink.download = selectedFile.name.replace(/\.[^/.]+$/, '') + '.png';
            downloadContainer.classList.remove('d-none');
        };

        img.src = URL.createObjectURL(selectedFile);
    });
});