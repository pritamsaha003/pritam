        // Hamburger menu functionality
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
 
//submission

document.getElementById('volunteerForm').onsubmit = async function(e) {
    e.preventDefault();  // Prevent default form submission
    
    const form = e.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const messageContainer = document.createElement('div');
    
    // Add the message container just below the submit button
    submitButton.insertAdjacentElement('afterend', messageContainer);

    // Show loading indicator to keep users engaged while processing
    submitButton.disabled = true;
    submitButton.innerHTML = "Submitting...";

    // Function to show notification messages
    function showMessage(message, type) {
        messageContainer.classList.add('message', type);
        messageContainer.innerHTML = `<span>${message}</span>`;
    }

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            showMessage("Thank you for joining our cause! Your application has been successfully submitted.", "success");
            form.reset();  // Reset the form after successful submission
        } else {
            console.error(result);
            showMessage("Oops! Something went wrong while submitting the form. Please try again.", "error");
        }
    } catch (error) {
        console.error("Error:", error);
        showMessage("We encountered an issue while connecting to the server. Please check your connection and try again.", "error");
    } finally {
        // Reset submit button after handling form submission
        submitButton.disabled = false;
        submitButton.innerHTML = "Submit";
        
        // Remove the message after 5 seconds for a smooth user experience
        setTimeout(() => {
            messageContainer.remove();
        }, 5000);
    }
};