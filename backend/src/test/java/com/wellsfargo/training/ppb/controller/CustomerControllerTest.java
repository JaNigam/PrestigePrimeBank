package com.wellsfargo.training.ppb.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
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
import com.wellsfargo.training.ppb.model.CurrentAddress;
import com.wellsfargo.training.ppb.model.Customer;
import com.wellsfargo.training.ppb.model.PermanentAddress;
import com.wellsfargo.training.ppb.service.CustomerService;

import jakarta.persistence.Column;

@SpringBootTest
class CustomerControllerTest {

	@Autowired
	private CustomerController custcontroller;
	
	Customer cust;
	CurrentAddress currentAddress;
	PermanentAddress permanentAddress;
	
	@MockBean
	private CustomerService custservice;
	
	@BeforeEach
	void setUp() throws Exception {
		cust = new Customer();
		currentAddress = new CurrentAddress();
		permanentAddress = new PermanentAddress();
	}

	@AfterEach
	void tearDown() throws Exception {
		cust=null;
		currentAddress=null;
		permanentAddress=null;
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
	void testUpdateCustomer() {
		
	}

	@Test
	void testTransact() {
		fail("Not yet implemented");
	}

	@Test
	void testRequestChangePassword() {
		fail("Not yet implemented");
	}

	@Test
	void testChangePassword() {
		fail("Not yet implemented");
	}

	@Test
	void testAddBeneficiary() {
		fail("Not yet implemented");
	}

	@Test
	void testGetCustomerAccountById() {
		fail("Not yet implemented");
	}

}
