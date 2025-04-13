document.addEventListener('DOMContentLoaded', function() {
    const qrContent = document.getElementById('qrContent');
    const qrSize = document.getElementById('qrSize');
    const qrErrorCorrection = document.getElementById('qrErrorCorrection');
    const generateBtn = document.getElementById('generateBtn');
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    const downloadBtn = document.getElementById('downloadBtn');

    generateBtn.addEventListener('click', function() {
        const content = qrContent.value.trim();
        if (!content) {
            alert('Please enter content to encode');
            return;
        }

        const size = parseInt(qrSize.value);
        const errorCorrection = qrErrorCorrection.value;
        
        // Generate QR code
        const qr = qrcode(0, errorCorrection);
        qr.addData(content);
        qr.make();
        
        // Display QR code
        qrCodeContainer.innerHTML = qr.createImgTag(size * 5);
        
        // Enable download button
        downloadBtn.classList.remove('d-none');
    });

    downloadBtn.addEventListener('click', function() {
        const img = qrCodeContainer.querySelector('img');
        if (!img) return;
        
        const link = document.createElement('a');
        link.href = img.src;
        link.download = 'qrcode.png';
        link.click();
    });
});