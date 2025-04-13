document.addEventListener('DOMContentLoaded', function() {
    // Initialize datetime picker
    $('#datetimepicker').datetimepicker({
        format: 'YYYY-MM-DD HH:mm',
        defaultDate: moment()
    });

    const inputDateTime = document.getElementById('inputDateTime');
    const fromTimeZone = document.getElementById('fromTimeZone');
    const outputDateTime = document.getElementById('outputDateTime');
    const toTimeZone = document.getElementById('toTimeZone');
    const convertBtn = document.getElementById('convertBtn');

    // Convert time zone
    convertBtn.addEventListener('click', function() {
        const dateTimeStr = inputDateTime.value;
        if (!dateTimeStr) {
            alert('Please select a date and time');
            return;
        }

        const fromTz = fromTimeZone.value;
        const toTz = toTimeZone.value;

        const originalTime = moment.tz(dateTimeStr, fromTz);
        const convertedTime = originalTime.clone().tz(toTz);

        outputDateTime.value = convertedTime.format('YYYY-MM-DD HH:mm z');
    });

    // Also convert when any input changes
    [fromTimeZone, toTimeZone].forEach(element => {
        element.addEventListener('change', function() {
            if (inputDateTime.value) {
                convertBtn.click();
            }
        });
    });
});