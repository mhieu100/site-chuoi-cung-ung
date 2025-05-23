package com.project.backend.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.backend.model.Inspection;

@Repository
public interface InspectionRepository extends JpaRepository<Inspection, UUID> {
    List<Inspection> findByProductLotId(UUID productLotId);
} 