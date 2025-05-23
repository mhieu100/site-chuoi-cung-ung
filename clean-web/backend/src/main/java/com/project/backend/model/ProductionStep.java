package com.project.backend.model;

import java.time.LocalDateTime;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name = "production_step")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class ProductionStep {

    @Id
    @GeneratedValue
    UUID id;

    @ManyToOne
    @JoinColumn(name = "product_lot_id")
    @JsonIgnoreProperties({"productionSteps"})
    ProductLot productLot;

    @Enumerated(EnumType.STRING)
    @Column(name = "step_type", nullable = false)
    StepType stepType;

    String description;

    @Column(name = "photo_url")
    String photoUrl;

    @Column(name = "created_at")
    LocalDateTime createdAt;
    
    @Column(name = "blockchain_tx_hash")
    String blockchainTxHash;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public enum StepType {
        WATERING,
        FERTILIZING,
        PEST_CONTROL,
        PRUNING,
        HARVESTING,
        WEATHER_RECORD,
        OTHER
    }
} 