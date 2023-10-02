package com.wellsfargo.training.ppb.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;


import com.wellsfargo.training.ppb.exception.ResourceNotFoundException;
import com.wellsfargo.training.ppb.model.Account;
import com.wellsfargo.training.ppb.model.Transaction;
import com.wellsfargo.training.ppb.service.AccountService;
import com.wellsfargo.training.ppb.service.TransactionService;

import io.micrometer.common.lang.Nullable;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.internal.matchers.Null;


@SpringBootTest
class AccountControllerTest {
	
	@Autowired
	private AccountController acontroller;
	
	Account account;
	
	@MockBean
	private AccountService aservice;
	
	@MockBean
	private TransactionService transservice;
	
	

	@BeforeEach
	void setUp() throws Exception {
		Account account = new Account();
	}

	@AfterEach
	void tearDown() throws Exception {
		account = null;
	}

	@Test
	void testGetAllAccounts_Success() {
		
		List<Account> sampleAccount = new ArrayList<>();

		// Sample Account 1
		Account account1 = new Account();
		account1.setAccountNo(1234L);
		account1.setAccountType("Savings");
		account1.setOpeningDate("2022-01-01");
		account1.setIfsc("IFSC123");
		account1.setBranch("Main Branch");
		account1.setBalance(5000.0);
	
		Account account2 = new Account();
		account2.setAccountNo(2L);
		account2.setAccountType("Current");
		account2.setOpeningDate("2022-02-15");
		account2.setIfsc("IFSC456");
		account2.setBranch("Branch 2");
		account2.setBalance(8000.0);
	
		sampleAccount.add(account1);
		sampleAccount.add(account2);

		
		when(aservice.listAll()).thenReturn(sampleAccount);
		
		ResponseEntity<List<Account>> responseAccounts = acontroller.getAllAccounts();
		
		assertEquals(2,responseAccounts.getBody().size());
		assertEquals(1234L,responseAccounts.getBody().get(0).getAccountNo());
		assertEquals(2L,responseAccounts.getBody().get(1).getAccountNo());
		
		verify(aservice,times(1)).listAll();
	}
	
