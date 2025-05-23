package com.project.backend.controller;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.web3j.protocol.core.methods.response.TransactionReceipt;

import com.project.backend.model.Inspection;
import com.project.backend.model.ProductLot;
import com.project.backend.model.User;
import com.project.backend.model.Inspection.Result;
import com.project.backend.repository.InspectionRepository;
import com.project.backend.repository.ProductLotRepository;
import com.project.backend.repository.UserRepository;
import com.project.backend.service.BlockchainService;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/inspection")
@Slf4j
public class InspectionController {

    @Autowired
    private InspectionRepository inspectionRepository;

    @Autowired
    private ProductLotRepository productLotRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BlockchainService blockchainService;

    @PostMapping("/verify/{productLotId}")
    public ResponseEntity<?> verifyProduct(
            @PathVariable UUID productLotId,
            @RequestParam("result") String resultStr,
            @RequestParam(value = "notes", required = false) String notes,
            HttpSession session) {

        try {
            String walletAddress = (String) session.getAttribute("walletAddress");

            // Get the current user (inspector)
            User inspector = userRepository.findByWalletAddress(walletAddress)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Validate user is an inspector
            if (inspector.getRole() != User.Role.INSPECTOR) {
                return ResponseEntity.badRequest().body(Map.of("error", "Only inspectors can verify products"));
            }

            // Find the product lot
            ProductLot productLot = productLotRepository.findById(productLotId)
                    .orElseThrow(() -> new RuntimeException("Product lot not found"));

            // Parse result
            Result result = "PASS".equalsIgnoreCase(resultStr) ? Result.PASS : Result.FAIL;

            // Update product lot status if passed
            if (result == Result.PASS) {
                System.out.println(result);
                productLot.setStatus(ProductLot.ProductLotStatus.VERIFIED);
                productLotRepository.save(productLot);
            }

            // Create inspection record
            Inspection inspection = Inspection.builder()
                    .productLot(productLot)
                    .inspector(inspector)
                    .result(result)
                    .verifiedAt(LocalDateTime.now())
                    .build();

            // Save to database
            Inspection savedInspection = inspectionRepository.save(inspection);

            // Record to blockchain
            TransactionReceipt txReceipt = blockchainService.verifyProduct(
                    productLotId.toString(),
                    inspector.getFullname(),
                    result.toString(),
                    notes);

            String txHash = txReceipt.getTransactionHash();

            return ResponseEntity.ok(Map.of(
                    "message", "Product verification recorded successfully",
                    "id", savedInspection.getId(),
                    "blockchainTxHash", txHash));

        } catch (Exception e) {
            log.error("Error verifying product", e);
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/product/{productLotId}")
    public ResponseEntity<?> getInspectionsByProductLot(@PathVariable UUID productLotId) {
        try {
            // Find the product lot
            ProductLot productLot = productLotRepository.findById(productLotId)
                    .orElseThrow(() -> new RuntimeException("Product lot not found"));

            // Get inspections for this product lot
            Iterable<Inspection> inspections = inspectionRepository.findByProductLotId(productLotId);

            return ResponseEntity.ok(inspections);
        } catch (Exception e) {
            log.error("Error retrieving inspection records", e);
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}