package com.wellsfargo.training.ppb.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;

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
	
	public Boolean fundTransfer(Transaction trans) {
		
		//get the sender's account number
		Optional<Account> acc = accrepo.findById(trans.getSenderAccNo());
		if(acc.isPresent()) {

	
		Long senderAccNo = trans.getSenderAccNo();
		Long receiverAccNo = trans.getReceiverAccNo();
		
		
		//fetch the acc number from the db
		Optional<Account> senderAcc = accrepo.findById(senderAccNo);
		Optional<Account> receiverAcc = accrepo.findById(receiverAccNo);

		
		Double senderBal = senderAcc.get().getBalance();
		Double recieverBal = receiverAcc.get().getBalance();
		
		Double transferAmt = trans.getAmount();
		
		Transaction newTrans = new Transaction();
		newTrans.setAmount(transferAmt);
		newTrans.setSenderAccNo(senderAccNo);
		newTrans.setReceiverAccNo(receiverAccNo);
		newTrans.setTransactionType(trans.getTransactionType());
		
		//create a time stamp
//		String timeStamp = new SimpleDateFormat("yyyy.mm.dd.HH.mm.ss").format(new java.util.Date());
		Date transTime= new Date();
		newTrans.setTimeStamp(transTime);
		
		if(senderBal>=transferAmt)
		{
						
			//adjusting the balances on both the sides
			senderBal-=transferAmt;
			recieverBal+=transferAmt;
			
			//set the account balance
			receiverAcc.get().setBalance(recieverBal);
			senderAcc.get().setBalance(senderBal);
				
			newTrans.setStatus("pass");

			
			newTrans.setAccount(acc.get());

			//once all the fields are set save the object
			transrepo.save(newTrans);
			return true;
			
		}
		else {
		
			newTrans.setStatus("failed");
			newTrans.setAccount(acc.get());
			transrepo.save(newTrans);
			return false;
			
		}
		
		}else {
			return false;
		}
		

		
	}
	
	
	
	

}
	
