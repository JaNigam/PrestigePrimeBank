package com.wellsfargo.training.ppb.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.wellsfargo.training.ppb.exception.ResourceNotFoundException;
import com.wellsfargo.training.ppb.model.Account;
import com.wellsfargo.training.ppb.model.Beneficiary;
import com.wellsfargo.training.ppb.model.CurrentAddress;
import com.wellsfargo.training.ppb.model.Customer;
import com.wellsfargo.training.ppb.model.PasswordChangeBody;
import com.wellsfargo.training.ppb.model.PermanentAddress;
import com.wellsfargo.training.ppb.model.RequestChangePassword;
import com.wellsfargo.training.ppb.model.Transaction;
import com.wellsfargo.training.ppb.repository.AccountRepository;
import com.wellsfargo.training.ppb.repository.BeneficiaryRepository;
import com.wellsfargo.training.ppb.repository.CustomerRepository;
import com.wellsfargo.training.ppb.service.BeneficiaryService;
import com.wellsfargo.training.ppb.service.CustomerService;
import com.wellsfargo.training.ppb.service.TransactionService;

import jakarta.persistence.Column;

@SpringBootTest
class CustomerControllerTest {

	@Autowired
	private CustomerController custcontroller;
	
	Customer cust;
	Account acc;
	CurrentAddress currentAddress;
	PermanentAddress permanentAddress;
	CurrentAddress currentAddress1;
	PermanentAddress permanentAddress1;
	Transaction transDetails;
	RequestChangePassword rcp;
	PasswordChangeBody pcb;
	Beneficiary beneficiary;
	
	@MockBean
	private CustomerService custservice;
	
	@MockBean
	private TransactionService transservice;
	
	@MockBean
	private BeneficiaryService bservice;
	
	@MockBean
	private CustomerRepository custrepo;
	
	@MockBean
	private AccountRepository accrepo;
	
	@MockBean
	private BeneficiaryRepository brepo;
	
	@BeforeEach
	void setUp() throws Exception {
		cust = new Customer();
		acc = new Account();
		currentAddress = new CurrentAddress();
		permanentAddress = new PermanentAddress();
		currentAddress1 = new CurrentAddress();
		permanentAddress1 = new PermanentAddress();
		transDetails = new Transaction();
		rcp = new RequestChangePassword();
		pcb = new PasswordChangeBody();
		beneficiary = new Beneficiary();
	}

	@AfterEach
	void tearDown() throws Exception {
		cust=null;
		currentAddress=null;
		permanentAddress=null;
		currentAddress1=null;
		permanentAddress1=null;
		transDetails=null;
		rcp=null;
		beneficiary=null;
		acc=null;
	}

	@Test
	void testCreateCustomer() {
	        // Create a sample Customer object
	        Customer cust = new Customer();
	        cust.setUserId(1L);
	        cust.setPassword("123");
	        cust.setAadhar("111122223333");
	        cust.setEmail("123@gmail.com");
	        cust.setName("John");
	        cust.setMobile(1234567890);
	        cust.setDob("2000-11-11");
	        cust.setAdmin(false);
	        cust.setValidCustomer(true);
	        cust.setOptForNetBanking(true);
	        cust.setRights(false);
	        cust.setOccType("ABC");
	        cust.setGrossAnnualIncome(1234L);
	        cust.setIncomeSource("");
	        cust.setFathername("Father");
	        cust.setMothername("Mother");

	        currentAddress.setAddressId(1L);
	        currentAddress.setAddressLine1("Malviya Nagar");
	        currentAddress.setAddressLine2("Jaipur");
	        currentAddress.setLandmark("Landmark");
	        currentAddress.setCity("City");
	        currentAddress.setState("State");
	        currentAddress.setPincode(12345);
	        
	        // Create a sample PermanentAddress
	        permanentAddress.setAddressId(1L);
	        permanentAddress.setAddressLine1("Malviya Nagar");
	        permanentAddress.setAddressLine2("Jaipur");
	        permanentAddress.setLandmark("Landmark");
	        permanentAddress.setCity("City");
	        permanentAddress.setState("State");
	        permanentAddress.setPincode("12345");
	        
	        // Set associations
	        cust.setCurrentAddress(currentAddress);
	        cust.setPermanentAddress(permanentAddress);
	       
//	        when(custservice.saveCustomer(any(Customer.class))).thenReturn(cust);
	        when(custservice.saveCustomer(any(Customer.class))).thenReturn("New Customer Created Successfully");
			
			//junit
			ResponseEntity<String> re= custcontroller.createCustomer(cust);
			
			assertEquals(HttpStatus.OK, re.getStatusCode());
			assertEquals("Registration Successfull", re.getBody());
	        
			verify(custservice,times(1)).saveCustomer(any(Customer.class));
	}

