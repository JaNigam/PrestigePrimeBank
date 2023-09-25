package com.wellsfargo.training.ppb.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.wellsfargo.training.ppb.model.Account;
import com.wellsfargo.training.ppb.model.Customer;

public interface AccountRepository extends JpaRepository<Account, Long>{
//	void deleteByUserId(Long userId);

//	@Modifying
//    @Query("DELETE Account a WHERE a.customer.userId = :userId")
//    void deleteByUserId(@Param("userId") Long userId);
	void deleteByCustomer(Customer customer);
	Account findByAccountNo(Long accountNo);
	
	Account findByCustomer(Customer customer);
}
