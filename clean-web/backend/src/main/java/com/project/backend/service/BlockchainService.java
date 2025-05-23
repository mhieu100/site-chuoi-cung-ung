package com.project.backend.service;

import java.math.BigInteger;
import java.util.List;

import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tuples.generated.Tuple5;

import com.project.backend.dto.LogisticsDataDTO;
import com.project.backend.model.Logistics;

public interface BlockchainService {
    
    /**
     * Adds a product lot to the blockchain
     * 
     * @param lotId Unique identifier for the lot
     * @param dataHash Hash of the product lot data 
     * @param ipfsHash IPFS hash if additional files were stored
     * @return Transaction receipt from the blockchain
     */
    TransactionReceipt addProductLotToBlockchain(String lotId, String dataHash, String ipfsHash);
    
    /**
     * Retrieves product lot information from blockchain
     * 
     * @param lotId Unique identifier for the lot
     * @return Tuple containing lot information (lotId, dataHash, ipfsHash, timestamp, creator)
     */
    Tuple5<String, String, String, BigInteger, String> getProductLotFromBlockchain(String lotId);
    
    /**
     * Verifies if a product lot data has been tampered with
     * 
     * @param lotId Unique identifier for the lot
     * @param dataHash Hash of the product lot data to verify
     * @return True if verified, false otherwise
     */
    boolean verifyProductLotData(String lotId, String dataHash);
    
    /**
     * Adds a production step to the blockchain using the new updateProcessStep function
     * 
     * @param stepId Unique identifier for the step
     * @param productLotId The associated product lot id
     * @param dataHash Hash of the production step data
     * @param ipfsHash IPFS hash if additional files were stored
     * @return Transaction receipt from the blockchain
     */
    TransactionReceipt addProductionStepToBlockchain(String stepId, String productLotId, String dataHash, String ipfsHash);
    
    /**
     * Verifies if a production step data has been tampered with
     * 
     * @param stepId Unique identifier for the step
     * @param dataHash Hash of the production step data to verify
     * @return True if verified, false otherwise
     */
    boolean verifyProductionStepData(String stepId, String dataHash);
    
    /**
     * Retrieves production step logs for a specific product lot from blockchain
     * 
     * @param productLotId The product lot ID to get process logs for
     * @return List of process logs from the blockchain
     */
    List<?> getProcessLogsFromBlockchain(String productLotId);
    
    /**
     * Adds transportation data to the blockchain using the addLogisticsData function
     * 
     * @param productLotId The product lot ID 
     * @param temperature Temperature during transport
     * @param humidity Humidity during transport
     * @param location Geographic location
     * @return Transaction receipt from the blockchain
     */
    TransactionReceipt addTransportDataToBlockchain(String productLotId, String temperature, String humidity, String location);
    
    /**
     * Verifies a product by an external authority
     * 
     * @param productLotId The product lot ID to verify
     * @param verifier Name or identifier of the verifier
     * @param result Verification result
     * @param certificateIpfs IPFS hash of verification certificate if available
     * @return Transaction receipt from the blockchain
     */
    TransactionReceipt verifyProduct(String productLotId, String verifier, String result, String certificateIpfs);
    
    /**
     * Records the creation of a logistics entry to the blockchain
     * 
     * @param logistics The logistics entry to record
     * @return Transaction hash from the blockchain
     */
    String recordLogisticsCreation(Logistics logistics);
    
    /**
     * Records logistics data updates (temperature, humidity, etc.) to the blockchain
     * 
     * @param logistics The logistics entry
     * @param logisticsData The logistics data to record
     * @return Transaction hash from the blockchain
     */
    String recordLogisticsData(Logistics logistics, LogisticsDataDTO logisticsData);
} 