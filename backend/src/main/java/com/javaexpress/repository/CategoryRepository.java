package com.javaexpress.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.javaexpress.entities.Category;
@Repository
public interface CategoryRepository extends CrudRepository<Category,Integer>{
	//DSL-at run time queries it will generate automatically based on your method names
	
	Optional<Category> findByIdAndBarCode(Integer id,String barCode);
	
	Category findByNameOrderByIdAsc(String name);
	
}
