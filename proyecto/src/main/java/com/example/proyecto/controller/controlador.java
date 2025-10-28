package com.example.proyecto.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.proyecto.modelos.Contacto;


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
        model.addAttribute("contacto", new Contacto());
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
    @GetMapping("/carrito")
    public String carrito(Model model) {
        model.addAttribute("titulo", "Carrito | Tertulia Cafetería");
        return "carrito";
    }
    @GetMapping("/registro")
    public String registro(Model model) {
        model.addAttribute("titulo", "Registro | Tertulia Cafetería");
        return "registro";
    }
}
