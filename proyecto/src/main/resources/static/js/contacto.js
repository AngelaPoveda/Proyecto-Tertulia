document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contactoForm");

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        if (!form.checkValidity()) {
            form.classList.add("was-validated");
            return;
        }

        const data = {
            nombre: document.getElementById("nombre").value,
            apellido: document.getElementById("apellido").value,
            correo: document.getElementById("correo").value,
            telefono: document.getElementById("telefono").value,
            mensaje: document.getElementById("mensaje").value
        };

        fetch("/contacto/enviar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            Swal.fire({
                icon: "success",
                title: "¡Gracias por contactarnos!",
                text: result.mensaje,
                confirmButtonColor: "#795548"
            });
            form.reset();
            form.classList.remove("was-validated");
        })
        .catch(error => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No se pudo enviar el formulario. Intenta nuevamente.",
                confirmButtonColor: "#d33"
            });
        });
    });
});