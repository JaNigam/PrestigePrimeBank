package com.wellsfargo.training.ppb.model;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

import com.fasterxml.jackson.annotation.JsonFormat;

//import org.hibernate.validator.constraints.Length;

import jakarta.persistence.*;
//import jakarta.validation.constraints.Email;

@Entity
@Table(name="customers")
public class Customer {
	
	@Id
	@Column(nullable=false)
	private Long userId;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private String password;

	@Column(unique=true)
	private long mobile;

//	@Email(message = "email must be valid")
	@Column(unique=true)
	private String email;

	@Column(unique=true)
	private String aadhar;

	@JsonFormat(pattern="yyyy-MM-dd")
	@Column(nullable = false)
	private String dob;

	/*
	 * mappedby value should be same as foreign key mentioned in the other table*/
	@OneToOne(mappedBy = "userId", cascade=CascadeType.ALL)
	private CurrentAddress currentAddress;
	
	@OneToOne(mappedBy = "userId", cascade=CascadeType.ALL)
	private PermanentAddress permanentAddress;

	private String fathername;

	private String mothername;

	public Customer() {
		// TODO Auto-generated constructor stub
	}

	//constructor only for customer
	public Customer(Long userId, String name, String password, long mobile, String email, String aadhar, String dob,
			String fathername, String mothername) {
		super();
		this.userId = userId;
		this.name = name;
		this.password = password;
		this.mobile = mobile;
		this.email = email;
		this.aadhar = aadhar;
		this.dob = dob;
		this.fathername = fathername;
		this.mothername = mothername;
	}
	
	//constructor for permanent and current address
	public Customer(Long userId, String name, String password, long mobile, String email, String aadhar, String dob,
			CurrentAddress currentAddress, PermanentAddress permanentAddress, String fathername, String mothername) {
		super();
		this.userId = userId;
		this.name = name;
		this.password = password;
		this.mobile = mobile;
		this.email = email;
		this.aadhar = aadhar;
		this.dob = dob;
		this.currentAddress = currentAddress;
		this.permanentAddress = permanentAddress;
		this.fathername = fathername;
		this.mothername = mothername;
	}

	

	public Long getUserId() {
		return userId;
	}

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
		
		Base64.Encoder encoder = Base64.getEncoder();  
        String normalString = password;
        String encodedString = encoder.encodeToString(   // encrypt password in database field
        normalString.getBytes(StandardCharsets.UTF_8) );
        this.password = encodedString;
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

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}

	public CurrentAddress getCurrentAddress() {
		return currentAddress;
	}

	public void setCurrentAddress(CurrentAddress currentAddress) {
		this.currentAddress = currentAddress;
	}

	public PermanentAddress getPermanentAddress() {
		return permanentAddress;
	}

	public void setPermanentAddress(PermanentAddress permanentAddress) {
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
	
	
	

}