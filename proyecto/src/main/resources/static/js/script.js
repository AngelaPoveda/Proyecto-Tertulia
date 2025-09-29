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