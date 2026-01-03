package com.javaexpress.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Parts {
	
	@Id
	
	private String partID;
	
	
	private String partNumber;
	
	private String name;
	
	private String description;
	
	private Integer Quantity;
	
	public Parts()
	{
		
	}

	public String getPartID() {
		return partID;
	}

	public void setPartID(String partID) {
		this.partID = partID;
	}

	public String getPartNumber() {
		return partNumber;
	}

	public void setPartNumber(String partNumber) {
		this.partNumber = partNumber;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getQuantity() {
		return Quantity;
	}

	public void setQuantity(Integer quantity) {
		Quantity = quantity;
	}
	
	
	
	

}
