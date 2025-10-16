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

  // Función para eliminar un producto del carrito
  const eliminarDelCarrito = (index) => {
    carrito.splice(index, 1); // Elimina el producto
    guardarCarrito();         // Guarda los cambios
    renderCarrito();          // Vuelve a mostrar la tabla
  };

  // Mostrar el carrito al cargar la página
  renderCarrito();

  // Botón Vaciar carrito
const btnVaciar = document.getElementById("vaciarCarrito");
if (btnVaciar) {
  btnVaciar.addEventListener("click", () => {
    if (confirm("¿Seguro que deseas vaciar el carrito?")) {
      localStorage.removeItem("carrito");
      location.reload(); // recarga la página para actualizar el contenido
    }
  });
}

});
