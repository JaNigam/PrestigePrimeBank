package com.wellsfargo.training.ppb.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wellsfargo.training.ppb.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

}
