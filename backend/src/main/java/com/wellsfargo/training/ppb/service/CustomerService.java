package com.wellsfargo.training.ppb.service;

import java.security.SecureRandom;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wellsfargo.training.ppb.model.Account;
import com.wellsfargo.training.ppb.model.Customer;
import com.wellsfargo.training.ppb.repository.AccountRepository;
import com.wellsfargo.training.ppb.repository.CustomerRepository;
import com.wellsfargo.training.ppb.service.EmailSenderService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CustomerService {
	
	@Autowired
	private CustomerRepository custrepo;
	
	@Autowired
	private AccountRepository accrepo;
	
	@Autowired
	private EmailSenderService mailservice;
	
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
			
			 // Set the customer for current address
	        if (cust.getCurrentAddress() != null) {
	            cust.getCurrentAddress().setUserId(cust);
	        }

	        // Set the customer for permanent address
	        if (cust.getPermanentAddress() != null) {
	            cust.getPermanentAddress().setUserId(cust);
	        }
			
			
			//sending email to the newly registered customer
			String toMail = cust.getEmail();
			String subject = "Welcome to Prestige Prime Bank "+cust.getName();
			String body = "Hi, "+cust.getName()+"\n\nWe Welcome you to Prestige Prime Bank.\nYour User Id is: "+userId+"\n\n\nWarm Regards\nPrestige Prime Bank\nElevating Excellence In Banking.";
			mailservice.sendSimpleEmail(toMail, body, subject);
			
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
	     

	     
	     String toMail = email;
			String subject = "OTP for Password Change";
			String body = "Hi,\n Your One-Time-Password is:\t"+finalOtp
			+"\nthis OTP is valid for 5mins."
			+"\n\n\nWarm Regards\nPrestige Prime Bank\nElevating Excellence In Banking.";
			mailservice.sendSimpleEmail(toMail, body, subject);
	     
	     // Trim and store the email
	     String trimmedEmail = email.trim();
	     otpMap.put(trimmedEmail, finalOtp);
	     
	     String testotp = otpMap.get(trimmedEmail);
	     System.out.println(testotp);
	     
	     
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
	 
	 public List<Customer> listAllCustomers(){
			return custrepo.findAll();
		}


}
