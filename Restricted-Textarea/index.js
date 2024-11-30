document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.getElementById('message'), 
    contador = document.getElementById('counter'),
    container = document.getElementById('container');
    
    textarea.addEventListener('input', function(){
        const text = textarea.value.length;
        contador.textContent = `${text}/250`;
        if (text >= 250) {
            container.classList.add('error')
        } else {
            container.classList.remove('error')
        }
    })
})
