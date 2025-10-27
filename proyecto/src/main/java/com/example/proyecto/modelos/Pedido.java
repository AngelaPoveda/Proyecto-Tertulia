package com.example.proyecto.modelos;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import lombok.Getter;
import lombok.Setter;


@Entity
@Getter
@Setter
public class Pedido {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id") // <-- aquí indicas el nombre de la columna en la base de datos
    private Usuario usuario;

    private String nombre;
    private String telefono;
    private String direccion;
    private LocalDate fechaEntrega;
    private LocalTime horaEntrega;
    private String metodoPago;
    private Double total;

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL)
    private List<DetallePedido> detalles;
}
