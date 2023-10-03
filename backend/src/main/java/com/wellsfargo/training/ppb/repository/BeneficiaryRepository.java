package com.wellsfargo.training.ppb.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wellsfargo.training.ppb.model.Beneficiary;
import com.wellsfargo.training.ppb.model.Customer;

public interface BeneficiaryRepository extends JpaRepository<Beneficiary, Long> {
	
	public Optional<Beneficiary> findByBeneficiaryNameAndCustomerUserId(String beneficiaryName, Long userId);
	public Optional<List<Beneficiary>> findByCustomerUserId(Long userId);

}
