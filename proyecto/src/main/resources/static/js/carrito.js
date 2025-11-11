document.addEventListener('DOMContentLoaded', () => {
  const contenedorCarrito = document.querySelector(".carrito-contenido");
  const finalizarBtn = document.getElementById('finalizarCompra');

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // ---- Guarda el carrito ----
  const guardarCarrito = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  };

  // ---- Renderiza el carrito ----
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

    // ---- Botones eliminar ----
    document.querySelectorAll(".eliminar-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.closest("button").dataset.index;
        eliminarDelCarrito(index);
      });
    });

    // ---- Botón vaciar ----
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
            localStorage.removeItem("carrito");
            Swal.fire({
              icon: 'success',
              title: 'Carrito vacío',
              text: 'Se han eliminado todos los productos 🛒',
              showConfirmButton: false,
              timer: 1500
            });
            setTimeout(() => location.reload(), 1500);
          }
        });
      });
    }
  };

  // ---- Eliminar producto ----
  const eliminarDelCarrito = (index) => {
    carrito.splice(index, 1);
    guardarCarrito();
    renderCarrito();
  };

  // Render inicial
  renderCarrito();

if (finalizarBtn) {
  finalizarBtn.addEventListener('click', () => {
    if (carrito.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Carrito vacío',
        text: 'Agrega productos antes de finalizar tu compra.',
        confirmButtonColor: '#6B4F28'
      });
      return;
    }

    // ⚠️ Si el usuario NO ha iniciado sesión (según el backend)
    if (!isAuthenticated) {
      Swal.fire({
        icon: 'warning',
        title: 'Inicia sesión',
        text: 'Debes iniciar sesión para finalizar tu compra.',
        confirmButtonText: 'Ir a iniciar sesión',
        confirmButtonColor: '#6B4F28'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/login';
        }
      });
      return;
    }

    // ✅ Si hay sesión → ir al checkout
    window.location.href = '/checkout';
    });
  }
});


