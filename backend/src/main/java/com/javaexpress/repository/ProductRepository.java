package com.javaexpress.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.javaexpress.entities.Product;
@Repository
public interface ProductRepository extends CrudRepository<Product,Integer>{
	
	//DSL - at runtime it will generate queries
	// input output method functionality
	Optional<Product> findByName(String name);
	
	List<Product> findByNameOrPrice(String name,Double price);
	
	Optional<Product> findByNameAndPrice(String name, Double price);
	
	List<Product> findByCategoryName(String name);
	
	//JPQL Queries
}
