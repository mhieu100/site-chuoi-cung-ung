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
import com.project.backend.model.User;
import com.project.backend.service.ProductLotService;
import com.project.backend.service.UserService;

@RestController
@RequestMapping("/product-lots")
public class ProductLotController {

    @Autowired
    private ProductLotService productLotService;
    
    @Autowired
    private UserService userService;
    
    @PostMapping
    public ResponseEntity<ProductLot> createProductLot(@RequestBody ProductLot productLot) {
        ProductLot createdProductLot = productLotService.createProductLot(productLot);
        return new ResponseEntity<>(createdProductLot, HttpStatus.CREATED);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ProductLot> getProductLotById(@PathVariable UUID id) {
        ProductLot productLot = productLotService.getProductLotById(id);
        return ResponseEntity.ok(productLot);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ProductLot> updateProductLot(
            @PathVariable UUID id, 
            @RequestBody ProductLot productLot) {
        ProductLot updatedProductLot = productLotService.updateProductLot(id, productLot);
        return ResponseEntity.ok(updatedProductLot);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductLot(@PathVariable UUID id) {
        productLotService.deleteProductLot(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping
    public ResponseEntity<List<ProductLot>> getAllProductLots(
            @RequestParam(required = false) String farmerWalletAddress,
            @RequestParam(required = false) ProductLot.ProductLotStatus status,
            @RequestParam(required = false) String cropType) {
        
        List<ProductLot> productLots;
        
        if (farmerWalletAddress != null) {
            User farmer = userService.getUserByWalletAddress(farmerWalletAddress);
            productLots = productLotService.getProductLotsByFarmer(farmer);
        } else if (status != null) {
            productLots = productLotService.getProductLotsByStatus(status);
        } else if (cropType != null) {
            productLots = productLotService.getProductLotsByCropType(cropType);
        } else {
            productLots = productLotService.getAllProductLots();
        }
        
        return ResponseEntity.ok(productLots);
    }
    
    @GetMapping("/{id}/verify")
    public ResponseEntity<Boolean> verifyProductLotIntegrity(@PathVariable UUID id) {
        boolean isVerified = productLotService.verifyProductLotIntegrity(id);
        return ResponseEntity.ok(isVerified);
    }

    @PutMapping("/{id}/complete-production")
    public ResponseEntity<ProductLot> completeProduction(@PathVariable UUID id) {
        ProductLot completedProductLot = productLotService.completeProduction(id);
        return ResponseEntity.ok(completedProductLot);
    }

    @PutMapping("/{id}/request-transported")
    public ResponseEntity<ProductLot> requestTransported(@PathVariable UUID id) {
        ProductLot transportedProductLot = productLotService.requestTransported(id);
        return ResponseEntity.ok(transportedProductLot);
    }
} 