	@Test
	void testLoginCustomer() throws ResourceNotFoundException {
		cust.setUserId(123L);
		cust.setPassword("securepassword");
		
		when(custservice.loginCustomer(123L)).thenReturn(Optional.of(cust));
		
		Customer c=custservice.loginCustomer(123L).get();
		assertEquals(c.getUserId(), cust.getUserId());
		assertEquals(c.getPassword(),cust.getPassword());
		
		ResponseEntity<Boolean> result=custcontroller.loginCustomer(cust);
		
		assertTrue(result.getBody());
		verify(custservice,times(2)).loginCustomer(123L);
	}

	@Test
	void testUpdateCustomer() throws ResourceNotFoundException{
		Customer existingcust = new Customer();
		existingcust.setUserId(123L);
		existingcust.setMobile(1234567890);
		existingcust.setEmail("kapil@example.com");
		existingcust.setOptForNetBanking(false);
		 
		currentAddress.setAddressId(1L);
        currentAddress.setAddressLine1("Malviya Nagar");
        currentAddress.setAddressLine2("Jaipur");
        currentAddress.setLandmark("Landmark");
        currentAddress.setCity("City");
        currentAddress.setState("State");
        currentAddress.setPincode(12345);
        
        // Create a sample PermanentAddress
        permanentAddress.setAddressId(1L);
        permanentAddress.setAddressLine1("Malviya Nagar");
        permanentAddress.setAddressLine2("Jaipur");
        permanentAddress.setLandmark("Landmark");
        permanentAddress.setCity("City");
        permanentAddress.setState("State");
        permanentAddress.setPincode("12345");
		
        existingcust.setPermanentAddress(permanentAddress);
		existingcust.setCurrentAddress(currentAddress);
		
		Customer updatedcust = new Customer();
		updatedcust.setUserId(123L);
		updatedcust.setMobile(987654321);
		updatedcust.setEmail("kapil@example.com");
		updatedcust.setOptForNetBanking(true);
		
		currentAddress1.setAddressId(1L);
        currentAddress1.setAddressLine1("Vaishali Nagar");
        currentAddress1.setAddressLine2("Jaipur");
        currentAddress1.setLandmark("Landmark");
        currentAddress1.setCity("Jaipur");
        currentAddress1.setState("Rajasthan");
        currentAddress1.setPincode(12345);
        
        // Create a sample PermanentAddress
        permanentAddress1.setAddressId(1L);
        permanentAddress1.setAddressLine1("Vaishali Nagar");
        permanentAddress1.setAddressLine2("Jaipur");
        permanentAddress1.setLandmark("Landmark");
        permanentAddress1.setCity("Jaipur");
        permanentAddress1.setState("Rajasthan");
        permanentAddress1.setPincode("12345");
		
        updatedcust.setPermanentAddress(permanentAddress1);
		updatedcust.setCurrentAddress(currentAddress1);
		
	
		when(custservice.getSingleCustomer(123L)).thenReturn(Optional.of(existingcust));
		when(custservice.updateCustomer(any(Customer.class))).thenReturn("Customer Details Updated Successfully");
		
		ResponseEntity<String> re= custcontroller.updateCustomer(123L, updatedcust);
		
		assertEquals(HttpStatus.OK,re.getStatusCode());
		assertEquals("Customer Details Updated Successfully", re.getBody());
		
		verify(custservice,times(1)).getSingleCustomer(123L);
		verify(custservice,times(1)).updateCustomer(any(Customer.class));
		
	}

