package com.example.proyecto.controller;
import com.example.proyecto.modelos.Pedido;
import com.example.proyecto.repositorio.PedidoRepositorio;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pedidos")
@CrossOrigin(origins = "*")
public class PedidoController {

    private final PedidoRepositorio pedidoRepository;

    public PedidoController(PedidoRepositorio pedidoRepository) {
        this.pedidoRepository = pedidoRepository;
    }

    @PostMapping("/guardar")
    public Pedido guardarPedido(@RequestBody Pedido pedido) {
        // Vinculamos los detalles con el pedido
        pedido.getDetalles().forEach(detalle -> detalle.setPedido(pedido));
        return pedidoRepository.save(pedido);
    }
}
