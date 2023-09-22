package com.wellsfargo.training.ppb.service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wellsfargo.training.ppb.model.Account;
import com.wellsfargo.training.ppb.model.Customer;
import com.wellsfargo.training.ppb.repository.AccountRepository;
import com.wellsfargo.training.ppb.repository.CustomerRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AccountService {
	@Autowired
	private AccountRepository accrepo;
	
	@Autowired
	private CustomerRepository custrepo;
	
	
	public List<Account> listAll(){
		return accrepo.findAll();
	}
		
	//Optional - Handles NullPointer Exception
	public Optional<Account> getSingleAccount(Long id){
		return accrepo.findById(id); // invokes predefined method of JPA Repository
	}
	
	public void deleteAccount(Long id) {
		accrepo.deleteById(id); 
	}
	
	public String updateAccount(Account updatedacc) {
		
		String result = "";
		accrepo.save(updatedacc);
		result = "Account Details Updated Successfully";
		
		return result;
	}
}
