package com.project.backend.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.backend.model.Logistics;

@Repository
public interface LogisticsRepository extends JpaRepository<Logistics, UUID> {
    List<Logistics> findByProductLotId(UUID productLotId);
} 