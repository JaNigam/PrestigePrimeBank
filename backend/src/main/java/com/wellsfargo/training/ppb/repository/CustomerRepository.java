package com.wellsfargo.training.ppb.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wellsfargo.training.ppb.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
	
//	public Optional<Customer>findById(Long userId);
	public Optional<Customer>findByEmail(String email);
	

}
