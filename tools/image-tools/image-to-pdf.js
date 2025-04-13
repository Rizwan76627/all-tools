document.addEventListener('DOMContentLoaded', function() {
    const { jsPDF } = window.jspdf;
    const imageInput = document.getElementById('imageInput');
    const browseBtn = document.getElementById('browseBtn');
    const uploadArea = document.querySelector('.upload-area');
    const previewContainer = document.getElementById('previewContainer');
    const imagePreview = document.getElementById('imagePreview');
    const convertBtn = document.getElementById('convertBtn');
    const pdfName = document.getElementById('pdfName');
    let selectedFile = null;

    // Handle file selection
    browseBtn.addEventListener('click', () => imageInput.click());
    imageInput.addEventListener('change', handleFileSelect);

    // Drag and drop functionality
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
            handleFileSelect({ target: { files: [selectedFile] } });
        }
    });

    function handleFileSelect(e) {
        const file = e.target.files[0];
        if (!file.type.match('image.*')) {
            alert('Please select an image file');
            return;
        }

        selectedFile = file;
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            previewContainer.classList.remove('d-none');
            convertBtn.disabled = false;
            
            // Set default PDF name
            if (!pdfName.value) {
                pdfName.value = file.name.replace(/\.[^/.]+$/, '') + '.pdf';
            }
        };
        reader.readAsDataURL(file);
    }

    // Convert to PDF
    convertBtn.addEventListener('click', function() {
        if (!selectedFile) return;

        const pdf = new jsPDF();
        const img = new Image();
        img.onload = function() {
            const width = pdf.internal.pageSize.getWidth();
            const height = (img.height * width) / img.width;
            
            pdf.addImage(img, 'JPEG', 0, 0, width, height);
            pdf.save(pdfName.value || 'converted.pdf');
        };
        img.src = URL.createObjectURL(selectedFile);
    });
});