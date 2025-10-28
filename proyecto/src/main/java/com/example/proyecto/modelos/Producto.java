package com.example.proyecto.modelos;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre del producto es obligatorio")
    @Size(min = 3, max = 100, message = "El nombre debe tener entre 3 y 100 caracteres")
    private String nombre;

    @NotNull(message = "El precio no puede ser nulo")
    @Positive(message = "El precio debe ser un valor positivo")
    private Double precio; // mejor usar Double para permitir null si falta

    @ManyToOne
    @JoinColumn(name = "categoria_id", nullable = false)
    @NotNull(message = "Debe seleccionar una categoría")
    private Categoria categoria;
}