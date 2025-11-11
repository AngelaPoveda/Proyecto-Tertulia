document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formCheckout');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validación de Bootstrap
        if (!form.checkValidity()) {
            e.stopPropagation();
            form.classList.add('was-validated');
            return;
        }
        
        // Obtener datos del formulario
        const nombre = document.getElementById('nombre').value;
        const telefono = document.getElementById('telefono').value;
        const direccion = document.getElementById('direccion').value;
        const pago = document.getElementById('pago').value;
        const fechaEntrega = document.getElementById('fechaEntrega').value;
        const horaEntrega = document.getElementById('horaEntrega').value;

        // Obtener carrito desde localStorage
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

        if (carrito.length === 0) {
            Swal.fire({
                icon: 'info',
                title: 'Tu carrito está vacío',
                text: 'Agrega productos antes de confirmar el pedido.',
                confirmButtonColor: '#6B4F28'
            });
            return;
        }

        // Calcular total
        const total = carrito.reduce((suma, item) => suma + (item.precio * item.cantidad), 0);

        // Crear objeto del pedido según tu modelo de backend
        const pedido = {
            nombre: nombre,
            telefono: telefono,
            direccion: direccion,
            metodoPago: pago,
            fechaEntrega: fechaEntrega,
            horaEntrega: horaEntrega,
            total: total,
            detalles: carrito.map(item => ({
                producto: { id: item.id }, // ✅ importante: referenciar solo el id del producto
                cantidad: item.cantidad,
                precioUnitario: item.precio,
                subtotal: item.precio * item.cantidad
            }))
        };

        console.log("Pedido a enviar:", pedido);

        try {
            const response = await fetch('/pedidos/guardar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(pedido)
            });

            if (response.ok) {
                const fecha = new Date(fechaEntrega);
                const fechaFormateada = fecha.toLocaleDateString('es-ES', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });

                Swal.fire({
                    icon: 'success',
                    title: '¡Pedido confirmado! 🎉',
                    html: `
            <p><b>Gracias ${nombre}</b></p>
            <p>Tu pedido será entregado en:</p>
            <p><i>${direccion}</i></p>
            <p><b>Fecha de entrega:</b> ${fechaFormateada}</p>
            <p><b>Hora de entrega:</b> ${horaEntrega}</p>
            <p><b>Método de pago:</b> ${pago}</p>
        `,
                    confirmButtonColor: '#6B4F28'
                }).then(() => {
                    localStorage.removeItem('carrito');
                    window.location.href = '/';
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al guardar el pedido',
                    text: 'Inténtalo nuevamente más tarde.',
                    confirmButtonColor: '#6B4F28'
                });
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error en la conexión',
                text: 'No se pudo enviar el pedido al servidor.',
                confirmButtonColor: '#6B4F28'
            });
        }
    });
});

// 🔹 Validar fecha mínima y hora permitida
document.addEventListener('DOMContentLoaded', function () {
    const fechaInput = document.getElementById('fechaEntrega');
    const today = new Date().toISOString().split('T')[0];
    fechaInput.min = today;

    const horaInput = document.getElementById('horaEntrega');
    horaInput.addEventListener('change', function () {
        const hora = this.value;
        if (hora < '09:00' || hora > '20:00') {
            this.setCustomValidity('Por favor selecciona una hora entre las 9:00 y las 20:00');
        } else {
            this.setCustomValidity('');
        }
    });
});
