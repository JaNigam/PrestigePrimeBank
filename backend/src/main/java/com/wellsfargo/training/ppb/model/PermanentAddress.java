package com.wellsfargo.training.ppb.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

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
public class PermanentAddress {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long addressId;
	private @NonNull String addressLine1;
	private @NonNull String addressLine2;
	private @NonNull String pincode;
	private @NonNull String city;
	private @NonNull String state;
	private String Landmark;
	
	
	//foreign key
	@OneToOne
	@JoinColumn(name="user_id")
	@JsonBackReference
	private Customer userId;


	public PermanentAddress(Long addressId, @NonNull String addressLine1, @NonNull String addressLine2,
			@NonNull String pincode, @NonNull String city, @NonNull String state, String landmark, Customer userId) {
		super();
		this.addressId = addressId;
		this.addressLine1 = addressLine1;
		this.addressLine2 = addressLine2;
		this.pincode = pincode;
		this.city = city;
		this.state = state;
		Landmark = landmark;
		this.userId = userId;
	}

	
	
	

}
