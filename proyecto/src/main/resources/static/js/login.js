document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const btnRegistro = document.getElementById("btnRegistro");

    // Si ya está logueado, redirigir
    if (localStorage.getItem("usuarioActivo")) {
        window.location.href = "index.html";
    }

    // LOGIN
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const usuario = document.getElementById("usuario").value.trim();
        const password = document.getElementById("password").value.trim();

        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        const userFound = usuarios.find(u => u.usuario === usuario && u.password === password);

        if (userFound) {
            localStorage.setItem("usuarioActivo", usuario);
            Swal.fire({
                icon: "success",
                title: "Bienvenido ☕",
                text: "Redirigiendo a la página principal...",
                showConfirmButton: false,
                timer: 1500,
                background: "#fff",
                color: "#4b2e00"
            });
            setTimeout(() => window.location.href = "index.html", 1500);
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Usuario o contraseña incorrectos.",
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
