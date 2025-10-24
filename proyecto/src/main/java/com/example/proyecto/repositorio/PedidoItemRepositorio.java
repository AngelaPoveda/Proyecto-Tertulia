package com.example.proyecto.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.proyecto.modelos.PedidoItem;

public interface  PedidoItemRepositorio extends JpaRepository<PedidoItem, Long>{
    
}
