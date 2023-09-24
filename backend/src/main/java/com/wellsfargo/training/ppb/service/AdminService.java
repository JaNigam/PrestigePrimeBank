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
	
	@Autowired
	private EmailSenderService mailservice;
	
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
	
	public Optional<Account> createAccount(Long userId, Account account) {
		Customer c = custrepo.findById(userId).get();
		
		if (c!=null && c.isValidCustomer()) {
        	  Long newaccountNo = generateUniqueAccountNo();
      		account.setAccountNo(newaccountNo);
      		
      		String branch = account.getBranch();
      		String newifsc = branch.substring(0,3)+(int)(branch.charAt(branch.length()-1))+(int)(branch.charAt(branch.length()-2));
      		account.setIfsc(newifsc);
      		account.setCustomer(c);
      				
      		
      		//sending account details to the customer through email
      		String toMail = c.getEmail();
			String subject = "Account Creation Successfull!";
			String body = "Hi, "+c.getName()+"\n\nWe would like to inform you that your account has been successfully created at our bank."
			+"\n\nYour Account Details are:"
			+"\nAccount No.:\t"+ newaccountNo
			+"\nIFSC code:\t\t" + newifsc
			+"\nBranch:\t\t\t\t"+ branch
			+"\n\n\nWarm Regards\nPrestige Prime Bank\nElevating Excellence In Banking.";
			mailservice.sendSimpleEmail(toMail, body, subject);
			
			
      		Account savedAccount= accrepo.save(account);
      		return Optional.ofNullable(savedAccount);
          }
		return Optional.empty();
	}
	
	
	public Long generateUniqueAccountNo() {
		Long accountNo;
		do {
			accountNo = (long)(Math.random()*900000+1000000);
		}while(accrepo.existsById(accountNo));
		return accountNo;
	}
	
	public List<Account> listAllAccounts(){
		return accrepo.findAll();
	}
}
