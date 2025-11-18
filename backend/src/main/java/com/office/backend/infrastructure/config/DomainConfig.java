package com.office.backend.infrastructure.config;

import com.office.backend.domain.repository.UserRepository;
import com.office.backend.domain.repository.ProductRepository;
import com.office.backend.domain.services.AuthDomainService;
import com.office.backend.domain.services.OrderDomainService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DomainConfig {
    @Bean
    public AuthDomainService authDomainService(UserRepository userRepository) {
        return new AuthDomainService(userRepository);
    }
    
    @Bean
    public OrderDomainService orderDomainService(ProductRepository productRepository) {
        return new OrderDomainService(productRepository);
    }
}