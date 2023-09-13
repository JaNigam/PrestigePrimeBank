package com.wellsfargo.training.ppb.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
@Entity
public class CurrentAddress {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long addressId;
	private @NonNull String street;
	private @NonNull String city;
	private @NonNull String state;
	private int pincode;
	
	//foreign key
	@OneToOne
	@JoinColumn(name="userId")
	private Customer userId;

	public CurrentAddress(Long addressId, @NonNull String street, @NonNull String city, @NonNull String state,
			int pincode, Customer userId) {
		super();
		this.addressId = addressId;
		this.street = street;
		this.city = city;
		this.state = state;
		this.pincode = pincode;
		
	}
	
	
	
	

}
