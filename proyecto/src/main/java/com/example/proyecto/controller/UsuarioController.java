package com.example.proyecto.controller;
import java.util.List;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import com.example.proyecto.modelos.Usuario;
import com.example.proyecto.repositorio.UsuarioRepositorio;
import org.springframework.ui.Model;


@Controller
@RequestMapping("/usuarios")
public class UsuarioController {
    private final UsuarioRepositorio usuarioRepository;

    public UsuarioController(UsuarioRepositorio usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    // ✅ Listar todos los usuarios
    @GetMapping
    public String listarUsuarios(Model model) {
        List<Usuario> usuarios = usuarioRepository.findAll();
        model.addAttribute("usuarios", usuarios);
        return "usuarios"; // usuarios.html
    }

    @GetMapping("/registro")
    public String mostrarFormularioRegistro(Model model) {
        model.addAttribute("usuario", new Usuario());
        model.addAttribute("titulo", "Registro | Tertulia Cafetería");
        return "registro"; // tu archivo registro.html
    }
      // ✅ Guardar usuario registrado
    @PostMapping("/registro")
    public String registrarUsuario(@ModelAttribute Usuario usuario) {
        usuarioRepository.save(usuario);
        return "redirect:/login?success";
    }

    // ✅ Mostrar formulario para crear un nuevo usuario
    @GetMapping("/nuevo")
    public String mostrarFormularioNuevo(Model model) {
        model.addAttribute("usuario", new Usuario());
        return "usuario_form"; // usuario_form.html
    }

    // ✅ Guardar el usuario (nuevo o editado)
    @PostMapping("/guardar")
    public String guardarUsuario(@ModelAttribute Usuario usuario) {
        usuarioRepository.save(usuario);
        return "redirect:/usuarios";
    }
}
