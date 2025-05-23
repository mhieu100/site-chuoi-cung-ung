package com.project.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.backend.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByWalletAddress(String walletAddress);
    List<User> findByRole(User.Role role);
}
