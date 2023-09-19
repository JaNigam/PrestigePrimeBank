package com.wellsfargo.training.ppb.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.web.bind.annotation.RestController;

import com.wellsfargo.training.ppb.exception.ResourceNotFoundException;
import com.wellsfargo.training.ppb.model.Customer;
import com.wellsfargo.training.ppb.service.CustomerService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/customer")
public class CustomerController {
	
	@Autowired
	CustomerService custservice;
	@PostMapping("/create-customer")
	public String createCustomer(@RequestBody @Validated Customer cust) {
		return custservice.saveCustomer(cust);
		
	}
	
	@GetMapping("/welcome")
	public String welcome() {
		return "welcome to customer";
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
	
	 //Update JSON product object with new Values.
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
		
//		@DeleteMapping("/{id}")
//		public ResponseEntity<Map<String,Boolean>> deleteCustomer(@PathVariable(value="id")Long userId) throws
//		ResourceNotFoundException {
//			
//			custservice.getSingleCustomer(userId).orElseThrow(()-> new 
//					ResourceNotFoundException("User not Found for this Id : " + userId));
//			
//			custservice.deleteCustomer(userId);
//			Map<String, Boolean> response=new HashMap<String, Boolean>();
//			response.put("deleted", Boolean.TRUE);
//			
//			return ResponseEntity.ok().body(response);
//		}
		
		@DeleteMapping("/{id}")
		public ResponseEntity<String> deleteCustomerAndAccounts(@PathVariable(value = "id") Long userId){
			try {
				custservice.deleteCustomer(userId);
				return ResponseEntity.ok("Customer and Account Deleted Successfully");
			}catch(Exception e) {
				return ResponseEntity.badRequest().body("Error deleting customer and account: " + e.getMessage());
			}
		}
		
		
	

	

}