	 @Test
	    public void testGetAllAccounts_Error() {
	        
	        when(aservice.listAll()).thenThrow(new RuntimeException("An error occurred"));
	        ResponseEntity<List<Account>> responseEntity = acontroller.getAllAccounts();
	        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode());
	        assertNull(responseEntity.getBody());
	        verify(aservice, times(1)).listAll();
	    }
	
	

	@Test
	void testGetAccountById() throws ResourceNotFoundException {
		Account account1 = new Account();
		account1.setAccountNo(1234L);
		account1.setAccountType("Savings");
		account1.setOpeningDate("2022-01-01");
		account1.setIfsc("IFSC123");
		account1.setBranch("Main Branch");
		account1.setBalance(5000.0);
		
		when(aservice.getSingleAccount(1234L)).thenReturn(Optional.of(account1));
		
		ResponseEntity<Account> re=acontroller.getAccountById(1234L);
		
		assertEquals(HttpStatus.OK,re.getStatusCode());
		assertEquals(1234L, re.getBody().getAccountNo());
		assertEquals("Savings", re.getBody().getAccountType());
		assertEquals(5000.0, re.getBody().getBalance());
		assertEquals("Main Branch", re.getBody().getBranch());
		assertEquals("IFSC123", re.getBody().getIfsc());
		assertEquals("2022-01-01", re.getBody().getOpeningDate());
		
		verify(aservice,times(1)).getSingleAccount(1234L);
	}

	@Test
	void testDeleteAcount() throws ResourceNotFoundException {
		Account account1 = new Account();
		account1.setAccountNo(1234L);
		account1.setAccountType("Savings");
		account1.setOpeningDate("2022-01-01");
		account1.setIfsc("IFSC123");
		account1.setBranch("Main Branch");
		account1.setBalance(5000.0);
		
		when(aservice.getSingleAccount(1234L)).thenReturn(Optional.of(account1));
		doNothing().when(aservice).deleteAccount(1234L);
		
		ResponseEntity<Map<String,Boolean>> response=acontroller.deleteAcount(1234L);
		
		assertTrue(response.getBody().containsKey("deleted"));
		assertTrue(response.getBody().get("deleted"));
		
		verify(aservice,times(1)).getSingleAccount(1234L);
		verify(aservice,times(1)).deleteAccount(1234L);
	}

	@Test
	void testGetTransactionsBetweenDates() {
		Account account = new Account();
        account.setAccountNo(1L);

        List<Transaction> sampleTransactions = new ArrayList<>();
        
        Calendar startcalendar = Calendar.getInstance();

      
        startcalendar.set(Calendar.YEAR, 2023);       
        startcalendar.set(Calendar.MONTH, Calendar.AUGUST); 
        startcalendar.set(Calendar.DAY_OF_MONTH, 15);   
        startcalendar.set(Calendar.HOUR_OF_DAY, 10);     
        startcalendar.set(Calendar.MINUTE, 30);           
        startcalendar.set(Calendar.SECOND, 0);            
        startcalendar.set(Calendar.MILLISECOND, 0);       

        
        Date startDate = startcalendar.getTime();
        
        Calendar endcalendar = Calendar.getInstance();
       
        startcalendar.set(Calendar.YEAR, 2023);        
        startcalendar.set(Calendar.MONTH, Calendar.AUGUST); 
        startcalendar.set(Calendar.DAY_OF_MONTH, 30);    
        startcalendar.set(Calendar.HOUR_OF_DAY, 10);     
        startcalendar.set(Calendar.MINUTE, 30);           
        startcalendar.set(Calendar.SECOND, 0);           
        startcalendar.set(Calendar.MILLISECOND, 0);       

     
        Date endDate = endcalendar.getTime();
        

        Transaction transaction1 = new Transaction();
        transaction1.setTransactionId(101L);
        transaction1.setTransactionType("NEFT");
        transaction1.setAmount(1000.0);
        transaction1.setSenderAccNo(1L);
        transaction1.setReceiverAccNo(123L); 
        transaction1.setTimeStamp(startDate);
        transaction1.setStatus("pass");
        transaction1.setAccount(account);

        Transaction transaction2 = new Transaction();
        transaction1.setTransactionId(102L);
        transaction1.setTransactionType("NEFT");
        transaction1.setAmount(1001.0);
        transaction1.setSenderAccNo(1L);
        transaction1.setReceiverAccNo(12L); 
        transaction1.setTimeStamp(endDate);
        transaction1.setStatus("pass");
        transaction1.setAccount(account);
        
        Transaction transaction3 = new Transaction();
        transaction1.setTransactionId(102L);
        transaction1.setTransactionType("NEFT");
        transaction1.setAmount(1001.0);
        transaction1.setSenderAccNo(1L);
        transaction1.setReceiverAccNo(12L); 
        transaction1.setTimeStamp(new Date());
        transaction1.setStatus("pass");
        transaction1.setAccount(account);

       
        sampleTransactions.add(transaction3);
        sampleTransactions.add(transaction1);
        sampleTransactions.add(transaction2);

        
        when(aservice.getTransactionsBetweenDates(account.getAccountNo(), startDate, endDate)).thenReturn(sampleTransactions);
        ResponseEntity<List<Transaction>> responsetransaction = acontroller.getTransactionsBetweenDates(1L,startDate, endDate);
		assertEquals(HttpStatus.OK,responsetransaction.getStatusCode());
		assertEquals(3,responsetransaction.getBody().size());
		assertEquals(sampleTransactions,responsetransaction.getBody());
		verify(aservice,times(1)).getTransactionsBetweenDates(1L, startDate, endDate);

        
    }
	

	@Test
	void testGetAllTransactions() {
		Account account = new Account();
        account.setAccountNo(1L);
        
        List<Transaction> sampleTransaction = new ArrayList<>();

        Transaction transaction1 = new Transaction();
        transaction1.setTransactionId(101L);
        transaction1.setTransactionType("NEFT");
        transaction1.setAmount(1000.0);
        transaction1.setSenderAccNo(1L);
        transaction1.setReceiverAccNo(123L); 
        transaction1.setTimeStamp(new Date());
        transaction1.setStatus("pass");
        transaction1.setAccount(account);

       
        Transaction transaction2 = new Transaction();
        transaction1.setTransactionId(102L);
        transaction1.setTransactionType("NEFT");
        transaction1.setAmount(1001.0);
        transaction1.setSenderAccNo(1L);
        transaction1.setReceiverAccNo(12L); 
        transaction1.setTimeStamp(new Date());
        transaction1.setStatus("pass");
        transaction1.setAccount(account);

       
        sampleTransaction.add(transaction1);
        sampleTransaction.add(transaction2);

        
        when(aservice.getAllTransactions(1L)).thenReturn(sampleTransaction);
        
		
		ResponseEntity<List<Transaction>> responsetransaction = acontroller.getAllTransactions(1L);
		assertEquals(HttpStatus.OK,responsetransaction.getStatusCode());
		assertEquals(2,responsetransaction.getBody().size());
		assertEquals(sampleTransaction,responsetransaction.getBody());
		verify(aservice,times(1)).getAllTransactions(1L);
        

	}

}
