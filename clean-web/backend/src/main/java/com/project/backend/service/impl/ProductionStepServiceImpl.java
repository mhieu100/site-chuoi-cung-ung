package com.project.backend.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.web3j.protocol.core.methods.response.TransactionReceipt;

import com.project.backend.exception.ResourceNotFoundException;
import com.project.backend.model.ProductLot;
import com.project.backend.model.ProductionStep;
import com.project.backend.model.ProductionStep.StepType;
import com.project.backend.repository.ProductionStepRepository;
import com.project.backend.service.BlockchainService;
import com.project.backend.service.ProductionStepService;
import com.project.backend.util.HashUtil;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ProductionStepServiceImpl implements ProductionStepService {

    @Autowired
    private ProductionStepRepository productionStepRepository;
    
    @Autowired
    private BlockchainService blockchainService;
    
    @Override
    @Transactional
    public ProductionStep createProductionStep(ProductionStep productionStep) {
        // Đảm bảo thời gian tạo
        if (productionStep.getCreatedAt() == null) {
            productionStep.setCreatedAt(LocalDateTime.now());
        }
        
        // Lưu vào cơ sở dữ liệu trước để lấy ID
        ProductionStep savedStep = productionStepRepository.save(productionStep);
        log.debug("Đã lưu ProductionStep với ID: {}", savedStep.getId());
        
        try {
            // Tạo hash của dữ liệu
            String dataHash = HashUtil.calculateSHA256Hash(savedStep);
            log.debug("Hash dữ liệu đã tạo: {}", dataHash);
            
            // Tạo JSON để gửi lên blockchain với thông tin chi tiết hơn
            StringBuilder stepInfoBuilder = new StringBuilder();
            stepInfoBuilder.append("{");
            stepInfoBuilder.append("\"stepId\":\"").append(savedStep.getId()).append("\",");
            stepInfoBuilder.append("\"type\":\"").append(savedStep.getStepType()).append("\",");
            stepInfoBuilder.append("\"description\":\"").append(savedStep.getDescription().replaceAll("\"", "\\\\\"")).append("\",");
            stepInfoBuilder.append("\"dataHash\":\"").append(dataHash).append("\",");
            stepInfoBuilder.append("\"timestamp\":\"").append(savedStep.getCreatedAt()).append("\"");
            stepInfoBuilder.append("}");
            
            String stepInfo = stepInfoBuilder.toString();
            log.debug("Thông tin bước sản xuất gửi lên blockchain: {}", stepInfo);
            
            // Gửi lên blockchain với phương thức mới
            TransactionReceipt receipt = blockchainService.addProductionStepToBlockchain(
                savedStep.getId().toString(),
                savedStep.getProductLot().getId().toString(),
                dataHash,
                savedStep.getPhotoUrl() != null ? savedStep.getPhotoUrl() : ""
            );
            
            // Cập nhật Transaction Hash
            String txHash = receipt.getTransactionHash();
            log.debug("Transaction Hash từ blockchain: {}", txHash);
            
            // Lưu transaction hash vào database
            savedStep.setBlockchainTxHash(txHash);
            return productionStepRepository.save(savedStep);
            
        } catch (Exception e) {
            log.error("Lỗi khi lưu ProductionStep lên blockchain: {}", e.getMessage(), e);
            // Vẫn trả về bước đã lưu ngay cả khi blockchain bị lỗi
            return savedStep;
        }
    }

    @Override
    public ProductionStep getProductionStepById(UUID id) {
        return productionStepRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy ProductionStep với id: " + id));
    }

    @Override
    @Transactional
    public ProductionStep updateProductionStep(UUID id, ProductionStep productionStepDetails) {
        ProductionStep productionStep = getProductionStepById(id);
        
        // Cập nhật các trường (giữ nguyên ID và ProductLot)
        productionStep.setStepType(productionStepDetails.getStepType());
        productionStep.setDescription(productionStepDetails.getDescription());
        productionStep.setPhotoUrl(productionStepDetails.getPhotoUrl());
        
        // Nếu blockchain_tx_hash là null, hãy cập nhật nó nếu có
        if (productionStep.getBlockchainTxHash() == null && productionStepDetails.getBlockchainTxHash() != null) {
            productionStep.setBlockchainTxHash(productionStepDetails.getBlockchainTxHash());
        }
        
        // Không cập nhật thời gian tạo
        
        return productionStepRepository.save(productionStep);
    }

    @Override
    @Transactional
    public void deleteProductionStep(UUID id) {
        ProductionStep productionStep = getProductionStepById(id);
        productionStepRepository.delete(productionStep);
    }

    @Override
    public List<ProductionStep> getAllProductionSteps() {
        return productionStepRepository.findAll();
    }

    @Override
    public List<ProductionStep> getProductionStepsByProductLot(ProductLot productLot) {
        return productionStepRepository.findByProductLot(productLot);
    }

    @Override
    public List<ProductionStep> getProductionStepsByProductLotOrderByTimeDesc(ProductLot productLot) {
        return productionStepRepository.findByProductLotOrderByCreatedAtDesc(productLot);
    }

    @Override
    public List<ProductionStep> getProductionStepsByType(StepType stepType) {
        return productionStepRepository.findByStepType(stepType);
    }

    @Override
    public List<ProductionStep> getProductionStepsByProductLotAndType(ProductLot productLot, StepType stepType) {
        return productionStepRepository.findByProductLotAndStepType(productLot, stepType);
    }

    @Override
    public boolean verifyProductionStepIntegrity(UUID id) {
        ProductionStep productionStep = getProductionStepById(id);
        
        // Nếu không có blockchain hash, không thể xác minh
        if (productionStep.getBlockchainTxHash() == null) {
            return false;
        }
        
        try {
            // Tính toán hash hiện tại
            String currentHash = HashUtil.calculateSHA256Hash(productionStep);
            log.debug("Hash hiện tại của ProductionStep: {}", currentHash);
            
            // Lấy productLotId để truy vấn quá trình từ blockchain
            String productLotId = productionStep.getProductLot().getId().toString();
            String stepId = productionStep.getId().toString();
            
            // Lấy danh sách các quá trình từ blockchain
            List<?> processLogs = blockchainService.getProcessLogsFromBlockchain(productLotId);
            log.debug("Số lượng process logs từ blockchain: {}", processLogs.size());
            
            // Tìm kiếm thông tin bước tương ứng
            for (Object log : processLogs) {
                // Sử dụng reflection để truy cập thuộc tính stepInfo từ ProcessLog
                String stepInfo = invokeGetter(log, "stepInfo");
                
                // Kiểm tra xem stepInfo có chứa stepId không
                if (stepInfo != null && stepInfo.contains(stepId)) {
                    // Kiểm tra xem stepInfo có chứa dataHash không
                    if (stepInfo.contains(currentHash)) {
                        return true;
                    }
                }
            }
            
            log.warn("Không tìm thấy thông tin cho ProductionStep ID {} trên blockchain", stepId);
            return false;
        } catch (Exception e) {
            log.error("Lỗi khi xác minh tính toàn vẹn của ProductionStep: {}", e.getMessage(), e);
            return false;
        }
    }
    
    // Helper method để gọi phương thức getter thông qua reflection
    private String invokeGetter(Object obj, String fieldName) {
        try {
            String getterName = "get" + fieldName.substring(0, 1).toUpperCase() + fieldName.substring(1);
            return (String) obj.getClass().getMethod(getterName).invoke(obj);
        } catch (Exception e) {
            log.error("Lỗi khi gọi getter cho {}: {}", fieldName, e.getMessage());
            return null;
        }
    }
} 