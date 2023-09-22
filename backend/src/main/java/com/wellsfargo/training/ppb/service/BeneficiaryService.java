package com.wellsfargo.training.ppb.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wellsfargo.training.ppb.model.Beneficiary;
import com.wellsfargo.training.ppb.model.Customer;
import com.wellsfargo.training.ppb.repository.AccountRepository;
import com.wellsfargo.training.ppb.repository.BeneficiaryRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class BeneficiaryService {
	
	@Autowired
	BeneficiaryRepository brepo;
	
	@Autowired
	private AccountRepository accrepo;
	
	//while adding beneficiary check if the the account exists in the bank
	public String addBeneficiary(Beneficiary beneficiary, Long userId)
	{
		
		Optional<Beneficiary> existingBeneficiary = brepo.findByBeneficiaryNameAndCustomerUserId(beneficiary.getBeneficiaryName(), userId);
//		System.out.println(existingBeneficiary);
		if(existingBeneficiary.isPresent()) {return "Beneficiary Already Exists";}
		
		//check if the beneficiary accNo exists in Accounts table
		else if(accrepo.findById(beneficiary.getBeneficiaryAccNo()).isEmpty()) {
			return "Beneficary Bank Account Does Not Exist!";
			
		}else {
			Beneficiary b = new Beneficiary();
			b.setBeneficiaryAccNo(beneficiary.getBeneficiaryAccNo());
			b.setBeneficiaryName(beneficiary.getBeneficiaryName());
			b.setBeneficiaryNickName(beneficiary.getBeneficiaryNickName());
			
		
			brepo.save(b);
			return "Beneficiary Added Successfully!";
		}
		
	}
	

}
