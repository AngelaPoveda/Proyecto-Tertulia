package com.example.proyecto.modelos;
import java.util.List;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Usuario{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    @Column(name = "nombre_usuario")
    private String nombreUsuario;
    
    private String correo;
    private String contrasena; // mejor evitar la ñ en nombres de variables
    private String telefono;

    @OneToMany(mappedBy = "usuario")
    private List<Pedido> pedidos;

}
