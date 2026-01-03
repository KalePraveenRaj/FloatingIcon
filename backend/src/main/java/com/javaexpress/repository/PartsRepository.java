package com.javaexpress.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.javaexpress.entities.Parts;

@Repository
public interface PartsRepository extends MongoRepository<Parts, String> {

    // MongoDB automatically creates query based on method name
    Optional<Parts> findByPartNumber(String partNumber);

}
