package com.wellsfargo.training.ppb.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
//		Optional<Customer> customer = custrepo.findById(cust.getUserId());
//		if(customer.isPresent())
//		{
//			result = "Customer Already Exists";
//		}
//		else {
			
			Long userId = generateUniqueCustId();
			cust.setUserId(userId);
			custrepo.save(cust);
			result = "New Customer Created Successfully";
//		}
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
	
	
	

}
