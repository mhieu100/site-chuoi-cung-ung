package com.project.backend.model;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "logistics")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Logistics {

    @Id
    @GeneratedValue
    UUID id;

    @ManyToOne
    @JoinColumn(name = "product_lot_id")
    ProductLot productLot;

    @ManyToOne
    @JoinColumn(name = "transporter_id")
    User transporter;

    @Column(name = "temp_log", columnDefinition = "json")
    String tempLog;

    @Column(name = "destination_address")
    String destinationAddress;

    @Column(name = "notes")
    String notes;

    @Column(name = "departed_at")
    LocalDateTime departedAt;

    @Column(name = "arrived_at")
    LocalDateTime arrivedAt;
    
    @Column(name = "created_date")
    LocalDateTime createdDate;
    
    @PrePersist
    protected void onCreate() {
        createdDate = LocalDateTime.now();
    }
} 