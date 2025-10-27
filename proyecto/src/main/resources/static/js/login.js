document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const btnRegistro = document.getElementById("btnRegistro");

    // Si ya está logueado, redirigir
    if (localStorage.getItem("usuarioActivo")) {
        window.location.href = "index.html";
    }

    // LOGIN
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const usuario = document.getElementById("usuario").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        const response = await fetch("/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombreUsuario: usuario, contrasena: password })
        });

        if (!response.ok) {
            const errorMsg = await response.text();
            throw new Error(errorMsg);
        }

        const userData = await response.json();

        // Guardar datos del usuario en localStorage
        localStorage.setItem("usuarioActivo", JSON.stringify(userData));

        Swal.fire({
            icon: "success",
            title: "Bienvenido ☕",
            text: "Redirigiendo a la página principal...",
            showConfirmButton: false,
            timer: 1500,
            background: "#fff",
            color: "#4b2e00"
        });

        setTimeout(() => window.location.href = "/", 1500);

    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: error.message || "Error al iniciar sesión.",
            confirmButtonColor: "#6B4F28",
            background: "#fff",
            color: "#4b2e00"
        });
    }
});


    // REGISTRO
    btnRegistro.addEventListener("click", async () => {
        const { value: formValues } = await Swal.fire({
            title: "Crear nueva cuenta",
            html: `
        <input id="swal-user" class="swal2-input" placeholder="Usuario">
        <input id="swal-pass" type="password" class="swal2-input" placeholder="Contraseña">
        `,
            confirmButtonText: "Registrar",
            confirmButtonColor: "#6B4F28",
            background: "#fff",
            color: "#4b2e00",
            focusConfirm: false,
            preConfirm: () => {
                const usuario = document.getElementById("swal-user").value.trim();
                const password = document.getElementById("swal-pass").value.trim();
                if (!usuario || !password) {
                    Swal.showValidationMessage("Por favor completa todos los campos");
                }
                return { usuario, password };
            }
        });

        if (formValues) {
            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            const existe = usuarios.find(u => u.usuario === formValues.usuario);

            if (existe) {
                Swal.fire({
                    icon: "warning",
                    title: "Usuario existente",
                    text: "Ese nombre de usuario ya está registrado ☕",
                    confirmButtonColor: "#6B4F28"
                });
            } else {
                usuarios.push(formValues);
                localStorage.setItem("usuarios", JSON.stringify(usuarios));
                Swal.fire({
                    icon: "success",
                    title: "Registro exitoso ☕",
                    text: "Ahora puedes iniciar sesión.",
                    confirmButtonColor: "#6B4F28",
                    background: "#fff",
                    color: "#4b2e00"
                });
            }
        }
    });
});