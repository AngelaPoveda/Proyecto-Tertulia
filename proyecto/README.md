# Tertulia-Cafeteria
Proyecto web desarrollado en Spring Boot con integración de Bootstrap para la parte visual.
Este sistema simula la página oficial de la cafetería "Tertulia", incluyendo secciones informativas y un carrito de compras.

📑 Contenido
Descripción
Características
Tecnologías
Ejecución del proyecto
Estructura del proyecto
Autor
📖 Descripción

El proyecto busca mostrar una página web moderna para una cafetería, donde los usuarios pueden navegar entre secciones como:

Inicio
Carta
Quiénes Somos
Contacto
Carrito

Además, se implementó un formulario de contacto funcional.

✨ Características
Navegación con controladores Spring MVC.
Plantillas HTML integradas con Thymeleaf.
Uso de Bootstrap 5 para diseño responsive.
Formulario de contacto con validación y envío simulado en consola.
Organización de vistas en carpetas (templates).
🛠️ Tecnologías
Java 17
Spring Boot 3
Maven
Thymeleaf
Bootstrap 5
HTML5 y CSS3
🚀 Ejecución del proyecto

Clonar este repositorio:

git clone https://github.com/tuusuario/tertulia-cafeteria.git


Entrar al directorio del proyecto:

cd tertulia-cafeteria


Ejecutar con Maven:

mvn spring-boot:run


Abrir en el navegador:

http://localhost:8080

📂 Estructura del proyecto
src/main/java/com/example/proyecto
│── controller/
│    └── Controlador.java
│
src/main/resources
│── templates/
│    ├── index.html
│    ├── carta.html
│    ├── somos.html
│    ├── contacto.html
│    └── carrito.html
│── static/
│    ├── css/
│    └── js/


Proyecto académico desarrollado para práctica en Spring Boot y Bootstrap.