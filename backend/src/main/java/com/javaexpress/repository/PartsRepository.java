package com.javaexpress.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.javaexpress.entities.Category;
import com.javaexpress.entities.Parts;
@Repository
public interface PartsRepository extends CrudRepository<Parts,String>{
	//DSL-at run time queries it will generate automatically based on your method names
	
	//Optional<Category> findByIdAndBarCode(Integer id,String barCode);
	
	//Category findByNameOrderByIdAsc(String name);

	Optional<Parts> findByPartNumber(String partNumber);
	
}
