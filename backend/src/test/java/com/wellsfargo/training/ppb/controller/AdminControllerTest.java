package com.wellsfargo.training.ppb.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wellsfargo.training.ppb.exception.ResourceNotFoundException;
import com.wellsfargo.training.ppb.model.Account;
import com.wellsfargo.training.ppb.model.Admin;
import com.wellsfargo.training.ppb.model.Customer;
import com.wellsfargo.training.ppb.service.AccountService;
import com.wellsfargo.training.ppb.service.AdminService;
import com.wellsfargo.training.ppb.service.CustomerService;

@SpringBootTest
class AdminControllerTest {

	//Since testing the admin controller
	@Autowired
	private AdminController admcontroller;
	
	@MockBean
	private AdminService admservice;
	
	@MockBean
	private CustomerService custservice;
	
	@MockBean
	private AccountService accservice;
	
	@MockBean
	private JsonNode jsonNode;
	
	Admin admin;
	
	@BeforeEach
	void setUp() throws Exception {
        admin = new Admin();
        admin.setUserId(123L);
        admin.setPassword("admin@123");
        when(admservice.loginAdmin(123L)).thenReturn(Optional.of(admin));
        
        Long adminId = 123L;
		Long custId1 = 345L;
		
		
	}

	@AfterEach
	void tearDown() throws Exception {
		admin = null;
	}

//	@Test
//	void testCreateAdmin() {
//		
////		//setting an admin values
////		admin.setUserId(123L); 
////		admin.setPassword("password@123");
////		
////		when(admservice.saveAdmin(any(Admin.class))).thenReturn("New Admin created successfully");
////		
////		String result = admcontroller.createAdmin(admin);
////		
////		assertEquals(result, "New Admin Created Successfully");
//////		verify(admservice,times(1)).saveAdmin(any(Admin.class));
//		
//		
//		
//		
//	}

	@Test
	void testLoginAdmin() throws ResourceNotFoundException {
		
		Admin mockedAdmin = admservice.loginAdmin(123L).get();
	    assertEquals(admin.getUserId(), mockedAdmin.getUserId());
	    assertEquals(admin.getPassword(), mockedAdmin.getPassword());
	    
	    // Check the behavior of the controller
	    Boolean result = admcontroller.loginAdmin(admin);
	  
		assertTrue(result);
		
		verify(admservice,times(2)).loginAdmin(123L);
		
	}

	@Test
	void testGetAllAccounts() {
		
		//create sample accounts
		List<Account> mockAccList = new ArrayList<>();
		Long adminId2 = 345L;
		// Sample Account 1
		Account account1 = new Account();
		account1.setAccountNo(1234L);
		account1.setAccountType("Savings");
		account1.setOpeningDate("2022-01-01");
		account1.setIfsc("IFSC123");
		account1.setBranch("Main Branch");
		account1.setBalance(5000.0);
		
		//Sample Account 2
		Account account2 = new Account();
		account2.setAccountNo(2L);
		account2.setAccountType("Current");
		account2.setOpeningDate("2022-02-15");
		account2.setIfsc("IFSC456");
		account2.setBranch("Branch 2");
		account2.setBalance(8000.0);
		
		//adding both of these accounts to the sampleAccount list
		mockAccList.add(account1);
		mockAccList.add(account2);
		
		
		//mocking the function when listAllAccounts function of admservice is called
		//thus it should return our mocked list which we created above
		when(admservice.listAllAccounts()).thenReturn(mockAccList);
		when(admservice.getLoginStatus(123L)).thenReturn(true);
		when(admservice.getLoginStatus(adminId2)).thenReturn(false);
		ResponseEntity<List<Account>> respAccs = admcontroller.getAllAccounts(123L);
		
		
		assertEquals(2, respAccs.getBody().size());
		assertEquals(HttpStatus.OK, respAccs.getStatusCode());
		assertEquals(1234L,respAccs.getBody().get(0).getAccountNo());
		assertEquals(2L,respAccs.getBody().get(1).getAccountNo());
		
		//when the admin is not authenticated
		ResponseEntity<List<Account>> re2 = admcontroller.getAllAccounts(adminId2);
		assertEquals(HttpStatus.UNAUTHORIZED, re2.getStatusCode());
		assertNull(re2.getBody());
		
		
		verify(admservice, times(1)).listAllAccounts();	
		verify(admservice, times(1)).getLoginStatus(123L);
		
	}

