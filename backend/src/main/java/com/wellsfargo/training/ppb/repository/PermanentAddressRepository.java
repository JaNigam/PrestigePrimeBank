package com.wellsfargo.training.ppb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

import com.wellsfargo.training.ppb.model.PermanentAddress;

public interface PermanentAddressRepository extends JpaRepository<PermanentAddress, Long> {

	 Optional<PermanentAddress> findByUserIdUserId(Long customerId);
}
