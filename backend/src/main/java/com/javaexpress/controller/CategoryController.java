package com.javaexpress.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.javaexpress.entities.Category;
import com.javaexpress.service.CategoryService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
@Tag(name="CRUD Operations for Category",description = "Admin team can create the categories")
@RestController
@RequestMapping("/api/v1/category")
public class CategoryController {
	
	@Autowired
	private CategoryService categoryService;
	@Operation(summary = "Create Category API",description = "Admin team can create POST Request New category in DB")
	//JSON Format
	@PostMapping("/create")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Category createCategory(@RequestBody Category category) {
		return categoryService.createCategory(category);
	}
	@GetMapping(value = "/fetch/{categoryId}")
	public Category fetchCategory(@PathVariable Integer categoryId) {
		return categoryService.fetchCategory(categoryId);
	}
	@PutMapping("/update/{categoryId}")
	public Category updateCategory(@RequestBody Category category, @PathVariable Integer categoryId) {
		return categoryService.update(category,categoryId);	
	}
	
	@Operation(summary = "Delete Category API",description = "Admin team can Delete existing category in DB")
	@DeleteMapping("/delete/{categoryId}")
	public Boolean deleteCategory(@PathVariable Integer categoryId) {
		return categoryService.deleteCateogry(categoryId);
	}
	@GetMapping("/fetch/{id}/{barCode}")
	public Category fetchCategory(@PathVariable Integer id, @PathVariable String barCode)
	{
		return categoryService.fetchCategory(id,barCode);
	}

}
