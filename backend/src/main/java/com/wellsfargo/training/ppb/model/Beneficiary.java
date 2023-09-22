package com.wellsfargo.training.ppb.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class Beneficiary {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long beneficiaryId;
	
	private Long beneficiaryAccNo;
	
	private String beneficiaryName;
	private String beneficiaryNickName;
	
	/*
	 * Many to One relationship with Customer table
	 * Since a customer can have many beneficiaries
	 * */
	@ManyToOne
	@JoinColumn(name="userId")
	private Customer customer;
	


}
