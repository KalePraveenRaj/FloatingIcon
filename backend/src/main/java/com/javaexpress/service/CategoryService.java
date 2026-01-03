package com.javaexpress.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.javaexpress.entities.Category;
import com.javaexpress.repository.CategoryRepository;

@Service
public class CategoryService {
	
	@Autowired
	private CategoryRepository categoryRepository;

	public Category createCategory(Category category) {
		// TODO Auto-generated method stub
		category.setBarCode(UUID.randomUUID().toString());
		return categoryRepository.save(category);
	}

	public Category fetchCategory(Integer categoryId) {
		// TODO Auto-generated method stub
		return categoryRepository.findById(categoryId).orElseThrow(()-> new RuntimeException("Category Not exist in DB"));
	}

	public Category update(Category category, Integer categoryId) {
		// TODO Auto-generated method stub
		Category dbCategory = fetchCategory(categoryId);
		dbCategory.setName(category.getName());
		return categoryRepository.save(dbCategory);
		
	}

	public boolean deleteCateogry(Integer categoryId) {
		// TODO Auto-generated method stub
		Category dbCategory = fetchCategory(categoryId);
		categoryRepository.delete(dbCategory);
		return true;
	}

	public Category fetchCategory(Integer id, String barCode) {
		// TODO Auto-generated method stub
		
		return categoryRepository.findByIdAndBarCode(id, barCode).orElseThrow(()-> 
		new RuntimeException("Category Not exist in DB"));
	}
	
	

}
