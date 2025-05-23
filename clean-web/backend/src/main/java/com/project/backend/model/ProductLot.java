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
@Table(name = "product_lot")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class ProductLot {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "product_name", nullable = false)
    private String productName;

    @Column(name = "crop_type", nullable = false)
    private String cropType;

    private Double weight;

    @Column(name = "planted_date")
    private LocalDateTime plantedDate;

    @Column(name = "harvest_date")
    private LocalDateTime harvestDate;

    private String location;

    @Column(name = "gps_coordinates")
    private String gpsCoordinates;

    @Column(name = "image_url")
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "farmer_id")
    @JsonIgnoreProperties({"productLots"})
    private User farmer;

    @Enumerated(EnumType.STRING)
    private ProductLotStatus status;

    @Column(name = "blockchain_tx_hash")
    private String blockchainTxHash;
    
    @Column(name = "created_date")
    private LocalDateTime createdDate;
    
    @PrePersist
    protected void onCreate() {
        createdDate = LocalDateTime.now();
    }

    public enum ProductLotStatus {
        CREATED,
        PRODUCTION_COMPLETED,
        REQUEST_TRANSPORTED,
        TRANSPORTED,
        VERIFIED,
        SOLD
    }
    
}
