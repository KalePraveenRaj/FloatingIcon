package com.javaexpress.entities;

import java.sql.Date;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.javaexpress.enums.ProductStatus;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.Schema.RequiredMode;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.Valid;

@Entity
public class Product {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@Schema(description = "Product Name should have atleast 3 characters",example = "iPone12",requiredMode = RequiredMode.REQUIRED)
	private String name;
	@Schema(requiredMode = RequiredMode.REQUIRED)
	private Double price;
	@Schema(requiredMode = RequiredMode.REQUIRED)
	private String description;
	@Schema(requiredMode = RequiredMode.REQUIRED)
	private String brand;
	@Enumerated(EnumType.STRING)
	private ProductStatus productStatus;
	@Schema(hidden = true)
	private String barCode;
	@Schema(hidden = true)
	private Boolean isDeleted;
	@Schema(hidden = true)
	@CreationTimestamp
	private Date createdTime;
	@Schema(hidden = true)
	@UpdateTimestamp
	private Date updatedTime; 
	@Valid
	@ManyToOne
	@JoinColumn(name="category_id_fk",nullable = false)
	private Category category;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getBrand() {
		return brand;
	}
	public void setBrand(String brand) {
		this.brand = brand;
	}
	public ProductStatus getProductStatus() {
		return productStatus;
	}
	public void setProductStatus(ProductStatus productStatus) {
		this.productStatus = productStatus;
	}
	public String getBarCode() {
		return barCode;
	}
	public Category getCategory() {
		return category;
	}
	public void setCategory(Category category) {
		this.category = category;
	}
	public void setBarCode(String barCode) {
		this.barCode = barCode;
	}
	public Boolean getIsDeleted() {
		return isDeleted;
	}
	public void setIsDeleted(Boolean isDeleted) {
		this.isDeleted = isDeleted;
	}
	public Date getCreatedTime() {
		return createdTime;
	}
	public void setCreatedTime(Date createdTime) {
		this.createdTime = createdTime;
	}
	public Date getUpdatedTime() {
		return updatedTime;
	}
	public void setUpdatedTime(Date updatedTime) {
		this.updatedTime = updatedTime;
	}
	

}
