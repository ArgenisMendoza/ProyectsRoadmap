document.addEventListener("DOMContentLoaded", function () {
    const acordeon = document.getElementsByClassName('container-questions');

    for (i = 0; i < acordeon.length; i++) {
        acordeon[i].addEventListener('click', function () {
            this.classList.toggle('show')
        })
    }
})
