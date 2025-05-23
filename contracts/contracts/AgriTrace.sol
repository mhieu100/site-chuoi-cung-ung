// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AgriTrace {
    struct ProductLot {
        string lotId;
        string dataHash;
        string ipfsHash;
        uint256 createdAt;
        address createdBy;
        bool exists;
    }

    struct ProcessLog {
        uint256 timestamp;
        string stepInfo;
        address updatedBy;
    }

    struct TransportLog {
        uint256 timestamp;
        string temperature;
        string humidity;
        string location;
        address transporter;
    }

    struct Verification {
        uint256 timestamp;
        string verifier;
        string result;
        string certificateIPFS;
        address verifiedBy;
    }

    mapping(string => ProductLot) private lots;
    mapping(string => ProcessLog[]) private processLogs;
    mapping(string => TransportLog[]) private transportLogs;
    mapping(string => Verification[]) private verifications;

    event ProductLotAdded(
        string lotId,
        string dataHash,
        string ipfsHash,
        uint256 timestamp,
        address indexed creator
    );

    event ProcessUpdated(
        string lotId,
        string stepInfo,
        uint256 timestamp,
        address indexed updatedBy
    );

    event TransportUpdated(
        string lotId,
        string temperature,
        string humidity,
        string location,
        uint256 timestamp,
        address indexed transporter
    );

    event ProductVerified(
        string lotId,
        string verifier,
        string result,
        string certificateIPFS,
        uint256 timestamp,
        address indexed verifiedBy
    );

    modifier lotExists(string memory lotId) {
        require(lots[lotId].exists, "Lot does not exist");
        _;
    }

    // Tạo lô hàng mới
    function addProductLot(
        string memory lotId,
        string memory dataHash,
        string memory ipfsHash
    ) public {
        require(!lots[lotId].exists, "Lot already exists");

        lots[lotId] = ProductLot({
            lotId: lotId,
            dataHash: dataHash,
            ipfsHash: ipfsHash,
            createdAt: block.timestamp,
            createdBy: msg.sender,
            exists: true
        });

        emit ProductLotAdded(lotId, dataHash, ipfsHash, block.timestamp, msg.sender);
    }

    // Cập nhật bước chăm sóc
    function updateProcessStep(
        string memory lotId,
        string memory stepInfo
    ) public lotExists(lotId) {
        processLogs[lotId].push(ProcessLog({
            timestamp: block.timestamp,
            stepInfo: stepInfo,
            updatedBy: msg.sender
        }));

        emit ProcessUpdated(lotId, stepInfo, block.timestamp, msg.sender);
    }

    // Cập nhật vận chuyển
    function addLogisticsData(
        string memory lotId,
        string memory temperature,
        string memory humidity,
        string memory location
    ) public lotExists(lotId) {
        transportLogs[lotId].push(TransportLog({
            timestamp: block.timestamp,
            temperature: temperature,
            humidity: humidity,
            location: location,
            transporter: msg.sender
        }));

        emit TransportUpdated(lotId, temperature, humidity, location, block.timestamp, msg.sender);
    }

    // Xác minh, chứng nhận
    function verifyProduct(
        string memory lotId,
        string memory verifier,
        string memory result,
        string memory certificateIPFS
    ) public lotExists(lotId) {
        verifications[lotId].push(Verification({
            timestamp: block.timestamp,
            verifier: verifier,
            result: result,
            certificateIPFS: certificateIPFS,
            verifiedBy: msg.sender
        }));

        emit ProductVerified(lotId, verifier, result, certificateIPFS, block.timestamp, msg.sender);
    }

    // Truy vấn lô hàng
    function getProductLot(string memory lotId) public view lotExists(lotId) returns (
        string memory,
        string memory,
        string memory,
        uint256,
        address
    ) {
        ProductLot memory lot = lots[lotId];
        return (
            lot.lotId,
            lot.dataHash,
            lot.ipfsHash,
            lot.createdAt,
            lot.createdBy
        );
    }

    // Truy vấn quá trình chăm sóc
    function getProcessLogs(string memory lotId) public view lotExists(lotId) returns (ProcessLog[] memory) {
        return processLogs[lotId];
    }

    // Truy vấn thông tin vận chuyển
    function getTransportLogs(string memory lotId) public view lotExists(lotId) returns (TransportLog[] memory) {
        return transportLogs[lotId];
    }

    // Truy vấn kết quả kiểm định
    function getVerifications(string memory lotId) public view lotExists(lotId) returns (Verification[] memory) {
        return verifications[lotId];
    }

    // Kiểm tra tính hợp lệ dữ liệu (hash)
    function verifyProductLot(
        string memory lotId,
        string memory dataHash
    ) public view lotExists(lotId) returns (bool) {
        return (keccak256(abi.encodePacked(lots[lotId].dataHash)) == keccak256(abi.encodePacked(dataHash)));
    }
}
