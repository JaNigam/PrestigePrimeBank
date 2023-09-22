package com.wellsfargo.training.ppb.controller;

import java.util.List;

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
import com.wellsfargo.training.ppb.model.Admin;
import com.wellsfargo.training.ppb.model.Customer;
import com.wellsfargo.training.ppb.service.AccountService;
import com.wellsfargo.training.ppb.service.AdminService;
import com.wellsfargo.training.ppb.service.CustomerService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/admin")
public class AdminController {
	
	@Autowired
	AdminService adminservice;
	
	@Autowired
	CustomerService custservice;
	
	@Autowired
	private AccountService accservice;
	
	@PostMapping("/create-admin")
	public String createAdmin(@RequestBody Admin admin) {
		return adminservice.saveAdmin(admin);
	}
	
	@PostMapping("/login")
	public Boolean loginAdmin(@Validated @RequestBody Admin admin)throws ResourceNotFoundException{
		Long userId = admin.getUserId();
		String password = admin.getPassword();
		
		Admin a = adminservice.loginAdmin(userId).orElseThrow(() ->
		new ResourceNotFoundException("Admin Doesn't Exist!"));
		
		if(userId.equals(a.getUserId()) && password.equals(a.getPassword())) {
			adminservice.setLoginStatus(userId, true);
		}
		
		return adminservice.getLoginStatus(userId);
	}
	
//	@PostMapping("{aid}/approve-customer/{cid}")
//    public ResponseEntity<Customer> approveCustomer(@PathVariable(value = "aid") Long adminId, @PathVariable(value="cid") Long custId) {
//        Customer approvedCustomer = custservice.approveCustomer(custId);
//        return new ResponseEntity<>(approvedCustomer, HttpStatus.OK);
//    }
	
	@GetMapping("{id}/accounts")
	public ResponseEntity<List<Account>> getAllAccounts(@PathVariable(value="id") Long adminId){
		try {
			
			adminservice.loginAdmin(adminId).orElseThrow(() -> new 
					ResourceNotFoundException("Admin Does Not Exist For the Given Id: "+adminId));
			
			if(adminservice.getLoginStatus(adminId))
			{
				List<Account> accounts = adminservice.listAllAccounts();
				return ResponseEntity.ok(accounts);
			}else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);}
			
		
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
	
	@PostMapping("{id}/logout")
	public Boolean logoutAdmin(@PathVariable(value="id") Long adminId){
		adminservice.setLoginStatus(adminId, false);
		return adminservice.getLoginStatus(adminId);
	} 
	
	
	
	@DeleteMapping("{aid}/deletecustomer/{cid}")
	public ResponseEntity<String> deleteCustomerAndAccounts(@PathVariable(value = "aid") Long adminId, @PathVariable(value="cid") Long custId ){
		
		if(adminservice.getLoginStatus(adminId))
		{
		
			try {
				if(custservice.deleteCustomer(custId)) {
				return ResponseEntity.ok("Customer and Account Deleted Successfully");
				}
				else {
					return ResponseEntity.ok("Customer does not exist");
				}
			}catch(Exception e) {
				return ResponseEntity.badRequest().body("Error deleting customer and account: " + e.getMessage());
			}
		}
		else {
			return ResponseEntity.badRequest().body("Admin not authenticated");
		}
	}
	
		//create account with the given userid
		@PostMapping("{aid}/accounts/{cid}")
		public ResponseEntity<String> createAccount(@PathVariable(value = "aid") Long adminId, @PathVariable(value="cid") Long custId,  @RequestBody Account account) throws 
		ResourceNotFoundException{
			
			if(adminservice.getLoginStatus(adminId))
			{
			adminservice.createAccount(custId, account).orElseThrow(()-> new 
					ResourceNotFoundException("Account can not be created for the user : " +custId));
			return ResponseEntity.ok().body("Account Created Successfully!");
			}
			else {
				return ResponseEntity.badRequest().body("Admin not authenticated");
			}
		}
	
		
	//update customer
		//update the account with the given userid
		@PutMapping("{aid}/accounts/{accid}")
		public ResponseEntity<String> updateAccount(@PathVariable(value="aid")Long adminId, @PathVariable(value="accid")Long accountNo,
				@Validated @RequestBody Account a) throws
		ResourceNotFoundException {
			
			if(adminservice.getLoginStatus(adminId))
			{
				Account account = accservice.getSingleAccount(accountNo).orElseThrow(()-> new 
						ResourceNotFoundException("Customer not Found for this ID : " +accountNo));
				
				account.setBranch(a.getBranch());
				String newBranch = a.getBranch();
				String newifsc = newBranch.substring(0,3)+(int)(newBranch.charAt(newBranch.length()-1))+(int)(newBranch.charAt(newBranch.length()-2));
				account.setIfsc(newifsc);
				String result = accservice.updateAccount(account);
				
				return ResponseEntity.ok().body(result);
			}else
			{
				return ResponseEntity.badRequest().body("Admin not authenticated");
			}
				
		}
	
	
	
}
