package com.example.proyecto.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
public class controlador {
    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("titulo", "Inicio | Tertulia Cafetería");
        return "index";
    }

    @GetMapping("/carta")
    public String carta(Model model) {
        model.addAttribute("titulo", "Carta | Tertulia Cafetería");
        return "carta";
    }

    @GetMapping("/somos")
    public String somos(Model model) {
        model.addAttribute("titulo", "Quiénes Somos | Tertulia Cafetería");
        return "somos";
    }

    @GetMapping("/contacto")
    public String contacto(Model model) {
        model.addAttribute("titulo", "Contacto | Tertulia Cafetería");
        return "contacto";
    }

    @GetMapping("/login")
    public String login(Model model) {
        model.addAttribute("titulo", "Login | Tertulia Cafetería");
        return "login";
    }

    @GetMapping("/checkout")
    public String checkout(Model model) {
        model.addAttribute("titulo", "Finalizar Compra | Tertulia Cafetería");
        return "checkout";
    }
    
    @PostMapping("/contacto/enviar")
    public String enviarContacto(
            @RequestParam String nombre,
            @RequestParam String apellido,
            @RequestParam String email,
            @RequestParam String telefono,
            @RequestParam String mensaje,
            Model model) {
        
        // Aquí puedes procesar el formulario (guardar en BD, enviar email, etc.)
        System.out.println("Formulario recibido:");
        System.out.println("Nombre: " + nombre + " " + apellido);
        System.out.println("Email: " + email);
        System.out.println("Teléfono: " + telefono);
        System.out.println("Mensaje: " + mensaje);
        
        model.addAttribute("success", true);
        model.addAttribute("mensajeExito", "¡Gracias por contactarnos! Te responderemos pronto.");
        
        return "contacto";
    }
}
