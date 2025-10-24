package com.example.proyecto.controller;

import com.example.proyecto.modelos.Producto;
import com.example.proyecto.repositorio.ProductoRepositorio;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class ProductoController {

    private final ProductoRepositorio productoRepository;

    public ProductoController(ProductoRepositorio productoRepository) {
        this.productoRepository = productoRepository;
    }

    @GetMapping("/productos")
    public String listarProductos(Model model) {
        List<Producto> productos = productoRepository.findAll();
        model.addAttribute("productos", productos);
        return "index";
    }

}
