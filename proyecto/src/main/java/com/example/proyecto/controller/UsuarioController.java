package com.example.proyecto.controller;

import java.util.List;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import com.example.proyecto.modelos.Usuario;
import com.example.proyecto.repositorio.UsuarioRepositorio;

import jakarta.validation.Valid;

import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;

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

@PostMapping("/registro")
public String registrarUsuario(
        @Valid @ModelAttribute Usuario usuario,
        BindingResult result,
        Model model) {

    // 🔹 Validar duplicado
    if (usuarioRepository.existsByNombreUsuario(usuario.getNombreUsuario())) {
        result.rejectValue("nombreUsuario", "error.usuario", "El nombre de usuario ya está en uso.");
    }

    // 🔹 Si hay errores (ya sea por validaciones o duplicado)
    if (result.hasErrors()) {
        model.addAttribute("titulo", "Registro | Tertulia Cafetería");
        return "registro";
    }

    usuarioRepository.save(usuario);
    return "redirect:/login?success";
}

    // ✅ Mostrar formulario para crear un nuevo usuario
    @GetMapping("/nuevo")
    public String mostrarFormularioNuevo(Model model) {
        model.addAttribute("usuario", new Usuario());
        return "usuario_form";
    }

    // ✅ Guardar el usuario (nuevo o editado)
    @PostMapping("/guardar")
    public String guardarUsuario(@ModelAttribute Usuario usuario) {
        usuarioRepository.save(usuario);
        return "redirect:/usuarios";
    }
}
