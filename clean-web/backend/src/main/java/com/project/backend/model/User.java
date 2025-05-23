package com.project.backend.model;
import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)

public class User {
    @Id
    String walletAddress;
    String fullname;
    String email;
    String phoneNumber;
    LocalDate birthday;
    String address;
    boolean isDeleted;      
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    Role role;
    
    @Column(name = "created_date")
    LocalDateTime createdDate;
    
    @PrePersist
    protected void onCreate() {
        createdDate = LocalDateTime.now();
    }

    public enum Role {
        FARMER,
        TRANSPORTER,    
        INSPECTOR,
    }
}