	@Test
	void testTransact_success() {
		when(transservice.fundTransfer(any(Transaction.class))).thenReturn(true);
		
		ResponseEntity<String> re=custcontroller.Transact(transDetails);
		assertEquals(HttpStatus.OK, re.getStatusCode());
		assertEquals("Transaction Successfull!", re.getBody());
        
		verify(transservice,times(1)).fundTransfer(any(Transaction.class));
		
	}

	
	@Test
	void testTransact_fail() {
		when(transservice.fundTransfer(any(Transaction.class))).thenReturn(false);
		
		ResponseEntity<String> re=custcontroller.Transact(transDetails);
		assertEquals(HttpStatus.BAD_REQUEST, re.getStatusCode());
		assertEquals("Transaction Failed", re.getBody());
        
		verify(transservice,times(1)).fundTransfer(any(Transaction.class));
		
	}

	
//	
	@Test
	void testRequestChangePassword() {
        rcp.setEmail("kapil@example.com");

        when(custrepo.findByEmail(rcp.getEmail())).thenReturn(Optional.of(cust));
        when(custservice.generateOtp(rcp.getEmail())).thenReturn("123456");

        ResponseEntity<String> re=custcontroller.RequestChangePassword(rcp);
		assertEquals(HttpStatus.OK, re.getStatusCode());
		assertEquals("123456", re.getBody());
        
		verify(custservice,times(1)).generateOtp(rcp.getEmail());
		
	}

	@Test
	void testChangePassword() {
        pcb.setEmail("kapil@example.com");
        pcb.setOtp("123456");
        pcb.setPassword("newPassword");
        
        cust.setEmail(pcb.getEmail());
        when(custrepo.findByEmail(pcb.getEmail())).thenReturn(Optional.of(cust));
        when(custservice.verifyOtp(pcb.getEmail(), pcb.getOtp())).thenReturn(true);

        ResponseEntity<String> re = custcontroller.ChangePassword(pcb);

        assertEquals(HttpStatus.OK, re.getStatusCode());
        assertEquals("Password updated Successfully!", re.getBody());
        
        verify(custservice, times(1)).verifyOtp(pcb.getEmail(), pcb.getOtp());
	}

	@Test
	void testAddBeneficiary() {
	    beneficiary.setBeneficiaryName("UniqueName"); 
	    beneficiary.setBeneficiaryAccNo(1234567890L); 
	    Long userId = 123L;

	    when(bservice.addBeneficiary(beneficiary, userId)).thenReturn("Beneficiary Added Successfully!");

	    ResponseEntity<String> responseEntity = custcontroller.addBeneficiary(userId, beneficiary);

	    assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
	    assertEquals("Beneficiary added Successfully!", responseEntity.getBody());

	    verify(bservice, times(1)).addBeneficiary(beneficiary, userId);
	}

	@Test
	void testGetCustomerAccountById() throws ResourceNotFoundException {
		Long userId = 123L;
	    cust.setUserId(userId);
	    acc.setCustomer(cust);

	    when(custservice.getSingleCustomer(userId)).thenReturn(Optional.of(cust));
	    when(accrepo.findByCustomer(cust)).thenReturn(acc);

	    ResponseEntity<Account> responseEntity = custcontroller.getCustomerAccountById(userId);

	    assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

	    Account returnedAccount = responseEntity.getBody();
	    assertNotNull(returnedAccount);
	    assertEquals(userId, returnedAccount.getCustomer().getUserId());

	    verify(custservice, times(1)).getSingleCustomer(userId);
	    verify(accrepo, times(1)).findByCustomer(cust);
	}

}
