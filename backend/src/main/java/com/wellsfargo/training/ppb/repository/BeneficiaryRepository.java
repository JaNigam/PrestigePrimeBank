package com.wellsfargo.training.ppb.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wellsfargo.training.ppb.model.Beneficiary;
import com.wellsfargo.training.ppb.model.Customer;

public interface BeneficiaryRepository extends JpaRepository<Beneficiary, Long> {
	
	public Optional<Beneficiary> findByBeneficiaryNameAndCustomerUserId(String beneficiaryName, Long userId);


}