	@Test
	void testLogoutAdmin() {
		
		 	Long adminId = 123L;
		    when(admservice.getLoginStatus(adminId)).thenReturn(true);

		    // Execute
		    Boolean result = admcontroller.logoutAdmin(adminId);

		    // Verify
		    assertFalse(result); // Assuming setLoginStatus sets the status to false

		    verify(admservice, times(1)).setLoginStatus(adminId, false);
		    verify(admservice, times(1)).getLoginStatus(adminId);
	}

	@Test
	void testDeleteCustomerAndAccounts() {
		
		
		Long adminId = 123L;
		Long adminId2 = 345L;
		Long custId1 = 345L;
		Long custId2 = 789L;
		
		
		when(custservice.deleteCustomer(custId1)).thenReturn(true);
		when(custservice.deleteCustomer(custId2)).thenReturn(false);
		
		when(admservice.getLoginStatus(adminId)).thenReturn(true);
		when(admservice.getLoginStatus(adminId2)).thenReturn(false);
		
		ResponseEntity<String> re1 = admcontroller.deleteCustomerAndAccounts(adminId, custId1);
		ResponseEntity<String> re2 = admcontroller.deleteCustomerAndAccounts(adminId, custId2);
		
		assertEquals(re1.getBody(), "Customer and Account Deleted Successfully");
		assertEquals(re2.getBody(), "Customer does not exist");
		
		//when the admin is not authenticated
		ResponseEntity<String> re3 = admcontroller.deleteCustomerAndAccounts(adminId2, custId1);
		assertEquals(HttpStatus.BAD_REQUEST, re3.getStatusCode());
		assertEquals(re3.getBody(), "Authentication Failed!");
		
		verify(custservice, times(1)).deleteCustomer(custId1);
		verify(custservice, times(1)).deleteCustomer(custId2);
		verify(admservice, times(2)).getLoginStatus(adminId);
		
	}

	@Test
	void testCreateAccount() throws ResourceNotFoundException {
		
		Long adminId = 123L;
		Long adminId2 = 345L;
		Long custId1 = 345L;
		Long custId2 = 789L;
		
		Account account1 = new Account();
		account1.setAccountNo(1234L);
		account1.setAccountType("Savings");
		account1.setOpeningDate("2022-01-01");
		account1.setIfsc("IFSC123");
		account1.setBranch("Main Branch");
		account1.setBalance(5000.0);
		
		when(admservice.getLoginStatus(adminId)).thenReturn(true);
		when(admservice.getLoginStatus(adminId2)).thenReturn(false);
		when(admservice.createAccount(custId1, account1)).thenReturn(Optional.ofNullable(account1));
		
		ResponseEntity<String> re = admcontroller.createAccount(adminId, custId1, account1);
		
		assertEquals(HttpStatus.OK, re.getStatusCode());
		assertEquals(re.getBody(), "Account Created Successfully!");
		
		//when the admin is not authenticated
		ResponseEntity<String> re2 = admcontroller.createAccount(adminId2, custId1, account1);
		assertEquals(HttpStatus.BAD_REQUEST, re2.getStatusCode());
		assertEquals(re2.getBody(), "Authentication Failed!");
		
		verify(admservice, times(1)).createAccount(custId1, account1);
		verify(admservice, times(1)).getLoginStatus(adminId);
		
	}

	@Test
	void testUpdateAccount() throws ResourceNotFoundException {
		
		Long adminId = 123L;
		Long adminId2 = 345L;
		Long custId1 = 345L;
		Long custId2 = 789L;
		
		//create current account	
		Account account1 = new Account();
		account1.setAccountNo(1234L);
		account1.setAccountType("Savings");
		account1.setOpeningDate("2022-01-01");
		account1.setIfsc("ajm109106");
		account1.setBranch("ajm");
		account1.setBalance(5000.0);
		
		//updated account details
		Account updateAcc = new Account();
		updateAcc.setAccountNo(1234L);
		updateAcc.setAccountType("Savings");
		updateAcc.setOpeningDate("2022-01-01");
		updateAcc.setBranch("Kota");
		updateAcc.setBalance(5000.0);
		
		when(admservice.getLoginStatus(adminId)).thenReturn(true);
		when(admservice.getLoginStatus(adminId2)).thenReturn(false);
		when(accservice.getSingleAccount(1234L)).thenReturn(Optional.of(account1));
		when(accservice.updateAccount(account1)).thenReturn("Account Details Updated Successfully");
		
		ResponseEntity<String> re = admcontroller.updateAccount(adminId, 1234L, updateAcc);
		
		
		assertEquals(HttpStatus.OK, re.getStatusCode());
		assertEquals(account1.getBranch(), updateAcc.getBranch());
		
		//when admin is not authenticated
		ResponseEntity<String> re2 = admcontroller.updateAccount(adminId2, 1234L, updateAcc);
		assertEquals(HttpStatus.BAD_REQUEST, re2.getStatusCode());
		assertEquals(re2.getBody(), "Authentication Failed!");
		
		
		
	}

