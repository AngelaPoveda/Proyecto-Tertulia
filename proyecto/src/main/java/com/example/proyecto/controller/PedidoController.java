package com.example.proyecto.controller;
import com.example.proyecto.modelos.Pedido;
import com.example.proyecto.modelos.Usuario;
import com.example.proyecto.repositorio.PedidoRepositorio;
import com.example.proyecto.repositorio.UsuarioRepositorio;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pedidos")
public class PedidoController {

    private final PedidoRepositorio pedidoRepository;
    private final UsuarioRepositorio usuarioRepository;

    public PedidoController(PedidoRepositorio pedidoRepository, UsuarioRepositorio usuarioRepository) {
        this.pedidoRepository = pedidoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping("/guardar")
    public Pedido guardarPedido(@RequestBody Pedido pedido,
                                @AuthenticationPrincipal UserDetails userDetails) {

        // ⚠️ Si no hay usuario autenticado, no permitir guardar
        if (userDetails == null) {
            throw new RuntimeException("Usuario no autenticado");
        }

        // Buscar el usuario autenticado
        Usuario usuario = usuarioRepository.findByNombreUsuario(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Asociar el usuario al pedido
        pedido.setUsuario(usuario);

        // Asociar detalles al pedido
        pedido.getDetalles().forEach(detalle -> detalle.setPedido(pedido));

        // Guardar pedido
        return pedidoRepository.save(pedido);
    }
}
