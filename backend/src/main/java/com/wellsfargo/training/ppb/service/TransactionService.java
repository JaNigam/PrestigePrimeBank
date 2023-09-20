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
		
		Long senderAccNo = trans.getSenderAccNo();
		Long receiverAccNo = trans.getRecieverAccNo();
		Account senderAcc = accrepo.findByAccountNo(senderAccNo);
				//findById(senderAccNo).get();
		Double balanceSender = senderAcc.getBalance();
		Double amount = trans.getAmount();
		Account receiverAcc = accrepo.findByAccountNo(receiverAccNo);
		//findById(receiverAccNo)
		// || accrepo.findByAccountNo(receiverAccNo).isEmpty()
		if(amount > balanceSender || accrepo.findById(receiverAccNo) == null) {
			trans.setStatus("fail");
		}
		else {
			
					//findById(receiverAccNo).get();
			trans.setStatus("success");
			balanceSender-=amount;
			Double balanceReceiver = receiverAcc.getBalance();
			balanceReceiver+=amount;
			receiverAcc.setBalance(balanceReceiver);
			accrepo.save(receiverAcc);
			senderAcc.setBalance(balanceSender);
			accrepo.save(senderAcc);
		}
		trans.setAccount(senderAcc);
		String timeStamp = new SimpleDateFormat("yyyy.mm.dd.HH.mm.ss").format(new java.util.Date());
		trans.setTimeStamp(timeStamp);
		return transrepo.save(trans);
		
	}
	
	
	
	

}
