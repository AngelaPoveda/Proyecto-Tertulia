package com.example.proyecto.controller;

import com.example.proyecto.modelos.Pedido;
import com.example.proyecto.repositorio.PedidoRepositorio;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.example.proyecto.repositorio.PedidoRepositorio;

@Controller
@RequestMapping("/pedidos")
public class PedidoController {

    private final PedidoRepositorio pedidoRepository;

    public PedidoController(PedidoRepositorio pedidoRepository) {
        this.pedidoRepository = pedidoRepository;
    }

    // 🟢 Listar pedidos
    @GetMapping
    public String listarPedidos(Model model) {
        List<Pedido> pedidos = pedidoRepository.findAll();
        model.addAttribute("pedidos", pedidos);
        return "pedidos"; // pedidos.html
    }

    // 🟢 Ver detalle
    @GetMapping("/{id}")
    public String verDetalle(@PathVariable Long id, Model model) {
        Pedido pedido = pedidoRepository.findById(id).orElse(null);
        model.addAttribute("pedido", pedido);
        return "pedido_detalle"; // pedido_detalle.html
    }
}
