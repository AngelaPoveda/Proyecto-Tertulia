document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formCheckout');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validación de Bootstrap
        if (!form.checkValidity()) {
            e.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        // Simulación de sesión
        const usuario = localStorage.getItem('usuario');

        if (!usuario) {
            Swal.fire({
                icon: 'warning',
                title: 'Inicia sesión',
                text: 'Debes iniciar sesión antes de realizar tu pedido.',
                confirmButtonText: 'Ir a iniciar sesión',
                confirmButtonColor: '#6B4F28'
            }).then(() => {
                window.location.href = '/login.html';
            });
            return;
        }

        // Simular la compra
        const nombre = document.getElementById('nombre').value;
        const direccion = document.getElementById('direccion').value;
        const pago = document.getElementById('pago').value;

        Swal.fire({
            icon: 'success',
            title: '¡Pedido confirmado! 🎉',
            html: `
        <p><b>Gracias ${nombre}</b></p>
        <p>Tu pedido será entregado en:</p>
        <p><i>${direccion}</i></p>
        <p><b>Método de pago:</b> ${pago}</p>
      `,
            confirmButtonColor: '#6B4F28'
        }).then(() => {
            localStorage.removeItem('carrito');
            window.location.href = '/';
        });
    });
});
