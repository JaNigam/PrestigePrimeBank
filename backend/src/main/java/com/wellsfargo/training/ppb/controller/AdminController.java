package com.wellsfargo.training.ppb.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
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
import com.wellsfargo.training.ppb.service.AdminService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/admin")
public class AdminController {
	
	@Autowired
	AdminService adminservice;
	
	
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
	
	
	
}
