package com.wellsfargo.training.ppb.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wellsfargo.training.ppb.model.Account;
import com.wellsfargo.training.ppb.model.Customer;
import com.wellsfargo.training.ppb.repository.CustomerRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CustomerService {
	
	@Autowired
	private CustomerRepository custrepo;
	
	public String saveCustomer(Customer cust) {
		
		String result = "";
		Optional<Customer> existingCustomer = custrepo.findByEmail(cust.getEmail());
		
		if(existingCustomer.isPresent())
		{
			result = "Customer Already Exists";
		}
		else {
			
			Long userId = generateUniqueCustId();
			cust.setUserId(userId);
			custrepo.save(cust);
			result = "New Customer Created Successfully";
		}
		return result;
	}
	
public String updateCustomer(Customer cust) {
		
		String result = "";
		custrepo.save(cust);
		result = "Customer Details Updated Successfully";
		
		return result;
	}
	
	
	public Long generateUniqueCustId() {
		Long userId;
		do {
			userId = (long)(Math.random()*900000+1000000);
		}while(custrepo.existsById(userId));
		return userId;
	}
	
	public Optional<Customer> loginCustomer(Long userId) {
		return custrepo.findById(userId);
	}
	
	public Optional<Customer> getSingleCustomer(long id){
		return custrepo.findById(id); // invokes predefined method of JPA Repository
	}
	
	
	

}
