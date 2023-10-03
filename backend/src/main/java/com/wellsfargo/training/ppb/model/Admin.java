package com.wellsfargo.training.ppb.model;

import jakarta.persistence.*;

@Entity
public class Admin {

	@Id
	private Long userId;
	private String password;
	private Boolean isLoggedIn=false;
	
	public Boolean getIsLoggedIn() {
		return isLoggedIn;
	}
	public void setIsLoggedIn(Boolean isLoggedIn) {
		this.isLoggedIn = isLoggedIn;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	
}