	@Test
	void testAddMoney() throws ResourceNotFoundException {
		Long adminId = 123L;
		Long adminId2 = 345L;
		 
		Double moneyToAdd = 50D;
		
		Account account1 = new Account();
		account1.setAccountNo(1234L);
		account1.setAccountType("Savings");
		account1.setOpeningDate("2022-01-01");
		account1.setIfsc("ajm109106");
		account1.setBranch("ajm");
		account1.setBalance(5000.0);
		
		when(admservice.getLoginStatus(adminId)).thenReturn(true);
		when(admservice.getLoginStatus(adminId2)).thenReturn(false);
		when(accservice.getSingleAccount(1234L)).thenReturn(Optional.of(account1));
		when(accservice.addMoney(account1, moneyToAdd)).thenReturn("Money added!");
		
		ResponseEntity<String> re = admcontroller.addMoney(adminId, 1234L, moneyToAdd);
		ResponseEntity<String> re2 = admcontroller.addMoney(adminId2, 1234L, moneyToAdd);
		
		verify(accservice, times(1)).addMoney(account1, moneyToAdd);
//		System.out.println(account1.getBalance());
		assertEquals(HttpStatus.OK, re.getStatusCode());
		assertEquals(HttpStatus.BAD_REQUEST, re2.getStatusCode());
		assertEquals(re2.getBody(), "Authentication Failed!");
		 
		
		
		
		
	}

	@Test
	void testDeleteAcount() throws ResourceNotFoundException {
		Long adminId = 123L;
		Long adminId2 = 345L;
		
		Account account1 = new Account();
		account1.setAccountNo(1234L);
		account1.setAccountType("Savings");
		account1.setOpeningDate("2022-01-01");
		account1.setIfsc("ajm109106");
		account1.setBranch("ajm");
		account1.setBalance(5000.0);
		
		when(admservice.getLoginStatus(adminId)).thenReturn(true);
		when(admservice.getLoginStatus(adminId2)).thenReturn(false);
		
		
		when(accservice.getSingleAccount(1234L)).thenReturn(Optional.of(account1));
		doNothing().when(accservice).deleteAccount(1234L);
		
		ResponseEntity<Map<String, Boolean>> response=admcontroller.deleteAcount(adminId, 1234L);
		ResponseEntity<Map<String, Boolean>> re2=admcontroller.deleteAcount(adminId2, 1234L);
		
		assertTrue(response.getBody().containsKey("deleted"));
		assertTrue(response.getBody().get("deleted"));
		assertTrue(re2.getBody().containsKey("Admin not authenticated"));
		assertFalse(re2.getBody().get("Admin not authenticated"));
	}

	@Test
	void testValidateCustomer() throws JsonMappingException, JsonProcessingException, ResourceNotFoundException {
		
		Long adminId = 123L;
		Long adminId2 = 345L;
		Long custId1 = 1L;
		Long custId2 = 2L;
		
		
		
        String validationData = "{\"custId\": 1, \"setValidate\": true}";
        
        //Create a customer that needs validation
        Customer cust = new Customer();
        cust.setUserId(1L);
        cust.setPassword("123");
        cust.setAadhar("111122223333");
        cust.setEmail("123@gmail.com");
        cust.setName("John");
        cust.setMobile(1234567890);
        cust.setDob("2000-11-11");
        cust.setAdmin(false);
        cust.setValidCustomer(false);
        cust.setOptForNetBanking(true);
        cust.setRights(false);
        cust.setOccType("ABC");
        cust.setGrossAnnualIncome(1234L);
        cust.setIncomeSource("");
        cust.setFathername("Father");
        cust.setMothername("Mother");
        
		when(custservice.getSingleCustomer(custId1)).thenReturn(Optional.of(cust));
		when(admservice.getLoginStatus(adminId)).thenReturn(true);
		when(admservice.getLoginStatus(custId2)).thenReturn(false);
		
		ResponseEntity<Customer> re = admcontroller.validateCustomer(adminId, validationData);
		ResponseEntity<Customer> re2 = admcontroller.validateCustomer(adminId2, validationData);
		
		assertNull(re2.getBody());
		assertEquals(HttpStatus.OK, re.getStatusCode());
//		
		
		
	}

}
