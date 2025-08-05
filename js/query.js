        document.addEventListener('DOMContentLoaded', function () {
            const hamburgerButton = document.getElementById('hamburger-btn');
            const navLinks = document.querySelector('.nav-links');

            hamburgerButton.addEventListener('click', function () {
                this.classList.toggle('active');
                navLinks.classList.toggle('active');
            });

            const form = document.getElementById('contact-form');
            const successMessage = document.getElementById('success-message');

            form.addEventListener('submit', function (event) {
                event.preventDefault();
                // Simulate form submission
                successMessage.style.display = 'block';
                form.reset();
            });
        });
		  const form = document.getElementById('contactForm');
        const formMessage = document.getElementById('form-message');

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(form);

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    formMessage.textContent = "Thank you! Your message has been sent successfully.";
                    formMessage.className = "success";
                    form.reset();
                } else {
                    formMessage.textContent = "Oops! There was a problem sending your message. Please try again.";
                    formMessage.className = "error";
                }
                formMessage.style.display = 'block';
            })
            .catch(error => {
                formMessage.textContent = "An error occurred. Please try again later.";
                formMessage.className = "error";
                formMessage.style.display = 'block';
                console.error('Error:', error);
            });
        });