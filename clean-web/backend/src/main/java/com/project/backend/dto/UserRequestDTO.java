package com.project.backend.dto;

import java.time.LocalDate;

import com.project.backend.model.User.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRequestDTO {
    private String walletAddress;
    private String fullname;
    private String email;
    private String phoneNumber;
    private LocalDate birthday;
    private String address;
    private Role role;
}
