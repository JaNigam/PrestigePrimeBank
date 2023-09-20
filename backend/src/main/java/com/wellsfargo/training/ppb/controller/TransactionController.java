package com.wellsfargo.training.ppb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wellsfargo.training.ppb.model.Transaction;
import com.wellsfargo.training.ppb.service.TransactionService;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping(value="/customer")
public class TransactionController {
	
	@Autowired
	TransactionService transservice;
	
//	@PostMapping("/transact")
//	public String Transact(@RequestBody Transaction transaction) {
//		String result = "";
//		
//		Transaction trans = transservice.fundTransfer(transaction);
//		
//		if(trans == null || "fail".equals(trans.getStatus())) {
//			result = "Transaction failed!";
//		}
//		else {
//			result = "Transaction Success!";
//		}
//		
//		return result;
//	}

}

// trans.getStatus() == "fail"