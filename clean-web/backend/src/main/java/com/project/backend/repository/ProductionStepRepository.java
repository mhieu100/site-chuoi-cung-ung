package com.project.backend.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.backend.model.ProductLot;
import com.project.backend.model.ProductionStep;
import com.project.backend.model.ProductionStep.StepType;

@Repository
public interface ProductionStepRepository extends JpaRepository<ProductionStep, UUID> {
    List<ProductionStep> findByProductLot(ProductLot productLot);
    List<ProductionStep> findByProductLotOrderByCreatedAtDesc(ProductLot productLot);
    List<ProductionStep> findByStepType(StepType stepType);
    List<ProductionStep> findByProductLotAndStepType(ProductLot productLot, StepType stepType);
} 