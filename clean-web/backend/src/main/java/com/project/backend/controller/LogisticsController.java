package com.project.backend.controller;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.backend.dto.LogisticsDTO;
import com.project.backend.dto.LogisticsDataDTO;
import com.project.backend.model.Logistics;
import com.project.backend.model.ProductLot;
import com.project.backend.model.User;
import com.project.backend.repository.LogisticsRepository;
import com.project.backend.repository.ProductLotRepository;
import com.project.backend.repository.UserRepository;
import com.project.backend.service.BlockchainService;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/logistics")
@Slf4j
public class LogisticsController {

    @Autowired
    private LogisticsRepository logisticsRepository;
    
    @Autowired
    private ProductLotRepository productLotRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private BlockchainService blockchainService;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    @PostMapping("/create")
    public ResponseEntity<?> createLogisticsEntry(@RequestBody LogisticsDTO logisticsDTO, HttpSession session) {
        try {
            String walletAddress = (String) session.getAttribute("walletAddress");
            // Get the current user (transporter)
            User transporter = userRepository.findByWalletAddress(walletAddress)
                .orElseThrow(() -> new RuntimeException("User not found"));
            
            // Find the product lot
            ProductLot productLot = productLotRepository.findById(UUID.fromString(logisticsDTO.getProductLotId()))
                .orElseThrow(() -> new RuntimeException("Product lot not found"));
            
            // Create new logistics entry
            Logistics logistics = Logistics.builder()
                .productLot(productLot)
                .transporter(transporter)
                .departedAt(LocalDateTime.now())
                .destinationAddress(logisticsDTO.getDestinationAddress())
                .notes(logisticsDTO.getNotes())
                .build();
            // Initialize empty temperature log as JSON
            logistics.setTempLog("[]");
            
            // Save to database
            Logistics savedLogistics = logisticsRepository.save(logistics);
            
            // Update product lot status
            productLot.setStatus(ProductLot.ProductLotStatus.TRANSPORTED);
            productLotRepository.save(productLot);
            
            // Record to blockchain
            String txHash = blockchainService.recordLogisticsCreation(savedLogistics);
            
            return ResponseEntity.ok(Map.of(
                "message", "Logistics entry created successfully",
                "id", savedLogistics.getId(),
                "blockchainTxHash", txHash
            ));
        } catch (Exception e) {
            log.error("Error creating logistics entry", e);
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @PutMapping("/{id}/add-data")
    public ResponseEntity<?> addLogisticsData(@PathVariable UUID id, @RequestBody LogisticsDataDTO dataDTO, HttpSession session) {
        try {
            // Find the logistics entry
            Logistics logistics = logisticsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Logistics entry not found"));
            
                String walletAddress = (String) session.getAttribute("walletAddress");
                
            // Verify the current user is the transporter
            User transporter = userRepository.findByWalletAddress(walletAddress)
                .orElseThrow(() -> new RuntimeException("User not found"));
            
            if (!logistics.getTransporter().getWalletAddress().equals(transporter.getWalletAddress())) {
                return ResponseEntity.badRequest().body(Map.of("error", "You are not authorized to update this logistics entry"));
            }
            
            // Update temperature log
            // First, parse existing logs
            String tempLog = logistics.getTempLog();
            LogisticsDataDTO[] existingLogs;
            try {
                if (tempLog == null || tempLog.equals("[]")) {
                    existingLogs = new LogisticsDataDTO[0];
                } else {
                    existingLogs = objectMapper.readValue(tempLog, LogisticsDataDTO[].class);
                }
            } catch (JsonProcessingException e) {
                existingLogs = new LogisticsDataDTO[0];
            }
            
            // Create a new array with the new log
            LogisticsDataDTO[] newLogs = new LogisticsDataDTO[existingLogs.length + 1];
            System.arraycopy(existingLogs, 0, newLogs, 0, existingLogs.length);
            newLogs[existingLogs.length] = dataDTO;
            
            // Serialize back to JSON
            logistics.setTempLog(objectMapper.writeValueAsString(newLogs));
            
            // If this is a delivery completion, set arrived time
            if (dataDTO.isDeliveryCompleted()) {
                logistics.setArrivedAt(LocalDateTime.now());
            }
            
            // Save to database
            Logistics updatedLogistics = logisticsRepository.save(logistics);
            
            // Record to blockchain
            String txHash = blockchainService.recordLogisticsData(updatedLogistics, dataDTO);
            
            return ResponseEntity.ok(Map.of(
                "message", "Logistics data added successfully",
                "blockchainTxHash", txHash
            ));
        } catch (Exception e) {
            log.error("Error adding logistics data", e);
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/product/{productLotId}")
    public ResponseEntity<?> getLogisticsByProductLot(@PathVariable UUID productLotId) {
        try {
            // Find the product lot
            ProductLot productLot = productLotRepository.findById(productLotId)
                .orElseThrow(() -> new RuntimeException("Product lot not found"));
            
            // Find all logistics entries for this product lot
            Iterable<Logistics> logistics = logisticsRepository.findByProductLotId(productLotId);
            
            return ResponseEntity.ok(logistics);
        } catch (Exception e) {
            log.error("Error retrieving logistics entries", e);
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping
    public ResponseEntity<?> getAllLogistics() {
        try {
            // Lấy tất cả các đơn vận chuyển
            Iterable<Logistics> logistics = logisticsRepository.findAll();
            
            return ResponseEntity.ok(logistics);
        } catch (Exception e) {
            log.error("Error retrieving all logistics entries", e);
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
} 