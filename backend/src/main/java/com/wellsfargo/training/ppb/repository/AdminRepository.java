package com.wellsfargo.training.ppb.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wellsfargo.training.ppb.model.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {
//	public Optional<Admin>findById(Long userId);
}
