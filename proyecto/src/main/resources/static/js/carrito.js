document.addEventListener("DOMContentLoaded", () => {
  const contenedorCarrito = document.querySelector(".carrito-contenido");

  // Leer el carrito del localStorage
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Función para actualizar el carrito en localStorage
  const guardarCarrito = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  };

  // Función para renderizar el carrito en pantalla
  const renderCarrito = () => {
    if (carrito.length === 0) {
      contenedorCarrito.innerHTML = `
        <p class="fs-4 text-muted mb-0 text-center">
          <i class="bi bi-cart-x fs-1 d-block mb-3"></i>
          El carrito está vacío
        </p>
      `;
      return;
    }

    let total = 0;
    let html = `
      <div class="table-responsive">
        <table class="table align-middle">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
    `;

    carrito.forEach((item, index) => {
      const subtotal = item.precio * item.cantidad;
      total += subtotal;

      html += `
        <tr>
          <td>${item.nombre}</td>
          <td>S/${item.precio.toFixed(2)}</td>
          <td>${item.cantidad}</td>
          <td>S/${subtotal.toFixed(2)}</td>
          <td>
            <button class="btn btn-marronoscuro btn-sm eliminar-btn" data-index="${index}">
              <i class="bi bi-trash"></i> Eliminar
            </button>
          </td>
        </tr>
      `;
    });

    html += `
          </tbody>
        </table>
        <h4 class="text-end">Total: S/${total.toFixed(2)}</h4>
        <button id="vaciarCarrito" class="btn btn-marron">Vaciar carrito</button>
      </div>
    `;

    contenedorCarrito.innerHTML = html;

    // Agregar evento a los botones de eliminar
    const botonesEliminar = document.querySelectorAll(".eliminar-btn");
    botonesEliminar.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.closest("button").dataset.index;
        eliminarDelCarrito(index);
      });
    });
  };

  const eliminarDelCarrito = (index) => {
    carrito.splice(index, 1); // Elimina el producto
    guardarCarrito();         // Guarda los cambios
    renderCarrito();          // Vuelve a mostrar la tabla
  };

  renderCarrito();


  const btnVaciar = document.getElementById("vaciarCarrito");

if (btnVaciar) {
  btnVaciar.addEventListener("click", () => {
    Swal.fire({
      title: '¿Vaciar carrito?',
      text: 'Se eliminarán todos los productos del carrito.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6B4F28', 
      cancelButtonColor: '#3e2723',
      confirmButtonText: 'Sí, vaciar',
      cancelButtonText: 'Cancelar',
      background: '#fff',
      color: '#4b2e00'
    }).then((result) => {
      if (result.isConfirmed) {
        // Eliminar del localStorage
        localStorage.removeItem("carrito");

        Swal.fire({
          icon: 'success',
          title: 'Carrito vacío',
          text: 'Se han eliminado todos los productos 🛒',
          showConfirmButton: false,
          timer: 1500,
          background: '#fff',
          color: '#4b2e00'
        });

        setTimeout(() => {
          location.reload(); 
        }, 1500);
      }
    });
  });
}

// Finalizar compra
const btnFinalizar = document.getElementById("finalizarCompra");
if (btnFinalizar) {
  btnFinalizar.addEventListener("click", () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
      Swal.fire({
        icon: "info",
        title: "Carrito vacío",
        text: "Agrega productos antes de finalizar tu compra ☕",
        confirmButtonColor: "#6B4F28",
        background: "#fff",
        color: "#4b2e00"
      });
      return;
    }

    // Finalizar compra
const btnFinalizar = document.getElementById("finalizarCompra");
if (btnFinalizar) {
  btnFinalizar.addEventListener("click", () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
      Swal.fire({
        icon: "info",
        title: "Carrito vacío",
        text: "Agrega productos antes de finalizar tu compra ☕",
        confirmButtonColor: "#6B4F28",
        background: "#fff",
        color: "#4b2e00"
      });
      return;
    }

    // Generar mensaje con los productos
    let mensaje = "*Pedido desde Tertulia Cafetería:*%0A%0A";
    carrito.forEach(item => {
      mensaje += `• ${item.nombre} x${item.cantidad} - S/${item.precio.toFixed(2)}%0A`;
    });

    let total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    mensaje += `%0A*Total:* S/${total.toFixed(2)}%0A%0AGracias por tu compra`;

    const numero = "51988440290";
    const url = `https://wa.me/${numero}?text=${mensaje}`;

    // Mostrar alerta antes de abrir WhatsApp
    Swal.fire({
      icon: "success",
      title: "¡Gracias por tu compra! ☕",
      text: "Serás redirigido a WhatsApp para confirmar tu pedido.",
      showConfirmButton: false,
      timer: 1800,
      background: "#fff",
      color: "#4b2e00"
    });

    // Esperar 1.8 segundos y abrir WhatsApp
    setTimeout(() => {
      window.open(url, "_blank");
      localStorage.removeItem("carrito");
      location.reload();
    }, 1800);
  });
}

});
  }
});

