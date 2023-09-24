package com.wellsfargo.training.ppb.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.wellsfargo.training.ppb.model.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
	@Query("SELECT t FROM Transaction t WHERE t.account.id = :accountNo AND t.timeStamp BETWEEN :startDate AND :endDate")
    List<Transaction> findTransactionsBetweenDates(@Param("accountNo") Long accountNo, @Param("startDate") Date startDate, @Param("endDate") Date endDate);
	
	@Query("SELECT t FROM Transaction t WHERE t.account.id = :accountNo" )
    List<Transaction> findAllTransactions(@Param("accountNo") Long accountNo);

}
