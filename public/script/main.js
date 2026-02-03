const SignIn = document.getElementById('signIn');
const SignUp = document.getElementById('signUp');
const forgotPassword =  document.getElementById('forgotPassword');
const resetPassword = document.getElementById('resetPassword');

function Signin() {
    SignIn.style.display = 'block';
    SignUp.style.display = 'none';
    forgotPassword.style.display = 'none';
    resetPassword.style.display = 'none';
}

function Signup() {
    SignIn.style.display = 'none';
    SignUp.style.display = 'block';
    forgotPassword.style.display = 'none';
    resetPassword.style.display = 'none';
}

function Forgotpws() {
    SignIn.style.display = 'none';
    SignUp.style.display = 'none';
    forgotPassword.style.display = 'block';
    resetPassword.style.display = 'none';
}
