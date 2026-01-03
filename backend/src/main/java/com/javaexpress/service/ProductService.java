package com.javaexpress.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.javaexpress.entities.Category;
import com.javaexpress.entities.Product;
import com.javaexpress.enums.ProductStatus;
import com.javaexpress.repository.ProductRepository;

@Service
public class ProductService {
	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private CategoryService categoryService;
	

	public Product createProduct(Product product) {
		// TODO Auto-generated method stub
		 Category dbCategory = categoryService.fetchCategory(product.getCategory().getId());
		 product.setBarCode(UUID.randomUUID().toString());
		 product.setIsDeleted(false);
		 product.setProductStatus(ProductStatus.CREATED);
		 product.setCategory(dbCategory);//It will create id in product table(foreign key)
		 return productRepository.save(product);
		}

}
