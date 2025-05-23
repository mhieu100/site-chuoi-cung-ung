package com.project.backend.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.backend.model.ProductLot;
import com.project.backend.model.User;

@Repository
public interface ProductLotRepository extends JpaRepository<ProductLot, UUID> {
    List<ProductLot> findByFarmer(User farmer);
    List<ProductLot> findByStatus(ProductLot.ProductLotStatus status);
    List<ProductLot> findByCropType(String cropType);
} 