package com.project.backend.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.project.backend.model.User;
import com.project.backend.model.User.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDTO {
    private String walletAddress;
    private String fullname;
    private String email;
    private String phoneNumber;
    private LocalDate birthday;
    private String address;
    private Role role;
    private LocalDateTime createdDate;
    
    public static UserResponseDTO fromEntity(User user) {
        return UserResponseDTO.builder()
                .walletAddress(user.getWalletAddress())
                .fullname(user.getFullname())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .birthday(user.getBirthday())
                .address(user.getAddress())
                .role(user.getRole())
                .createdDate(user.getCreatedDate())
                .build();
    }
}
