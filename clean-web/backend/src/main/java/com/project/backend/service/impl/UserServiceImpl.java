package com.project.backend.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.backend.exception.ResourceNotFoundException;
import com.project.backend.model.User;
import com.project.backend.repository.UserRepository;
import com.project.backend.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    
    @Override
    @Transactional
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User getUserByWalletAddress(String walletAddress) {
        return userRepository.findByWalletAddress(walletAddress)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with wallet address: " + walletAddress));
    }

    @Override
    @Transactional
    public User updateUser(String walletAddress, User userDetails) {
        User user = getUserByWalletAddress(walletAddress);
        
        user.setFullname(userDetails.getFullname());
        user.setEmail(userDetails.getEmail());
        user.setPhoneNumber(userDetails.getPhoneNumber());
        user.setBirthday(userDetails.getBirthday());
        user.setAddress(userDetails.getAddress());
        
        return userRepository.save(user);
    }

    @Override
    @Transactional
    public void deleteUser(String walletAddress) {
        User user = getUserByWalletAddress(walletAddress);
        userRepository.delete(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public List<User> getUsersByRole(User.Role role) {
        return userRepository.findByRole(role);
    }
} 