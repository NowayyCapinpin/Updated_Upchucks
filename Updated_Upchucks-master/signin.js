document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tab");
    const signupForm = document.getElementById("signup-form");
    const signinForm = document.getElementById("signin-form");
    const togglePassword = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("password");

    // Tab switch
    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            document.querySelector(".tab.active")?.classList.remove("active");
            tab.classList.add("active");

            const isSignup = tab.dataset.form === "signup";
            signupForm.classList.toggle("hidden", !isSignup);
            signinForm.classList.toggle("hidden", isSignup);
        });
    });

    // Toggle password visibility
    togglePassword?.addEventListener("click", () => {
        passwordInput.type = passwordInput.type === "password" ? "text" : "password";
    });

    // Gmail-only validation
    function validateGmail(email) {
        return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email.trim());
    }

    signupForm.addEventListener("submit", (event) => {
        const emailInput = signupForm.querySelector('input[name="email"]');
        if (!validateGmail(emailInput.value)) {
            event.preventDefault();
            alert("Please enter a valid @gmail.com email address.");
            emailInput.focus();
        } else {
            event.preventDefault();
            alert("New account successfully created!");
    
            // Reset the form (optional)
            signupForm.reset();
    
            // Switch to Sign In tab
            document.querySelector('.tab[data-form="signup"]')?.classList.remove("active");
            document.querySelector('.tab[data-form="signin"]')?.classList.add("active");
    
            signupForm.classList.add("hidden");
            signinForm.classList.remove("hidden");
        }
    });
    
    

    signinForm.addEventListener("submit", (event) => {
        const emailInput = signinForm.querySelector('input[name="email"]');
        if (!validateGmail(emailInput.value)) {
            event.preventDefault();
            alert("Please enter a valid @gmail.com email address.");
            emailInput.focus();
        } else {
            event.preventDefault(); // Stop default form action
            window.location.href = "website.html"; // Replace with your destination HTML
        }
    });
});
