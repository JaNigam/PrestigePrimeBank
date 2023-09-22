package com.wellsfargo.training.ppb.service;

import java.security.SecureRandom;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wellsfargo.training.ppb.model.Customer;
import com.wellsfargo.training.ppb.repository.AccountRepository;
import com.wellsfargo.training.ppb.repository.CustomerRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CustomerService {
	
	@Autowired
	private CustomerRepository custrepo;
	
	@Autowired
	private AccountRepository accrepo;
	
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
	
	
//	public void deleteCustomerAndAccountByUserId(Long id) {
//		Customer cust = custrepo.findById(id).orElse(null);
//		if(cust != null) {
//			accrepo.deleteByUserId(id);
//			custrepo.delete(cust);
//		}
//	}
	
	 public Boolean deleteCustomer(Long id) {
	        Customer customer = custrepo.findById(id).orElse(null);
	        if (customer != null) {
	            // Delete associated accounts
	            accrepo.deleteByCustomer(customer);
	            // Delete the customer
	            custrepo.delete(customer);
	            return true;
	        }
	        return false;
	    }
	 

	 Map<String, String> otpMap = new ConcurrentHashMap<>();

	 public String generateOtp(String email) {
	     Long otp = (long)(Math.random() * 900000 + 1000000);
	     String finalOtp = otp.toString();
	     
	     System.out.println("otp: " + finalOtp);
	     
	     // Trim and store the email
	     String trimmedEmail = email.trim();
	     otpMap.put(trimmedEmail, finalOtp);
	     
	     String testotp = otpMap.get(trimmedEmail);
	     System.out.println("test email: " + trimmedEmail);
	     System.out.println("testotp: " + testotp);
	     
	     return finalOtp;
	 }

	 public boolean verifyOtp(String email, String inputOtp) {
	     System.out.println("input email: " + email);
	     
	     // Trim the email for consistency
	     String trimmedEmail = email.trim();
	     
	     String storedOtp = otpMap.get(trimmedEmail);
	     System.out.println("stored otp: " + storedOtp);
	     
	     if (inputOtp.equals(storedOtp)) {
	         return true;
	     } else {
	         return false;
	     }
	 }


}
