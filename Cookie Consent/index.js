document.addEventListener("DOMContentLoaded", function () {
    const cookieContain = document.querySelector(".cookies-container"), 
    button = document.querySelector(".btn-cookies1"),
    buttons = document.querySelector(".btn-cookies2");

    const Verify = localStorage.getItem('cookies');

    button.addEventListener('click', () => {
        localStorage.setItem('cookies', "true");
        cookieContain.style.display = 'none';
    });
    buttons.addEventListener('click', () => {
        localStorage.setItem('cookies', "true");
        cookieContain.style.display = 'none';
    });
    if (Verify) cookieContain.style.display = 'none'
})
