package com.wellsfargo.training.ppb.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;


import com.wellsfargo.training.ppb.model.Admin;
import com.wellsfargo.training.ppb.service.AdminService;

class AdminControllerTest {

	//Since testing the admin controller
	@Autowired
	private AdminController admcontroller;
	
	@MockBean
	private AdminService admservice;
	
	Admin admin;
	
	@BeforeEach
	void setUp() throws Exception {
		admin = new Admin();
	}

	@AfterEach
	void tearDown() throws Exception {
		admin = null;
	}

	@Test
	void testCreateAdmin() {
		
		//setting an admin values
		admin.setUserId(123L);
		admin.setPassword("password@123");
		
		when(admservice.saveAdmin(any(Admin.class))).thenReturn("New Admin created successfully");
		
		String result = admcontroller.createAdmin(admin);
		
		assertEquals(result, "New Admin Created Successfully");
//		verify(admservice,times(1)).saveAdmin(any(Admin.class));
		
		
		
		
	}

	@Test
	void testLoginAdmin() {
		fail("Not yet implemented");
	}

	@Test
	void testGetAllAccounts() {
		fail("Not yet implemented");
	}

	@Test
	void testLogoutAdmin() {
		fail("Not yet implemented");
	}

	@Test
	void testDeleteCustomerAndAccounts() {
		fail("Not yet implemented");
	}

	@Test
	void testCreateAccount() {
		fail("Not yet implemented");
	}

	@Test
	void testUpdateAccount() {
		fail("Not yet implemented");
	}

	@Test
	void testAddMoney() {
		fail("Not yet implemented");
	}

	@Test
	void testDeleteAcount() {
		fail("Not yet implemented");
	}

	@Test
	void testValidateCustomer() {
		fail("Not yet implemented");
	}

}
