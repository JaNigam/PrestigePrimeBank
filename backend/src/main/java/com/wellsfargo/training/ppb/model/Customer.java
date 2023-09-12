package com.wellsfargo.training.ppb.model;

//import org.hibernate.validator.constraints.Length;

import jakarta.persistence.*;
//import jakarta.validation.constraints.Email;

@Entity
public class Customer {
	
	@Id
	@Column(nullable=false)
	private Long userId;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private String password;

	@Column(nullable = false, unique=true)
	private long mobile;

//	@Email(message = "email must be valid")
	@Column(nullable = false, unique=true)
	private String email;

	@Column(nullable = false, unique=true)
	private String aadhar;

	@Column(nullable = false)
	private String dob;

	@Column(nullable=false)
	private String currentAddress;
	
	@Column(nullable=false)
	private String permanentAddress;

	private String fathername;

	private String mothername;
	
	

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}

	public String getCurrentAddress() {
		return currentAddress;
	}

	public void setCurrentAddress(String currentAddress) {
		this.currentAddress = currentAddress;
	}

	public String getPermanentAddress() {
		return permanentAddress;
	}

	public void setPermanentAddress(String permanentAddress) {
		this.permanentAddress = permanentAddress;
	}

	public String getFathername() {
		return fathername;
	}

	public void setFathername(String fathername) {
		this.fathername = fathername;
	}

	public String getMothername() {
		return mothername;
	}

	public void setMothername(String mothername) {
		this.mothername = mothername;
	}

	public Long getUserId() {
		return userId;
	}

	/*
	 * on creation of a new user automatically generate a new UID
	 * UID: 6 digit unique alpha numeric string
	 * should be mailed to the user
	 * */
	public void setUserId(Long userId) {
		
		this.userId = userId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public long getMobile() {
		return mobile;
	}

	public void setMobile(long mobile) {
		this.mobile = mobile;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAadhar() {
		return aadhar;
	}

	public void setAadhar(String aadhar) {
		this.aadhar = aadhar;
	}
}