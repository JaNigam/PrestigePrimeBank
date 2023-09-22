package com.wellsfargo.training.ppb.model;


import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class Transaction {
	
//	@SequenceGenerator(name="product_seq", initialValue = 1000, allocationSize = 1)
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long transactionId;
	
	private String transactionType;
	private Double amount;
	private Long senderAccNo;
	private Long receiverAccNo;
	private String timeStamp;
	private String status;
	
	@ManyToOne
	@JoinColumn(name = "accountNo")
	private Account account;
	

}
