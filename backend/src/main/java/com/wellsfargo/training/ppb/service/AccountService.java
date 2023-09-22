package com.wellsfargo.training.ppb.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wellsfargo.training.ppb.model.Account;
import com.wellsfargo.training.ppb.model.Customer;
import com.wellsfargo.training.ppb.model.Transaction;
import com.wellsfargo.training.ppb.repository.AccountRepository;
import com.wellsfargo.training.ppb.repository.CustomerRepository;
import com.wellsfargo.training.ppb.repository.TransactionRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AccountService {
	@Autowired
	private AccountRepository accrepo;
	
	@Autowired
    private TransactionRepository transrepo;
	
	
	public List<Account> listAll(){
		return accrepo.findAll();
	}
		
	//Optional - Handles NullPointer Exception
	public Optional<Account> getSingleAccount(Long id){
		return accrepo.findById(id); // invokes predefined method of JPA Repository
	}
	
	public void deleteAccount(Long id) {
		accrepo.deleteById(id); 
	}
	
	public String updateAccount(Account updatedacc) {
		
		String result = "";
		accrepo.save(updatedacc);
		result = "Account Details Updated Successfully";
		
		return result;
	}
	
	public String addMoney(Account acc, Double moneyToAdd)
	{
		Double currentBalance = acc.getBalance();
		Double newBalance = currentBalance+moneyToAdd;
		acc.setBalance(newBalance);
		accrepo.save(acc);
		return "Money added!";
	}
	
	public List<Transaction> getTransactionsBetweenDates(Long accountNo, Date startDate, Date endDate) {
        return transrepo.findTransactionsBetweenDates(accountNo, startDate, endDate);
    }
	
}
