//for query form

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');
    
    // Handle form submission
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(form);

        // Show loading message or disable button during submission
        formMessage.textContent = "Sending your message...";
        formMessage.style.display = 'block';
        formMessage.className = "info";  // info for showing loading message

        // Send form data to Web3Forms API
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Display success message
                formMessage.textContent = "Thank you! Your message has been sent successfully.Our team will be in touch with you soon!";
                formMessage.className = "success";
                form.reset(); // Reset the form after successful submission
            } else {
                // Display error message
                formMessage.textContent = "Oops! There was a problem sending your message. Please try again.";
                formMessage.className = "error";
            }
            formMessage.style.display = 'block';
        })
        .catch(error => {
            // Handle network errors
            formMessage.textContent = "An error occurred. Please try again later.";
            formMessage.className = "error";
            formMessage.style.display = 'block';
            console.error('Error:', error);
        });
    });
});
   // for about section 
document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll('.about-item');
    
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
});
// for gallery section 
                document.addEventListener('DOMContentLoaded', function() {
            const galleryGrid = document.querySelector('.gallery-grid');
            const dots = document.querySelectorAll('.nav-dot');
            const prevBtn = document.querySelector('.prev');
            const nextBtn = document.querySelector('.next');
            let currentSlide = 0;
            const slideCount = dots.length;

            // Auto slide function
            function autoSlide() {
                currentSlide = (currentSlide + 1) % slideCount;
                updateSlide();
            }

            // Update slide position and dots
            function updateSlide() {
                galleryGrid.style.transform = `translateX(-${currentSlide * 11.111}%)`;
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentSlide);
                });
            }

            // Set up auto sliding
            let slideInterval = setInterval(autoSlide, 3000);

            // Add click handlers for dots
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    currentSlide = index;
                    updateSlide();
                    resetInterval();
                });
            });

            // Arrow navigation
            prevBtn.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + slideCount) % slideCount;
                updateSlide();
                resetInterval();
            });

            nextBtn.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % slideCount;
                updateSlide();
                resetInterval();
            });

            // Reset interval helper function
            function resetInterval() {
                clearInterval(slideInterval);
                slideInterval = setInterval(autoSlide, 3000);
            }

            // Pause auto-sliding when hovering over gallery
            const galleryContainer = document.querySelector('.gallery-container');
            galleryContainer.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });

            galleryContainer.addEventListener('mouseleave', () => {
                slideInterval = setInterval(autoSlide, 3000);
            });
        });
        
        // for hamburger section 
          const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });

        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
        
        //for donate section 
               
   
    // Counting Animation Function
    function startCountingAnimation(element, start, end, duration) {
        let range = end - start;
        let current = start;
        let increment = end > start ? 1 : -1;
        let stepTime = Math.abs(Math.floor(duration / range));
        let timer = setInterval(function () {
            current += increment;
            element.innerText = current;
            if (current == end) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    // Initialize Animation on Page Load
    document.addEventListener('DOMContentLoaded', function () {
        const stats = [
            { selector: '.stat-item:nth-child(1) h3', end: 1500 },
            { selector: '.stat-item:nth-child(2) h3', end: 2000 },
            { selector: '.stat-item:nth-child(3) h3', end: 10 }
        ];

        stats.forEach(stat => {
            const element = document.querySelector(stat.selector);
            startCountingAnimation(element, 0, stat.end, 2500);  // 2000ms = 2 seconds
        });
    });
