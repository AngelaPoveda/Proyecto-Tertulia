package com.example.proyecto.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.proyecto.modelos.Usuario;

public interface  UsuarioRepositorio extends JpaRepository<Usuario, Long>{
    Usuario findByNombreUsuario(String nombreUsuario);
}
