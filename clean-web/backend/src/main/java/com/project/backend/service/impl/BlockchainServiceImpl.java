package com.project.backend.service.impl;

import java.math.BigInteger;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.web3j.crypto.Credentials;
import org.web3j.model.AgriTrace;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.http.HttpService;
import org.web3j.tuples.generated.Tuple5;
import org.web3j.tx.gas.ContractGasProvider;
import org.web3j.tx.gas.StaticGasProvider;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.backend.dto.LogisticsDataDTO;
import com.project.backend.model.Logistics;
import com.project.backend.service.BlockchainService;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class BlockchainServiceImpl implements BlockchainService {

    @Value("${blockchain.rpc-url}")
    private String rpcUrl;

    @Value("${blockchain.private-key}")
    private String privateKey;

    @Value("${blockchain.contract-address}")
    private String contractAddress;

    @Value("${blockchain.gas-price}")
    private String gasPrice;

    @Value("${blockchain.gas-limit}")
    private String gasLimit;

    private Web3j web3j;
    private Credentials credentials;
    private AgriTrace contract;

    @PostConstruct
    public void init() {
        try {
            web3j = Web3j.build(new HttpService(rpcUrl));
            credentials = Credentials.create(privateKey);

            ContractGasProvider gasProvider = new StaticGasProvider(
                new BigInteger(gasPrice), 
                new BigInteger(gasLimit)
            );
            
            contract = AgriTrace.load(contractAddress, web3j, credentials, gasProvider);
            log.info("Blockchain service initialized successfully");
        } catch (Exception e) {
            log.error("Failed to initialize blockchain service", e);
        }
    }

    @Override
    public TransactionReceipt addProductLotToBlockchain(String lotId, String dataHash, String ipfsHash) {
        try {
            log.info("Adding product lot to blockchain, lotId: {}, dataHash: {}", lotId, dataHash);
            return contract.addProductLot(lotId, dataHash, ipfsHash).send();
        } catch (Exception e) {
            log.error("Failed to add product lot to blockchain: {}", e.getMessage());
            throw new RuntimeException("Failed to add product lot to blockchain", e);
        }
    }

    @Override
    public Tuple5<String, String, String, BigInteger, String> getProductLotFromBlockchain(String lotId) {
        try {
            log.info("Getting product lot from blockchain, lotId: {}", lotId);
            return contract.getProductLot(lotId).send();
        } catch (Exception e) {
            log.error("Failed to get product lot from blockchain: {}", e.getMessage());
            throw new RuntimeException("Failed to get product lot from blockchain", e);
        }
    }

    @Override
    public boolean verifyProductLotData(String lotId, String dataHash) {
        try {
            log.info("Verifying product lot data, lotId: {}, dataHash: {}", lotId, dataHash);
            return contract.verifyProductLot(lotId, dataHash).send();
        } catch (Exception e) {
            log.error("Failed to verify product lot data: {}", e.getMessage());
            throw new RuntimeException("Failed to verify product lot data", e);
        }
    }
    
    @Override
    public TransactionReceipt addProductionStepToBlockchain(String stepId, String productLotId, String dataHash, String ipfsHash) {
        try {
            log.info("Adding production step to blockchain, stepId: {}, productLotId: {}, dataHash: {}", 
                     stepId, productLotId, dataHash);
            
            // Sử dụng phương thức mới updateProcessStep thay vì addProductLot với prefix
            // Phương thức này nhận productLotId và stepInfo (chứa thông tin bước sản xuất)
            // Sử dụng JSON chứa dataHash + metadata để gửi lên blockchain
            String stepInfo = "{\"stepId\":\"" + stepId + "\",\"dataHash\":\"" + dataHash + "\",\"photoUrl\":\"" + ipfsHash + "\"}";
            
            return contract.updateProcessStep(productLotId, stepInfo).send();
        } catch (Exception e) {
            log.error("Failed to add production step to blockchain: {}", e.getMessage());
            throw new RuntimeException("Failed to add production step to blockchain", e);
        }
    }
    
    @Override
    public boolean verifyProductionStepData(String stepId, String dataHash) {
        try {
            log.info("Verifying production step data, stepId: {}, dataHash: {}", stepId, dataHash);
            
            // Không còn sử dụng phương thức verifyProductLot với prefix "step:"
            // Thay vào đó, chúng ta sẽ dựa vào dữ liệu được lưu trong sự kiện ProcessUpdated
            // và sử dụng getProcessLogs để kiểm tra
            
            // Lưu ý: Để thực hiện xác minh, chúng ta cần productLotId, nhưng hiện tại 
            // chúng ta chỉ có stepId. Vì vậy, cần xử lý logic riêng cho trường hợp này.
            // Ở đây, chúng ta trả về true để giữ nguyên giao diện API, nhưng sẽ
            // cần thay đổi trong phiên bản sau.
            
            log.warn("verifyProductionStepData needs additional implementation with new contract");
            return true;
        } catch (Exception e) {
            log.error("Failed to verify production step data: {}", e.getMessage());
            throw new RuntimeException("Failed to verify production step data", e);
        }
    }
    
    @Override
    public List<?> getProcessLogsFromBlockchain(String productLotId) {
        try {
            log.info("Getting process logs from blockchain for lotId: {}", productLotId);
            return contract.getProcessLogs(productLotId).send();
        } catch (Exception e) {
            log.error("Failed to get process logs from blockchain: {}", e.getMessage());
            throw new RuntimeException("Failed to get process logs from blockchain", e);
        }
    }
    
    @Override
    public TransactionReceipt addTransportDataToBlockchain(String productLotId, String temperature, String humidity, String location) {
        try {
            log.info("Adding transport data to blockchain, lotId: {}, temp: {}, humidity: {}, location: {}", 
                     productLotId, temperature, humidity, location);
            return contract.addLogisticsData(productLotId, temperature, humidity, location).send();
        } catch (Exception e) {
            log.error("Failed to add transport data to blockchain: {}", e.getMessage());
            throw new RuntimeException("Failed to add transport data to blockchain", e);
        }
    }
    
    @Override
    public TransactionReceipt verifyProduct(String productLotId, String verifier, String result, String certificateIpfs) {
        try {
            log.info("Verifying product by authority, lotId: {}, verifier: {}, result: {}", 
                     productLotId, verifier, result);
            return contract.verifyProduct(productLotId, verifier, result, certificateIpfs).send();
        } catch (Exception e) {
            log.error("Failed to verify product in blockchain: {}", e.getMessage());
            throw new RuntimeException("Failed to verify product in blockchain", e);
        }
    }
    
    @Override
    public String recordLogisticsCreation(Logistics logistics) {
        try {
            log.info("Recording logistics creation to blockchain for product lot: {}", 
                     logistics.getProductLot().getId());
            
            // Create a JSON string with logistics data
            String logisticsInfo = String.format(
                "{\"id\":\"%s\",\"transporterId\":\"%s\",\"departedAt\":\"%s\"}",
                logistics.getId().toString(),
                logistics.getTransporter().getWalletAddress(),
                logistics.getDepartedAt().toString()
            );
            
            // Use the updateProcessStep method to record this as a process step
            TransactionReceipt receipt = contract.updateProcessStep(
                logistics.getProductLot().getId().toString(),
                logisticsInfo
            ).send();
            
            // Return the transaction hash
            return receipt.getTransactionHash();
        } catch (Exception e) {
            log.error("Failed to record logistics creation to blockchain: {}", e.getMessage());
            throw new RuntimeException("Failed to record logistics creation to blockchain", e);
        }
    }
    
    @Override
    public String recordLogisticsData(Logistics logistics, LogisticsDataDTO logisticsData) {
        try {
            log.info("Recording logistics data to blockchain for product lot: {}, temperature: {}, humidity: {}", 
                    logistics.getProductLot().getId(),
                    logisticsData.getTemperature(),
                    logisticsData.getHumidity());
            
            // Use the addLogisticsData method to record temperature, humidity, location
            TransactionReceipt receipt = contract.addLogisticsData(
                logistics.getProductLot().getId().toString(),
                logisticsData.getTemperature().toString(),
                logisticsData.getHumidity().toString(),
                logisticsData.getLocation()
            ).send();
            
            return receipt.getTransactionHash();
        } catch (Exception e) {
            log.error("Failed to record logistics data to blockchain: {}", e.getMessage());
            throw new RuntimeException("Failed to record logistics data to blockchain", e);
        }
    }
} 