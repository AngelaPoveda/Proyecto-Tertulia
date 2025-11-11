package com.example.proyecto.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;

import com.example.proyecto.servicio.UsuarioServicio;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SavedRequestAwareAuthenticationSuccessHandler successHandler() {
        SavedRequestAwareAuthenticationSuccessHandler handler = new SavedRequestAwareAuthenticationSuccessHandler();
        handler.setDefaultTargetUrl("/"); // página por defecto después de login
        return handler;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, UsuarioServicio usuarioServicio) throws Exception {
        http
        .userDetailsService(usuarioServicio) 
            .authorizeHttpRequests(auth -> auth
                // ✅ Todas estas rutas serán PÚBLICAS
                .requestMatchers("/", "/carta", "/somos", "/contacto", "/login", "/registro", "/carrito", "/css/**", "/js/**", "/images/**").permitAll()
                // 🔒 Solo usuarios autenticados pueden acceder a /checkout
                .requestMatchers("/checkout/**", "/pedidos/**").authenticated()
                // cualquier otra ruta requiere autenticación
                .anyRequest().permitAll()
            )
            .formLogin(form -> form
                .loginPage("/login")                // tu formulario personalizado
                .loginProcessingUrl("/login")       // URL donde se envían los datos del form
                .usernameParameter("nombreUsuario")   // nombre del input de usuario
                .passwordParameter("contrasena") 
                .defaultSuccessUrl("/", false) // redirige al checkout después del login
                .permitAll()
            )
            .logout(logout -> logout
                .logoutUrl("/logout")
                .logoutSuccessUrl("/")              // al cerrar sesión vuelve al inicio
                .permitAll()
            )
            .csrf(csrf -> csrf.disable()); // (puedes dejarlo así para desarrollo)

        return http.build();
    }
}