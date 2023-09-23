package com.wellsfargo.training.ppb.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wellsfargo.training.ppb.exception.ResourceNotFoundException;
import com.wellsfargo.training.ppb.model.Beneficiary;
import com.wellsfargo.training.ppb.model.Customer;
import com.wellsfargo.training.ppb.model.PasswordChangeBody;
import com.wellsfargo.training.ppb.model.Transaction;
import com.wellsfargo.training.ppb.service.BeneficiaryService;
import com.wellsfargo.training.ppb.repository.CustomerRepository;
import com.wellsfargo.training.ppb.service.CustomerService;
import com.wellsfargo.training.ppb.service.TransactionService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/customer")
public class CustomerController {
	
	@Autowired
	CustomerService custservice;
	
	@Autowired
	TransactionService transservice;
	
	@Autowired
	BeneficiaryService bservice;
	CustomerRepository custrepo;
	
	@PostMapping("/create-customer")
	public String createCustomer(@RequestBody @Validated Customer cust) {
		return custservice.saveCustomer(cust);	
	}
	
	
	@PostMapping("/login")
	public Boolean loginCustomer(@Validated @RequestBody Customer customer)throws ResourceNotFoundException{
		Boolean isLoggedIn = false;
		Long userId = customer.getUserId();
		String password = customer.getPassword();
		
		Customer c = custservice.loginCustomer(userId).orElseThrow(() ->
		new ResourceNotFoundException("Customer Doesn't Exist!"));
		
		if(userId.equals(c.getUserId()) && password.equals(c.getPassword())) {
			isLoggedIn = true;
		}
		
		return isLoggedIn;
	}
	
	 //Update customer detailswith new Values.
		@PutMapping("/{id}")
		public ResponseEntity<String> updateCustomer(@PathVariable(value="id")Long userId,
				@Validated @RequestBody Customer c) throws
		ResourceNotFoundException {
			Customer existingcust=custservice.getSingleCustomer(userId).orElseThrow(()-> new 
					ResourceNotFoundException("Customer not Found for this ID : " +userId));
		
			existingcust.setMobile(c.getMobile());
			existingcust.setEmail(c.getEmail());
			existingcust.setPermanentAddress(c.getPermanentAddress());
			existingcust.setCurrentAddress(c.getCurrentAddress());
			existingcust.setOptForNetBanking(c.isOptForNetBanking());
			
			String result = custservice.updateCustomer(existingcust);
			
		
			return ResponseEntity.ok().body(result);
		}
		
		
		//transaction
		@PostMapping("/transact")
		public String Transact(@RequestBody @Validated Transaction transDetails) {
			
			if(transservice.fundTransfer(transDetails)) {return "Transaction Successfull!";}
			return "Transaction Failed";
			
		}
		
		//String email
		
		@PostMapping("/requestchangepass")
		public ResponseEntity<String> RequestChangePassword(@RequestBody @Validated com.wellsfargo.training.ppb.model.RequestChangePassword repss) {
			String email = repss.getEmail();
			Optional<Customer> cust = custrepo.findByEmail(email);
			if(!cust.isPresent()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email not found!");
			}
			else {
				String otp = custservice.generateOtp(email);
				
				return ResponseEntity.ok(otp);
			}
		}
		
		
		@PostMapping("/changepassword")
		public ResponseEntity<String> ChangePassword(@RequestBody @Validated PasswordChangeBody psb) {
			String email = psb.getEmail();
			String inputotp = psb.getOtp();
			String newPassword = psb.getPassword();
			Optional<Customer> customer = custrepo.findByEmail(email);
			Customer cust = customer.get();
			if(!customer.isPresent()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email not found!");
			}
			else {
				if(custservice.verifyOtp(email, inputotp)) {
					cust.setPassword(newPassword);
					custrepo.save(cust);
					return ResponseEntity.ok("Password updated Successfully!");
					
					
				}
				else {
					return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid OTP!");
				}
				
			}
			
		}

		//add beneficiary or payee
		@PostMapping("/add-beneficiary/{id}")
		public String addBeneficiary(@PathVariable(value="id")Long userId, @RequestBody @Validated Beneficiary beneficiaryDetails) {
			
			return bservice.addBeneficiary(beneficiaryDetails, userId);
			
		}
		
		
		
	

	

}
