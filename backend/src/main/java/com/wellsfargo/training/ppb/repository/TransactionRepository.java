package com.wellsfargo.training.ppb.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wellsfargo.training.ppb.model.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

}
