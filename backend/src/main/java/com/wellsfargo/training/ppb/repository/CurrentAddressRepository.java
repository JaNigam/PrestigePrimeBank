package com.wellsfargo.training.ppb.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wellsfargo.training.ppb.model.CurrentAddress;
import java.util.Optional;

public interface CurrentAddressRepository extends JpaRepository<CurrentAddress, Long> {

	Optional<CurrentAddress> findByUserIdUserId(Long customerId);
}
