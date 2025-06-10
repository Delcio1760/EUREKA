const signInBtnLink = document.querySelector('.signInBtn-link');
const signUpBtnLink = document.querySelector('.signUpBtn-link');
const wrapper = document.querySelector('.wrapper');
const signUpForm = document.querySelector('.form-wrapper.sign-up');
const signInForm = document.querySelector('.form-wrapper.sign-in');

signUpBtnLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});


signInBtnLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});
