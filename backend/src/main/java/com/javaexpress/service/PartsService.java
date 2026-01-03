package com.javaexpress.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.javaexpress.entities.Parts;
import com.javaexpress.repository.PartsRepository;

@Service
public class PartsService {

	@Autowired
	private PartsRepository partsRepository;
	
	public Parts fetchParts(String partNumber) {
		
		return partsRepository.findByPartNumber(partNumber).orElseThrow(()-> new RuntimeException("Category Not exist in DB"));
		
	}

}
