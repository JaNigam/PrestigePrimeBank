package com.wellsfargo.training.ppb.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


import com.wellsfargo.training.ppb.model.Account;

public interface AccountRepository extends JpaRepository<Account, Long>{
	void deleteByUserId(Long userId);

}
