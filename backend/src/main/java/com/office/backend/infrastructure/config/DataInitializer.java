package com.office.backend.infrastructure.config;

import com.office.backend.application.usecases.CreateProductUseCase;
import com.office.backend.application.usecases.RegisterUserUseCase;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;

@Component
public class DataInitializer implements CommandLineRunner {
    private final CreateProductUseCase createProductUseCase;
    private final RegisterUserUseCase registerUserUseCase;
    
    public DataInitializer(CreateProductUseCase createProductUseCase, RegisterUserUseCase registerUserUseCase) {
        this.createProductUseCase = createProductUseCase;
        this.registerUserUseCase = registerUserUseCase;
    }
    
    @Override
    public void run(String... args) throws Exception {
        // No default data insertion
    }
}