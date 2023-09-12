package com.wellsfargo.training.ppb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.wellsfargo.training.ppb.model.Customer;
import com.wellsfargo.training.ppb.service.CustomerService;

@RestController
@RequestMapping("/customer")
public class CustomerController {
	
	@Autowired
	CustomerService custservice;
	@PostMapping("/create-customer")
	public String createCustomer(@RequestBody Customer cust) {
		return custservice.saveCustomer(cust);
	}
	
	@GetMapping("/welcome")
	public String welcome() {
		return "welcome to customer";
	}
	

}
