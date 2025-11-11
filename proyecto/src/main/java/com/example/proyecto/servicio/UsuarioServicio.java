package com.example.proyecto.servicio;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.example.proyecto.modelos.Usuario;
import com.example.proyecto.repositorio.UsuarioRepositorio;

import java.util.List;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

@Service
public class UsuarioServicio implements UserDetailsService {

    private final UsuarioRepositorio usuarioRepositorio;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UsuarioServicio(UsuarioRepositorio usuarioRepositorio) {
        this.usuarioRepositorio = usuarioRepositorio;
    }

    @Override
    public UserDetails loadUserByUsername(String nombreUsuario) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepositorio.findByNombreUsuario(nombreUsuario)
            .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        String role = usuario.getRol();
        List<SimpleGrantedAuthority> authorities = List.of(
            new SimpleGrantedAuthority(role.startsWith("ROLE_") ? role : "ROLE_" + role)
        );

        return User.withUsername(usuario.getNombreUsuario())
                   .password(usuario.getContrasena()) // debe estar encriptada
                    .authorities(authorities)
                    .build();
    }

    public PasswordEncoder passwordEncoder() {
        return passwordEncoder;
    }
}