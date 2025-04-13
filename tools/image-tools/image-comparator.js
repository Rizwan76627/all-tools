document.addEventListener('DOMContentLoaded', function() {
    const image1Input = document.getElementById('image1Input');
    const image2Input = document.getElementById('image2Input');
    const image1Preview = document.getElementById('image1Preview');
    const image2Preview = document.getElementById('image2Preview');
    const comparisonContainer = document.querySelector('.comparison-container');
    const slider = document.querySelector('.slider');
    const comparisonSlider = document.getElementById('comparisonSlider');
    let isDragging = false;

    // Load images
    image1Input.addEventListener('change', function(e) {
        loadImage(e.target.files[0], image1Preview);
    });

    image2Input.addEventListener('change', function(e) {
        loadImage(e.target.files[0], image2Preview);
    });

    function loadImage(file, imgElement) {
        if (!file.type.match('image.*')) {
            alert('Please select an image file');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            imgElement.src = e.target.result;
            imgElement.onload = function() {
                resizeImages();
            };
        };
        reader.readAsDataURL(file);
    }

    function resizeImages() {
        const containerWidth = comparisonContainer.offsetWidth;
        const containerHeight = comparisonContainer.offsetHeight;
        
        // Set both images to same dimensions as container
        image1Preview.style.width = containerWidth + 'px';
        image2Preview.style.width = containerWidth + 'px';
        image1Preview.style.height = containerHeight + 'px';
        image2Preview.style.height = containerHeight + 'px';
    }

    // Slider functionality
    comparisonSlider.addEventListener('input', function() {
        const value = this.value;
        slider.style.left = value + '%';
        document.querySelector('.image-wrapper').style.width = value + '%';
    });

    // Drag slider functionality
    slider.addEventListener('mousedown', function(e) {
        isDragging = true;
        e.preventDefault();
    });

    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        const containerRect = comparisonContainer.getBoundingClientRect();
        let x = e.clientX - containerRect.left;
        x = Math.max(0, Math.min(x, containerRect.width));
        
        const percent = (x / containerRect.width) * 100;
        comparisonSlider.value = percent;
        slider.style.left = percent + '%';
        document.querySelector('.image-wrapper').style.width = percent + '%';
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
    });
});