document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado, inicializando botones...');
    
    const buttons = document.querySelectorAll('.show-more-btn');
    console.log('Botones encontrados:', buttons.length);
    
    buttons.forEach(function(button, index) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetCategory = this.getAttribute('data-target');
            const extraProducts = document.querySelectorAll(`.extra-product[data-category="${targetCategory}"]`);
            const icon = this.querySelector('i');
            
            // Toggle de los productos extra
            extraProducts.forEach(function(product) {
                product.classList.toggle('d-none');
            });
            
            // Toggle del ícono
            if (icon) {
                icon.classList.toggle('bi-arrow-down');
                icon.classList.toggle('bi-arrow-up');
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const usuario = localStorage.getItem("usuario");
  const usuarioDropdown = document.getElementById("usuarioDropdown");
  const loginNav = document.getElementById("loginNav");
  const nombreUsuario = document.getElementById("nombreUsuario");
  const logoutBtn = document.getElementById("logoutBtn");

  if (usuario) {
    // Mostrar nombre de usuario e ícono
    usuarioDropdown.style.display = "block";
    loginNav.style.display = "none";
    nombreUsuario.textContent = usuario;
  } else {
    // Mostrar solo "Iniciar sesión"
    usuarioDropdown.style.display = "none";
    loginNav.style.display = "block";
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("usuario");
      window.location.href = "/"; // Redirige al inicio
    });
  }
});


var TrandingSlider = new Swiper('.tranding-slider', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  slidesPerView: 'auto',
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2.5,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
});

function agregarAlCarrito(producto) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const existente = carrito.find(p => p.id === producto.id);

  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  const toastElement = document.getElementById('toastCarrito');
  const toast = new bootstrap.Toast(toastElement);
  toast.show();
}

  document.addEventListener("DOMContentLoaded", () => {
    const usuario = localStorage.getItem("usuario");
    const usuarioDropdown = document.getElementById("usuarioDropdown");
    const loginNav = document.getElementById("loginNav");
    const nombreUsuario = document.getElementById("nombreUsuario");
    const logoutBtn = document.getElementById("logoutBtn");

    if (usuario) {
      usuarioDropdown.style.display = "block";
      loginNav.style.display = "none";
      nombreUsuario.textContent = usuario;
    }

    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("usuario");
        window.location.reload();
      });
    }
  });

