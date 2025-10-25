package com.example.proyecto.controller;
import com.example.proyecto.modelos.Usuario;
import com.example.proyecto.repositorio.UsuarioRepositorio;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/auth")
public class AuthController {

    private final UsuarioRepositorio usuarioRepositorio;

    public AuthController(UsuarioRepositorio usuarioRepositorio) {
        this.usuarioRepositorio = usuarioRepositorio;
    }
@GetMapping("/login")
public String mostrarLogin() {
    return "login"; // nombre del HTML
}

    // ✅ Login simple
@PostMapping("/login")
public String login(@RequestParam String nombreUsuario,@RequestParam String contrasena,Model model,HttpSession session) {

    Usuario usuario = usuarioRepositorio.findByNombreUsuario(nombreUsuario);
    if (usuario != null && usuario.getContrasena().equals(contrasena)) {
        session.setAttribute("usuarioActivo", usuario);
        return "redirect:/"; // vuelve al index
    } else {
        model.addAttribute("error", "Usuario o contraseña incorrectos");
        return "login";
    }
}

}
