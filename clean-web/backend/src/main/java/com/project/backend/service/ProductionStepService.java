package com.project.backend.service;

import java.util.List;
import java.util.UUID;

import com.project.backend.model.ProductLot;
import com.project.backend.model.ProductionStep;
import com.project.backend.model.ProductionStep.StepType;

public interface ProductionStepService {
    
    /**
     * Tạo một bước trong quá trình sản xuất mới và lưu vào blockchain
     * 
     * @param productionStep Bước cần tạo
     * @return Bước đã được tạo với thông tin blockchain
     */
    ProductionStep createProductionStep(ProductionStep productionStep);
    
    /**
     * Lấy một bước trong quá trình sản xuất bằng ID
     * 
     * @param id ID của bước
     * @return Bước tìm thấy
     */
    ProductionStep getProductionStepById(UUID id);
    
    /**
     * Cập nhật thông tin của một bước
     * 
     * @param id ID của bước
     * @param productionStep Thông tin cập nhật
     * @return Bước đã được cập nhật
     */
    ProductionStep updateProductionStep(UUID id, ProductionStep productionStep);
    
    /**
     * Xóa một bước
     * 
     * @param id ID của bước
     */
    void deleteProductionStep(UUID id);
    
    /**
     * Lấy tất cả các bước trong quá trình sản xuất
     * 
     * @return Danh sách các bước
     */
    List<ProductionStep> getAllProductionSteps();
    
    /**
     * Lấy các bước cho một lô sản phẩm
     * 
     * @param productLot Lô sản phẩm
     * @return Danh sách các bước
     */
    List<ProductionStep> getProductionStepsByProductLot(ProductLot productLot);
    
    /**
     * Lấy các bước cho một lô sản phẩm, sắp xếp theo thời gian tạo giảm dần
     * 
     * @param productLot Lô sản phẩm
     * @return Danh sách các bước
     */
    List<ProductionStep> getProductionStepsByProductLotOrderByTimeDesc(ProductLot productLot);
    
    /**
     * Lấy các bước theo loại
     * 
     * @param stepType Loại bước
     * @return Danh sách các bước
     */
    List<ProductionStep> getProductionStepsByType(StepType stepType);
    
    /**
     * Lấy các bước theo lô sản phẩm và loại
     * 
     * @param productLot Lô sản phẩm
     * @param stepType Loại bước
     * @return Danh sách các bước
     */
    List<ProductionStep> getProductionStepsByProductLotAndType(ProductLot productLot, StepType stepType);
    
    /**
     * Xác minh tính toàn vẹn của dữ liệu trên blockchain
     * 
     * @param id ID của bước
     * @return true nếu dữ liệu hợp lệ, false nếu không
     */
    boolean verifyProductionStepIntegrity(UUID id);
} 