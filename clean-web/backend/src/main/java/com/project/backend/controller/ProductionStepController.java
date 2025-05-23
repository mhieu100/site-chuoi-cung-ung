package com.project.backend.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.backend.model.ProductLot;
import com.project.backend.model.ProductionStep;
import com.project.backend.model.ProductionStep.StepType;
import com.project.backend.service.ProductLotService;
import com.project.backend.service.ProductionStepService;

@RestController
@RequestMapping("/production-steps")
public class ProductionStepController {

    @Autowired
    private ProductionStepService productionStepService;
    
    @Autowired
    private ProductLotService productLotService;
    
    @PostMapping
    public ResponseEntity<ProductionStep> createProductionStep(@RequestBody ProductionStep productionStep) {
        ProductionStep createdStep = productionStepService.createProductionStep(productionStep);
        return new ResponseEntity<>(createdStep, HttpStatus.CREATED);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ProductionStep> getProductionStepById(@PathVariable UUID id) {
        ProductionStep productionStep = productionStepService.getProductionStepById(id);
        return ResponseEntity.ok(productionStep);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ProductionStep> updateProductionStep(
            @PathVariable UUID id, 
            @RequestBody ProductionStep productionStep) {
        ProductionStep updatedStep = productionStepService.updateProductionStep(id, productionStep);
        return ResponseEntity.ok(updatedStep);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductionStep(@PathVariable UUID id) {
        productionStepService.deleteProductionStep(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping
    public ResponseEntity<List<ProductionStep>> getAllProductionSteps(
            @RequestParam(required = false) UUID productLotId,
            @RequestParam(required = false) StepType stepType,
            @RequestParam(required = false, defaultValue = "false") boolean sortByTimeDesc) {
        
        List<ProductionStep> steps;
        
        if (productLotId != null && stepType != null) {
            ProductLot productLot = productLotService.getProductLotById(productLotId);
            steps = productionStepService.getProductionStepsByProductLotAndType(productLot, stepType);
        } else if (productLotId != null) {
            ProductLot productLot = productLotService.getProductLotById(productLotId);
            
            if (sortByTimeDesc) {
                steps = productionStepService.getProductionStepsByProductLotOrderByTimeDesc(productLot);
            } else {
                steps = productionStepService.getProductionStepsByProductLot(productLot);
            }
        } else if (stepType != null) {
            steps = productionStepService.getProductionStepsByType(stepType);
        } else {
            steps = productionStepService.getAllProductionSteps();
        }
        
        return ResponseEntity.ok(steps);
    }
    
    @GetMapping("/{id}/verify")
    public ResponseEntity<Boolean> verifyProductionStepIntegrity(@PathVariable UUID id) {
        boolean isVerified = productionStepService.verifyProductionStepIntegrity(id);
        return ResponseEntity.ok(isVerified);
    }
    
    // Endpoint mới: Cập nhật bước trong quá trình
    @PostMapping("/product-lots/{productLotId}/process-step")
    public ResponseEntity<ProductionStep> updateProcessStep(
            @PathVariable UUID productLotId,
            @RequestBody ProductionStep stepInfo) {
        
        // Lấy ProductLot theo ID
        ProductLot productLot = productLotService.getProductLotById(productLotId);
        
        // Gán ProductLot vào bước
        stepInfo.setProductLot(productLot);
        
        // Tạo bước mới với thông tin được cung cấp
        ProductionStep createdStep = productionStepService.createProductionStep(stepInfo);
        
        return new ResponseEntity<>(createdStep, HttpStatus.CREATED);
    }
} 