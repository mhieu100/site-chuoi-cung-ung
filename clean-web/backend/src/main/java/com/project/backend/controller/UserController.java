package com.project.backend.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.backend.dto.UserRequestDTO;
import com.project.backend.dto.UserResponseDTO;
import com.project.backend.model.User;
import com.project.backend.model.User.Role;
import com.project.backend.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;
    
    @PostMapping
    public ResponseEntity<UserResponseDTO> createUser(@RequestBody UserRequestDTO userRequestDTO) {
        User user = User.builder()
                .walletAddress(userRequestDTO.getWalletAddress())
                .fullname(userRequestDTO.getFullname())
                .email(userRequestDTO.getEmail())
                .phoneNumber(userRequestDTO.getPhoneNumber())
                .birthday(userRequestDTO.getBirthday())
                .address(userRequestDTO.getAddress())
                .role(userRequestDTO.getRole())
                .isDeleted(false)
                .build();
        
        User createdUser = userService.createUser(user);
        return new ResponseEntity<>(UserResponseDTO.fromEntity(createdUser), HttpStatus.CREATED);
    }
    
    @GetMapping("/{walletAddress}")
    public ResponseEntity<UserResponseDTO> getUserByWalletAddress(@PathVariable String walletAddress) {
        User user = userService.getUserByWalletAddress(walletAddress);
        return ResponseEntity.ok(UserResponseDTO.fromEntity(user));
    }
    
    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getAllUsers(
            @RequestParam(required = false) Role role) {
        List<User> users;
        
        if (role != null) {
            users = userService.getUsersByRole(role);
        } else {
            users = userService.getAllUsers();
        }
        
        List<UserResponseDTO> userResponseDTOs = users.stream()
                .map(UserResponseDTO::fromEntity)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(userResponseDTOs);
    }
    
    @PutMapping("/{walletAddress}")
    public ResponseEntity<UserResponseDTO> updateUser(
            @PathVariable String walletAddress,
            @RequestBody UserRequestDTO userRequestDTO) {
        User userDetails = User.builder()
                .fullname(userRequestDTO.getFullname())
                .email(userRequestDTO.getEmail())
                .phoneNumber(userRequestDTO.getPhoneNumber())
                .birthday(userRequestDTO.getBirthday())
                .address(userRequestDTO.getAddress())
                .build();
        
        User updatedUser = userService.updateUser(walletAddress, userDetails);
        return ResponseEntity.ok(UserResponseDTO.fromEntity(updatedUser));
    }
    
    @DeleteMapping("/{walletAddress}")
    public ResponseEntity<Void> deleteUser(@PathVariable String walletAddress) {
        userService.deleteUser(walletAddress);
        return ResponseEntity.noContent().build();
    }
}
