package com.wellsfargo.training.ppb.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
import com.wellsfargo.training.ppb.model.Account;
import com.wellsfargo.training.ppb.model.Customer;
import com.wellsfargo.training.ppb.service.AccountService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping(value="/customer")
public class AccountController {
	
	@Autowired
	private AccountService accservice;
	
	@PostMapping("/accounts/{id}")
	public ResponseEntity<Account> createAccount(@PathVariable("id") Long userId, @RequestBody Account account) throws 
	ResourceNotFoundException{
		Account newaccount = accservice.createAccount(userId, account).orElseThrow(()-> new 
				ResourceNotFoundException("Account can not be created for the user : " +userId));
		return ResponseEntity.ok().body(newaccount);
		
	}
	
	
	@GetMapping("/accounts")
	public ResponseEntity<List<Account>> getAllAccounts(){
		try {
			List<Account> accounts = accservice.listAll();
					return ResponseEntity.ok(accounts);
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
	
		
	@GetMapping("/accounts/{id}")
	public ResponseEntity<Account> getAccountById(@PathVariable(value="id")Long accountNo) throws
	ResourceNotFoundException {
		Account a=accservice.getSingleAccount(accountNo).orElseThrow(()-> new 
				ResourceNotFoundException("Product not Found for this ID : " + accountNo));
		return ResponseEntity.ok().body(a);
	}
	
	
	@PutMapping("/accounts/{id}")
	public ResponseEntity<String> updateAccount(@PathVariable(value="id")Long accountNo,
			@Validated @RequestBody Account a) throws
	ResourceNotFoundException {
		
			Account account = accservice.getSingleAccount(accountNo).orElseThrow(()-> new 
					ResourceNotFoundException("Customer not Found for this ID : " +accountNo));
			
			account.setBranch(a.getBranch());
			String result = accservice.updateAccount(account);
			
			return ResponseEntity.ok().body(result);
			
		
	}
	
	
	@DeleteMapping("/accounts/{id}")
	public ResponseEntity<Map<String,Boolean>> deleteAcount(@PathVariable(value="id")Long accountNo) throws
	ResourceNotFoundException {
		
		accservice.getSingleAccount(accountNo).orElseThrow(()-> new 
				ResourceNotFoundException("Account not Found for this User : " + accountNo));
		
		accservice.deleteAccount(accountNo);
		Map<String, Boolean> response=new HashMap<String, Boolean>();
		response.put("deleted", Boolean.TRUE);
		
		return ResponseEntity.ok().body(response);
	}
	
	
	
	
	

}
