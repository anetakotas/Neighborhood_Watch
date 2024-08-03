document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('reportForm');
    const anonymousCheckbox = document.getElementById('anonymous');
    const personalInfo = document.getElementById('personalInfo');
    const closeBtn = document.querySelector('.close-btn');
    const thankYouDiv = document.getElementById('thank-you');

    // source for checkbox: https://www.w3schools.com/howto/howto_js_display_checkbox_text.asp
    anonymousCheckbox.addEventListener('change', function() {
        if (this.checked) {
            personalInfo.style.display = 'none';
        } else {
            personalInfo.style.display = 'block';
        }
    });

    // form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        hideForm();

        form.reset();
        personalInfo.style.display = 'block'; 
    });

    // fade in animation for the msg
    function hideForm() {
        $("#reportForm").fadeOut(800, function() {
            $("#thank-you").fadeIn(800);
        });
    }

    closeBtn.addEventListener('click', function() {
        $("#thank-you").fadeOut(800, function() {
            $("#reportForm").fadeIn(800);
        });
    });
});
