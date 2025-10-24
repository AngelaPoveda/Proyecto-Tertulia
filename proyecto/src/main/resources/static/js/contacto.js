// ...existing code...
(() => {
    'use strict'
    const forms = document.querySelectorAll('.needs-validation')
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            } else {
                event.preventDefault(); 

                const fd = new FormData(form);
                const tipo = fd.get('tipoSolicitud') || '';
                let mensaje = "Formulario enviado correctamente ✅";
                if (tipo === 'pedido') mensaje = "¡Pedido recibido! Nos pondremos en contacto contigo pronto.";
                if (tipo === 'cotizacion') mensaje = "¡Solicitud de cotización enviada! Pronto recibirás la cotización.";
                if (tipo === 'consulta') mensaje = "¡Consulta enviada! Te responderemos lo antes posible.";

                const modalMsg = document.getElementById('successModalMessage');
                if (modalMsg) modalMsg.textContent = mensaje;

                // Mostrar modal de Bootstrap
                const modalEl = document.getElementById('successModal');
                if (modalEl) {
                    const modal = new bootstrap.Modal(modalEl);
                    modal.show();
                } else {
                    alert(mensaje);
                }
            }
            form.classList.add('was-validated')
        }, false)
    })
})()
