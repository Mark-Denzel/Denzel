// flipcard.js
document.addEventListener('DOMContentLoaded', function() {
    const gmailCard = document.querySelector('.gmail-card');
    if (!gmailCard) return; // Exit if no Gmail card found
    
    const gmailForm = gmailCard.querySelector('.flipcard-form');
    let isFormActive = false;

    // When clicking into the form, set flag to true
    gmailForm.addEventListener('focusin', function(e) {
        // Check if the focused element is an input or textarea
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            isFormActive = true;
            gmailCard.classList.add('form-active');
        }
    });

    // When clicking outside the form, set flag to false
    gmailForm.addEventListener('focusout', function(e) {
        // Only proceed if the new focused element is not part of the form
        if (!gmailForm.contains(e.relatedTarget)) {
            isFormActive = false;
            gmailCard.classList.remove('form-active');
            
            // Flip back to front after a short delay if mouse isn't hovering
            setTimeout(() => {
                if (!gmailCard.matches(':hover') && !isFormActive) {
                    gmailCard.querySelector('.flip-card-inner').style.transform = 'rotateY(0deg)';
                }
            }, 100);
        }
    });

    // Modify hover behavior based on form activity
    gmailCard.addEventListener('mouseleave', function() {
        if (!isFormActive) {
            this.querySelector('.flip-card-inner').style.transform = 'rotateY(0deg)';
        }
    });

    gmailCard.addEventListener('mouseenter', function() {
        if (!isFormActive) {
            this.querySelector('.flip-card-inner').style.transform = 'rotateY(180deg)';
        }
    });
});