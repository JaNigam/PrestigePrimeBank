package com.wellsfargo.training.ppb.service;

import java.text.SimpleDateFormat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wellsfargo.training.ppb.model.Account;
import com.wellsfargo.training.ppb.model.Transaction;
import com.wellsfargo.training.ppb.repository.AccountRepository;
import com.wellsfargo.training.ppb.repository.TransactionRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class TransactionService {
	
	@Autowired
	TransactionRepository transrepo;
	
	@Autowired
	AccountRepository accrepo;
	
	public Transaction fundTransfer(Transaction trans) {
		
		//extracting sender's & Recvs acc no from the trans json object
		Long senderAccNo = trans.getSenderAccNo();
		Long receiverAccNo = trans.getRecieverAccNo();
		
		
		
		//fetching senders's acc by the given acc no
		Account senderAcc = accrepo.findById(senderAccNo).get();
		
		//get the balance of the sender
		Double balanceSender = senderAcc.getBalance();
		
		//get the transaction amount
		Double amount = trans.getAmount();
		
		//findById(receiverAccNo)
		// || accrepo.findByAccountNo(receiverAccNo).isEmpty()
		if(amount > balanceSender || accrepo.findById(receiverAccNo) == null) {
			trans.setStatus("fail");
		}
		else {
			
					//findById(receiverAccNo).get();
			//fetch the receiver acc details
			Account receiverAcc = accrepo.findById(receiverAccNo).get();
			trans.setStatus("success");
			
			//adjust acc balance of the sender
			balanceSender-=amount;
			senderAcc.setBalance(balanceSender);
			accrepo.save(senderAcc);
			
			
			//adjust acc balance of the receiver 
			Double balanceReceiver = receiverAcc.getBalance();
			balanceReceiver+=amount;
			receiverAcc.setBalance(balanceReceiver);
			
			accrepo.save(receiverAcc);
			
			
			
		}
//		trans.setAccount(senderAcc);
		String timeStamp = new SimpleDateFormat("yyyy.mm.dd.HH.mm.ss").format(new java.util.Date());
		trans.setTimeStamp(timeStamp);
		return transrepo.save(trans);
		
	}
	
	
	
	

}
