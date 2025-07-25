

const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');

function setLoading(isLoading) {
    loginBtn.disabled = isLoading;
    signupBtn.disabled = isLoading;

    if (isLoading) {
        authMessage.textContent = 'Processing...';
        authMessage.classList.remove('success');
        authMessage.style.color = '#E50914';
    }
}
function validateInputs(email, password) {
    if (!email) {
        authMessage.textContent = 'Email cannot be empty.';
        return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        authMessage.textContent = 'Please enter a valid email.';
        return false;
    }
    if (!password) {
        authMessage.textContent = 'Password cannot be empty.';
        return false;
    }
    if (password.length < 6) {
        authMessage.textContent = 'Password must be at least 6 characters.';
        return false;
    }
    return true;
}
signupBtn.onclick = () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!validateInputs(email, password)) return;

    setLoading(true);

    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            authMessage.textContent = 'Sign up successful! Redirecting...';
            authMessage.classList.add('success');
            setTimeout(() => window.location.href = 'index.html', 1500);
        })
        .catch(error => {
            authMessage.textContent = error.message;
            setLoading(false);
        });
};

loginBtn.onclick = () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!validateInputs(email, password)) return;

    setLoading(true);

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            authMessage.textContent = 'Login successful! Redirecting...';
            authMessage.classList.add('success');
            setTimeout(() => window.location.href = 'index.html', 1500);
        })
        .catch(error => {
            switch (error.code) {
              
                case 'auth/invalid-login-credentials':
                    authMessage.textContent = 'Incorrect email or password. Please try again.';
                    break;

                case 'auth/too-many-requests':
                    authMessage.textContent = 'Access has been temporarily disabled. Please reset your password or try again later.';
                    break;

                default:
                    authMessage.textContent = 'An unexpected error occurred. Please try again.';
                    console.error(error); 
            }

            setLoading(false); 
        });
};

forgotPasswordBtn.onclick = () => {
    const email = emailInput.value.trim();
    if (!email) {
        authMessage.textContent = 'Please enter your email to reset password.';
        return;
    }
    setLoading(true);
    auth.sendPasswordResetEmail(email)
        .then(() => {
            authMessage.textContent = 'Password reset email sent! Check your inbox. If you don\'t see it in your inbox, please check your spam folder.';
            authMessage.classList.add('success');
            setLoading(false);
        })
        .catch(error => {
        
            console.error("Password Reset Error:", error);

          
            if (error.code === 'auth/user-not-found') {
                authMessage.textContent = 'No account found with this email address.';
            } else {
                authMessage.textContent = 'Failed to send password reset email. Please try again.';
            }
            setLoading(false);
        });
};
togglePassword.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePassword.textContent = 'Hide password';
    } else {
        passwordInput.type = 'password';
        togglePassword.textContent = 'Show password';
    }
});

auth.onAuthStateChanged(user => {
    if (user) {
        window.location.href = 'index.html';
    }
});



