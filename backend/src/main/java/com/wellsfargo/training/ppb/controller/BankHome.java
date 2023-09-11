package com.wellsfargo.training.ppb.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BankHome {
	
	@GetMapping("/")
	public String home() {
		return "Welcome to Prestige Prime Bank";
	}

}
