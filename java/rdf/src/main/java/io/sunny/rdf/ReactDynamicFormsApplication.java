package io.sunny.rdf;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import io.sunny.rdf.controller.PojoController;

@SpringBootApplication
@ComponentScan(basePackageClasses = PojoController.class)
public class ReactDynamicFormsApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(ReactDynamicFormsApplication.class, args);
    }
    
    
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/api/**").allowedOrigins("http://localhost:3000");
			}
		};
	}
}
