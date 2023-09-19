package com.wellsfargo.training.ppb.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Transaction {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long transactionId;
	private String transactionType;
	private Double amount;
	private Long senderAccNo;
	private Long recieverAccNo;
	private String timeStamp;
	
	@ManyToOne
	@JoinColumn(name = "accno")
	private Account account;

	public Long getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(Long transactionId) {
		this.transactionId = transactionId;
	}

	public String getTransactionType() {
		return transactionType;
	}

	public void setTransactionType(String transactionType) {
		this.transactionType = transactionType;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public Long getSenderAccNo() {
		return senderAccNo;
	}

	public void setSenderAccNo(Long senderAccNo) {
		this.senderAccNo = senderAccNo;
	}

	public Long getRecieverAccNo() {
		return recieverAccNo;
	}

	public void setRecieverAccNo(Long recieverAccNo) {
		this.recieverAccNo = recieverAccNo;
	}

	public String getTimeStamp() {
		return timeStamp;
	}

	public void setTimeStamp(String timeStamp) {
		this.timeStamp = timeStamp;
	}

	public Account getAccount() {
		return account;
	}

	public void setAccount(Account account) {
		this.account = account;
	}
	
	
	

}
