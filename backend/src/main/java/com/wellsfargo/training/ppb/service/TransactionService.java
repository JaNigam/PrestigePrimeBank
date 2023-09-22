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
		Account a=accrepo.findByAccountNo(senderAccNo);
		if(senderBal>=transferAmt)
		{
						
			//adjusting the balances on both the sides
			senderBal-=transferAmt;
			recieverBal+=transferAmt;
			
			//set the account balance
			receiverAcc.get().setBalance(recieverBal);
			senderAcc.get().setBalance(senderBal);
				
			newTrans.setStatus("pass");
			newTrans.setAccount(a);
			//once all the fields are set save the object
			transrepo.save(newTrans);
			return true;
			
		}
		else {
		
			newTrans.setStatus("failed");
			transrepo.save(newTrans);
			return false;
			
		}
		
		
		
//		//extracting sender's & Recvs acc no from the trans json object
//		Long senderAccNo = trans.getSenderAccNo();
//		Long receiverAccNo = trans.getRecieverAccNo();
//		
//		
//		
//		//fetching senders's acc by the given acc no
//		Account senderAcc = accrepo.findById(senderAccNo).get();
//		
//		//get the balance of the sender
//		Double balanceSender = senderAcc.getBalance();
//		
//		//get the transaction amount
//		Double amount = trans.getAmount();
//		
//		//findById(receiverAccNo)
//		// || accrepo.findByAccountNo(receiverAccNo).isEmpty()
//		if(amount > balanceSender || accrepo.findById(receiverAccNo) == null) {
//			trans.setStatus("fail");
//		}
//		else {
//			
//					//findById(receiverAccNo).get();
//			//fetch the receiver acc details
//			Account receiverAcc = accrepo.findById(receiverAccNo).get();
//			trans.setStatus("success");
//			
//			//adjust acc balance of the sender
//			balanceSender-=amount;
//			senderAcc.setBalance(balanceSender);
//			accrepo.save(senderAcc);
//			
//			
//			//adjust acc balance of the receiver 
//			Double balanceReceiver = receiverAcc.getBalance();
//			balanceReceiver+=amount;
//			receiverAcc.setBalance(balanceReceiver);
//			
//			accrepo.save(receiverAcc);
//			
//			
//			
//		}
////		trans.setAccount(senderAcc);
//		String timeStamp = new SimpleDateFormat("yyyy.mm.dd.HH.mm.ss").format(new java.util.Date());
//		trans.setTimeStamp(timeStamp);
//		return transrepo.save(trans);
		
	}
	
	
	
	

}
