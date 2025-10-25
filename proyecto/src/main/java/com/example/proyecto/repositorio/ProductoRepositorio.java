package com.example.proyecto.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.proyecto.modelos.Producto;

public interface  ProductoRepositorio extends JpaRepository<Producto, Long>{
    
}
