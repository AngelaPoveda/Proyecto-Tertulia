package com.example.proyecto.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.proyecto.modelos.Contacto;

public interface ContactoRepositorio extends JpaRepository<Contacto, Long>{

}
