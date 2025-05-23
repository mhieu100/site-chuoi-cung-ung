package com.project.backend.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.project.backend.exception.InvalidException;
import com.project.backend.model.User;
import com.project.backend.model.User.Role;
import com.project.backend.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthService {
    private final UserRepository userRepository;

    public User registerUser(User user) throws InvalidException {
        user.setRole(Role.FARMER);
        return userRepository.save(user);
    }

    public User loginUser(String walletAddress) throws InvalidException {
        Optional<User> currentUserDB = userRepository.findByWalletAddress(walletAddress);
        if (!currentUserDB.isPresent()) {
            throw new InvalidException("Not found user");
        }
        return currentUserDB.get();
    }
}
