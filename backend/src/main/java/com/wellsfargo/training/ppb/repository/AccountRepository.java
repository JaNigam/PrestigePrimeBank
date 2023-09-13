package com.wellsfargo.training.ppb.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wellsfargo.training.ppb.model.Account;

public interface AccountRepository extends JpaRepository<Account, Long>{

}
