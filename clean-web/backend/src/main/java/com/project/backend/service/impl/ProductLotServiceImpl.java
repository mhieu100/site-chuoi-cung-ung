package com.project.backend.service.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.web3j.protocol.core.methods.response.TransactionReceipt;

import com.project.backend.exception.ResourceNotFoundException;
import com.project.backend.model.ProductLot;
import com.project.backend.model.User;
import com.project.backend.repository.ProductLotRepository;
import com.project.backend.service.BlockchainService;
import com.project.backend.service.ProductLotService;
import com.project.backend.util.HashUtil;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ProductLotServiceImpl implements ProductLotService {

    @Autowired
    private ProductLotRepository productLotRepository;

    @Autowired
    private BlockchainService blockchainService;

    @Override
    @Transactional
    public ProductLot createProductLot(ProductLot productLot) {
        // Save to database first to get ID
        ProductLot savedProductLot = productLotRepository.save(productLot);

        try {
            // Generate hash of product lot data
            String dataHash = HashUtil.calculateSHA256Hash(savedProductLot);

            // Send to blockchain with empty IPFS hash (can be implemented later)
            TransactionReceipt receipt = blockchainService.addProductLotToBlockchain(
                    savedProductLot.getId().toString(),
                    dataHash,
                    "" // empty IPFS hash for now
            );

            // Update with blockchain transaction hash
            savedProductLot.setBlockchainTxHash(receipt.getTransactionHash());
            return productLotRepository.save(savedProductLot);

        } catch (Exception e) {
            return savedProductLot;
        }
    }

    @Override
    public ProductLot getProductLotById(UUID id) {
        return productLotRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product lot not found with id: " + id));
    }

    @Override
    @Transactional
    public ProductLot updateProductLot(UUID id, ProductLot productLotDetails) {
        ProductLot productLot = getProductLotById(id);

        // Update all fields except ID
        productLot.setProductName(productLotDetails.getProductName());
        productLot.setCropType(productLotDetails.getCropType());
        productLot.setWeight(productLotDetails.getWeight());
        productLot.setPlantedDate(productLotDetails.getPlantedDate());
        productLot.setHarvestDate(productLotDetails.getHarvestDate());
        productLot.setLocation(productLotDetails.getLocation());
        productLot.setGpsCoordinates(productLotDetails.getGpsCoordinates());
        productLot.setImageUrl(productLotDetails.getImageUrl());
        productLot.setStatus(productLotDetails.getStatus());

        // Only update blockchain TxHash if it's null and the new one isn't
        if (productLot.getBlockchainTxHash() == null && productLotDetails.getBlockchainTxHash() != null) {
            productLot.setBlockchainTxHash(productLotDetails.getBlockchainTxHash());
        }

        return productLotRepository.save(productLot);
    }

    @Override
    @Transactional
    public void deleteProductLot(UUID id) {
        ProductLot productLot = getProductLotById(id);
        productLotRepository.delete(productLot);
    }

    @Override
    public List<ProductLot> getAllProductLots() {
        return productLotRepository.findAll();
    }

    @Override
    public List<ProductLot> getProductLotsByFarmer(User farmer) {
        return productLotRepository.findByFarmer(farmer);
    }

    @Override
    public List<ProductLot> getProductLotsByStatus(ProductLot.ProductLotStatus status) {
        return productLotRepository.findByStatus(status);
    }

    @Override
    public List<ProductLot> getProductLotsByCropType(String cropType) {
        return productLotRepository.findByCropType(cropType);
    }

    @Override
    public boolean verifyProductLotIntegrity(UUID id) {
        ProductLot productLot = getProductLotById(id);

        // If it doesn't have a blockchain hash, it can't be verified
        if (productLot.getBlockchainTxHash() == null) {
            return false;
        }

        try {
            // Calculate current hash
            String currentHash = HashUtil.calculateSHA256Hash(productLot);
            log.debug("Current hash for verification: {}", currentHash);

            // Verify against blockchain - sử dụng trực tiếp phương thức từ contract 
            return blockchainService.verifyProductLotData(
                    productLot.getId().toString(),
                    currentHash);
        } catch (Exception e) {
            log.error("Error verifying product lot integrity: {}", e.getMessage(), e);
            return false;
        }
    }

    @Override
    @Transactional
    public ProductLot completeProduction(UUID id) {
        ProductLot productLot = getProductLotById(id);
        productLot.setStatus(ProductLot.ProductLotStatus.PRODUCTION_COMPLETED); 
        return productLotRepository.save(productLot);
    }

    @Override
    public ProductLot requestTransported(UUID id) {
        ProductLot productLot = getProductLotById(id);
        productLot.setStatus(ProductLot.ProductLotStatus.REQUEST_TRANSPORTED);
        return productLotRepository.save(productLot);
    }
}