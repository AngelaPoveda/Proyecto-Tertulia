package com.example.proyecto.controller;

import com.example.proyecto.modelos.PedidoItem;
import com.example.proyecto.repositorio.PedidoItemRepositorio;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/pedidoitems")
public class PedidoItemController {

    private final PedidoItemRepositorio pedidoItemRepository;

    public PedidoItemController(PedidoItemRepositorio pedidoItemRepository) {
        this.pedidoItemRepository = pedidoItemRepository;
    }

    @GetMapping
    public String listarItems(Model model) {
        List<PedidoItem> items = pedidoItemRepository.findAll();
        model.addAttribute("items", items);
        return "pedidoitems"; // pedidoitems.html
    }
}
