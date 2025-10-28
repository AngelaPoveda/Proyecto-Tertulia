package com.example.proyecto.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.proyecto.modelos.Contacto;
import com.example.proyecto.repositorio.ContactoRepositorio;

import jakarta.validation.Valid;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/contacto")
@CrossOrigin(origins = "*")
public class ContactoController {

    private final ContactoRepositorio contactoRepositorio;

    public ContactoController(ContactoRepositorio contactoRepositorio) {
        this.contactoRepositorio = contactoRepositorio;
    }

    @PostMapping("/enviar")
    public ResponseEntity<Map<String, Object>> enviarFormulario(@Valid @RequestBody Contacto contacto) {
        
        Map<String, Object> response = new HashMap<>();
        
        contactoRepositorio.save(contacto);
        response.put("success", true);
        response.put("mensaje", "¡Gracias por contactarnos! Pronto te responderemos.");
        return ResponseEntity.ok(response);
    }
}