package com.project.backend.service;

import java.util.List;
import java.util.UUID;

import com.project.backend.model.ProductLot;
import com.project.backend.model.User;

public interface ProductLotService {
    
    /**
     * Create a new product lot
     * 
     * @param productLot The product lot to create
     * @return The created product lot with blockchain transaction hash
     */
    ProductLot createProductLot(ProductLot productLot);
    
    /**
     * Get a product lot by its ID
     * 
     * @param id The product lot ID
     * @return The product lot if found
     */
    ProductLot getProductLotById(UUID id);
    
    /**
     * Update an existing product lot
     * 
     * @param id The product lot ID
     * @param productLot The updated product lot data
     * @return The updated product lot
     */
    ProductLot updateProductLot(UUID id, ProductLot productLot);
    
    /**
     * Delete a product lot
     * 
     * @param id The product lot ID
     */
    void deleteProductLot(UUID id);
    
    /**
     * Get all product lots
     * 
     * @return List of all product lots
     */
    List<ProductLot> getAllProductLots();
    
    /**
     * Get product lots by farmer
     * 
     * @param farmer The farmer
     * @return List of product lots owned by the farmer
     */
    List<ProductLot> getProductLotsByFarmer(User farmer);
    
    /**
     * Get product lots by status
     * 
     * @param status The status to filter by
     * @return List of product lots with the specified status
     */
    List<ProductLot> getProductLotsByStatus(ProductLot.ProductLotStatus status);
    
    /**
     * Get product lots by crop type
     * 
     * @param cropType The crop type to filter by
     * @return List of product lots with the specified crop type
     */
    List<ProductLot> getProductLotsByCropType(String cropType);
    
    /**
     * Verify a product lot's blockchain data
     * 
     * @param id The product lot ID
     * @return True if verified, false otherwise
     */
    boolean verifyProductLotIntegrity(UUID id);
    
    /**
     * Mark a product lot as completed production
     * 
     * @param id The product lot ID
     * @return The updated product lot
     */
    ProductLot completeProduction(UUID id);

    /**
     * Mark a product lot as requested transported
     * 
     * @param id The product lot ID
     * @return The updated product lot
     */
    ProductLot requestTransported(UUID id);
} 