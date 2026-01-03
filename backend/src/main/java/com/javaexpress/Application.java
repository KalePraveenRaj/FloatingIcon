package com.javaexpress;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(
		title = "Flipkart REST API Documentation for Developoers",
		description = " Consumers can Test this Documntation for all endpoints",
		version = "v1.0.0",
		contact = @Contact(name = " Java Express",email = "javaexpresschannel@gmail.com",
		url = "http://www.youtube.com/c/javaexpress")))
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

}
  