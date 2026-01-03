package com.javaexpress.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.javaexpress.entities.Parts;
import com.javaexpress.service.PartsService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/v1/parts")
public class PartsController {
	
	@Autowired
	private PartsService partsService;
	
	@GetMapping(value = "/fetch/{partNumber}")
	public Parts fetchParts(@PathVariable String partNumber)
	{
		return partsService.fetchParts(partNumber);
	}

}
