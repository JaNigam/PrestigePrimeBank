package com.wellsfargo.training.ppb.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wellsfargo.training.ppb.model.Account;
import com.wellsfargo.training.ppb.model.Admin;
import com.wellsfargo.training.ppb.model.Customer;
import com.wellsfargo.training.ppb.repository.AccountRepository;
import com.wellsfargo.training.ppb.repository.AdminRepository;
import com.wellsfargo.training.ppb.repository.CustomerRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AdminService {
	@Autowired
	private AccountRepository accrepo;
	
	@Autowired
	private CustomerRepository custrepo;
	
	@Autowired
	private AdminRepository adminrepo;
	
	public String saveAdmin(Admin admin) {
		
		String result = "";
		Optional<Admin> existingAdmin = adminrepo.findById(admin.getUserId());
		
		if(existingAdmin.isPresent())
		{
			result = "Admin Already Exists";
		}
		else {
			adminrepo.save(admin);
			result = "New Admin Created Successfully";
		}
		return result;
	}
	
	
	public void setLoginStatus(Long userId, Boolean Status) {
		adminrepo.updateStatus(userId, Status);
		
	}
	
	public Boolean getLoginStatus(Long userId) {
		return adminrepo.getLoginStatusById(userId);
	}
	
	public Optional<Admin> loginAdmin(Long userId) {
		return adminrepo.findById(userId);
	}
	

	
	public List<Account> listAllAccounts(){
		return accrepo.findAll();
	}
	
//	public Boolean LoginStatus(Long userId){
//		
//	}
	
//	public List<Customer> listAllCustomers(){
//		return custrepo.findAll();
//	}
	
	/*For now keeping single admin*/
//	Optional - Handles NullPointer Exception
//	public Optional<Account> getAccount(long accountId){
//		return accrepo.findById(accountId); // invokes predefined method of JPA Repository
//	}
//	
//	public void deleteAccount(long accountId) {
//		accrepo.deleteById(accountId); 
//	}
//	
//	public Optional<Customer> getCustomer(long userId){
//		return custrepo.findById(userId); // invokes predefined method of JPA Repository
//	}
//	
//	public void deleteCustomer(long userId) {
//		accrepo.deleteById(userId); 
//	}
}
