document.addEventListener('DOMContentLoaded', function() {
    const jsonInput = document.getElementById('jsonInput');
    const formatBtn = document.getElementById('formatBtn');
    const minifyBtn = document.getElementById('minifyBtn');
    const validateBtn = document.getElementById('validateBtn');
    const clearBtn = document.getElementById('clearBtn');
    const errorAlert = document.getElementById('errorAlert');
    const formattedJson = document.getElementById('formattedJson');

    formatBtn.addEventListener('click', formatJson);
    minifyBtn.addEventListener('click', minifyJson);
    validateBtn.addEventListener('click', validateJson);
    clearBtn.addEventListener('click', clearAll);

    function formatJson() {
        try {
            const parsedJson = JSON.parse(jsonInput.value);
            formattedJson.textContent = JSON.stringify(parsedJson, null, 4);
            formattedJson.classList.remove('d-none');
            errorAlert.classList.add('d-none');
        } catch (e) {
            showError(e.message);
        }
    }

    function minifyJson() {
        try {
            const parsedJson = JSON.parse(jsonInput.value);
            formattedJson.textContent = JSON.stringify(parsedJson);
            formattedJson.classList.remove('d-none');
            errorAlert.classList.add('d-none');
        } catch (e) {
            showError(e.message);
        }
    }

    function validateJson() {
        try {
            JSON.parse(jsonInput.value);
            showError('Valid JSON', false);
        } catch (e) {
            showError(e.message);
        }
    }

    function clearAll() {
        jsonInput.value = '';
        formattedJson.textContent = '';
        formattedJson.classList.add('d-none');
        errorAlert.classList.add('d-none');
    }

    function showError(message, isError = true) {
        errorAlert.textContent = message;
        errorAlert.classList.remove('d-none');
        errorAlert.className = isError ? 'alert alert-danger' : 'alert alert-success';
        formattedJson.classList.add('d-none');
    }
});