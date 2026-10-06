const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm?.addEventListener('submit', event => {
    event.preventDefault();
    if (!contactForm.checkValidity()) {
        contactForm.classList.add('was-validated');
        formStatus.textContent = 'Please fill in all fields.';
        return;
    }
    formStatus.textContent = 'Message sent successfully.';
    contactForm.reset();
    contactForm.classList.remove('was-validated');
});
