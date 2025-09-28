(() => {
    'use strict'
    const forms = document.querySelectorAll('.needs-validation')
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            } else {
                event.preventDefault(); // evita recargar la página
                alert("Formulario enviado correctamente ✅");
            }
            form.classList.add('was-validated')
        }, false)
    })
})()