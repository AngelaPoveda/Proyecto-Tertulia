package com.example.proyecto.modelos;

import jakarta.persistence.*;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

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

    @NotBlank(message = "El nombre no puede estar vacío")
    private String nombre;

    @NotBlank(message = "El teléfono es obligatorio")
    @Pattern(regexp = "^[0-9]{9}$", message = "El teléfono debe tener 9 dígitos")
    private String telefono;

    @NotBlank(message = "La dirección es obligatoria")
    private String direccion;

    @NotBlank(message = "El método de pago es obligatorio")
    private String metodoPago;

    @NotNull(message = "La fecha de entrega es obligatoria")
    @FutureOrPresent(message = "La fecha debe ser hoy o una futura")
    private LocalDate fechaEntrega;

    @NotNull(message = "La hora de entrega es obligatoria")
    private LocalTime horaEntrega;

    @Positive(message = "El total debe ser mayor que 0")
    private double total;

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL)
    @Size(min = 1, message = "Debe haber al menos un detalle de pedido")
    private List<DetallePedido> detalles;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

}
