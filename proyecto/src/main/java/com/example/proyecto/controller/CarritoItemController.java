package com.example.proyecto.controller;

import com.example.proyecto.modelos.CarritoItem;
import com.example.proyecto.repositorio.CarritoItemRepositorio;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/carrito")
public class CarritoItemController {

    private final CarritoItemRepositorio carritoItemRepository;

    public CarritoItemController(CarritoItemRepositorio carritoItemRepository) {
        this.carritoItemRepository = carritoItemRepository;
    }

    @GetMapping
    public String listarCarrito(Model model) {
        List<CarritoItem> carrito = carritoItemRepository.findAll();
        model.addAttribute("carrito", carrito);
        model.addAttribute("titulo", "Carrito | Tertulia Cafetería");
        return "carrito"; // carrito.html
    }

    @PostMapping("/agregar")
    public String agregarItem(@ModelAttribute CarritoItem item) {
        carritoItemRepository.save(item);
        return "redirect:/carrito";
    }

    @GetMapping("/eliminar/{id}")
    public String eliminarItem(@PathVariable Long id) {
        carritoItemRepository.deleteById(id);
        return "redirect:/carrito";
    }
}
