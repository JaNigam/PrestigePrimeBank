package com.wellsfargo.training.ppb.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wellsfargo.training.ppb.model.Beneficiary;
import com.wellsfargo.training.ppb.model.Customer;
import com.wellsfargo.training.ppb.repository.AccountRepository;
import com.wellsfargo.training.ppb.repository.BeneficiaryRepository;
import com.wellsfargo.training.ppb.repository.CustomerRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class BeneficiaryService {
	
	@Autowired
	BeneficiaryRepository brepo;
	
	@Autowired
	private AccountRepository accrepo;
	
	@Autowired
	private CustomerRepository custrepo;
	
	//while adding beneficiary check if the the account exists in the bank
	public String addBeneficiary(Beneficiary beneficiary, Long userId)
	{
		
		//verify the customer first
		Customer c = custrepo.findById(userId).get();
		if(c!=null  && c.isValidCustomer())
		{
		
			//fetch if there's any existing beneficiary
		Optional<Beneficiary> existingBeneficiary = brepo.findByBeneficiaryNameAndCustomerUserId(beneficiary.getBeneficiaryName(), userId);

		if(existingBeneficiary.isPresent()) {return "Beneficiary Already Exists";}
		
		//check if the beneficiary accNo exists in Accounts table
		else if(accrepo.findById(beneficiary.getBeneficiaryAccNo()).isEmpty()) {
			return "Beneficary Bank Account Does Not Exist!";
			
		}else {
			beneficiary.setCustomer(c);
		
			brepo.save(beneficiary);
			return "Beneficiary Added Successfully!";
		}
		}else {
			return "Not a Valid Customer!";
		}
		
	}
	
	public Optional<List<Beneficiary>> listAllBeneficiaries(Long userId){
	
		Optional<List<Beneficiary>> allBeneficiary = brepo.findByCustomerUserId(userId); 
		return allBeneficiary;
	}
	

}
