package com.example.proyecto.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.proyecto.modelos.CarritoItem;

public interface  CarritoItemRepositorio extends JpaRepository<CarritoItem, Long>{
    
}
