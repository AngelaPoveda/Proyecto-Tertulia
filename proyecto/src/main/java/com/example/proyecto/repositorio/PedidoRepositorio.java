package com.example.proyecto.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.proyecto.modelos.Pedido;

public interface  PedidoRepositorio extends JpaRepository<Pedido,Long>{
    
}
