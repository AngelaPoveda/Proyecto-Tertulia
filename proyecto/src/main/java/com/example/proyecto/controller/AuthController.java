package com.example.proyecto.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/auth")
public class AuthController {

    @GetMapping("/login")
    public String mostrarLogin() {
        return "login"; // nombre del HTML
    }

}