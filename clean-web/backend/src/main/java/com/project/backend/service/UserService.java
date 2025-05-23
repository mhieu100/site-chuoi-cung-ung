package com.project.backend.service;

import java.util.List;

import com.project.backend.model.User;

public interface UserService {
    
    /**
     * Create a new user
     * 
     * @param user The user to create
     * @return The created user
     */
    User createUser(User user);
    
    /**
     * Get a user by wallet address
     * 
     * @param walletAddress The wallet address
     * @return The user if found
     */
    User getUserByWalletAddress(String walletAddress);
    
    /**
     * Update an existing user
     * 
     * @param walletAddress The wallet address
     * @param user The updated user data
     * @return The updated user
     */
    User updateUser(String walletAddress, User user);
    
    /**
     * Delete a user
     * 
     * @param walletAddress The wallet address
     */
    void deleteUser(String walletAddress);
    
    /**
     * Get all users
     * 
     * @return List of all users
     */
    List<User> getAllUsers();
    
    /**
     * Get users by role
     * 
     * @param role The role to filter by
     * @return List of users with the specified role
     */
    List<User> getUsersByRole(User.Role role);
} 