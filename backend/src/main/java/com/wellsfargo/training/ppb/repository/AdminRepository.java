package com.wellsfargo.training.ppb.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.wellsfargo.training.ppb.model.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {
//	public Optional<Admin>findById(Long userId);
	@Modifying
    @Query("UPDATE Admin a SET a.isLoggedIn = :newFieldValue WHERE a.userId = :userId")
    void updateStatus(@Param("userId") Long userId, @Param("newFieldValue") Boolean status);
	
	@Query("SELECT a.isLoggedIn FROM Admin a WHERE a.userId = :userId")
    Boolean getLoginStatusById(Long userId);
}
