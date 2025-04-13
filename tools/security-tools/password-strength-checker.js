document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('passwordInput');
    const strengthMeter = document.getElementById('strengthMeter');
    const strengthText = document.getElementById('strengthText');
    const requirements = {
        length: document.getElementById('lengthReq'),
        lowercase: document.getElementById('lowercaseReq'),
        uppercase: document.getElementById('uppercaseReq'),
        number: document.getElementById('numberReq'),
        special: document.getElementById('specialReq')
    };

    passwordInput.addEventListener('input', checkPasswordStrength);

    function checkPasswordStrength() {
        const password = passwordInput.value;
        let strength = 0;
        
        // Check length
        if (password.length >= 8) {
            strength += 20;
            updateRequirement('length', true);
        } else {
            updateRequirement('length', false);
        }
        
        // Check lowercase letters
        if (/[a-z]/.test(password)) {
            strength += 20;
            updateRequirement('lowercase', true);
        } else {
            updateRequirement('lowercase', false);
        }
        
        // Check uppercase letters
        if (/[A-Z]/.test(password)) {
            strength += 20;
            updateRequirement('uppercase', true);
        } else {
            updateRequirement('uppercase', false);
        }
        
        // Check numbers
        if (/[0-9]/.test(password)) {
            strength += 20;
            updateRequirement('number', true);
        } else {
            updateRequirement('number', false);
        }
        
        // Check special characters
        if (/[^A-Za-z0-9]/.test(password)) {
            strength += 20;
            updateRequirement('special', true);
        } else {
            updateRequirement('special', false);
        }
        
        // Update strength meter
        strengthMeter.style.width = strength + '%';
        
        // Update strength text and color
        if (strength <= 20) {
            strengthText.textContent = 'Very Weak';
            strengthMeter.className = 'progress-bar bg-danger';
        } else if (strength <= 40) {
            strengthText.textContent = 'Weak';
            strengthMeter.className = 'progress-bar bg-warning';
        } else if (strength <= 60) {
            strengthText.textContent = 'Moderate';
            strengthMeter.className = 'progress-bar bg-info';
        } else if (strength <= 80) {
            strengthText.textContent = 'Strong';
            strengthMeter.className = 'progress-bar bg-primary';
        } else {
            strengthText.textContent = 'Very Strong';
            strengthMeter.className = 'progress-bar bg-success';
        }
    }
    
    function updateRequirement(type, met) {
        const badge = requirements[type].querySelector('.badge');
        badge.className = met ? 'badge bg-success me-2' : 'badge bg-danger me-2';
        badge.textContent = met ? '✓' : '✗';
    }
});