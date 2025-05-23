package com.project.backend.controller;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/upload")
@Slf4j
public class FileUploadController {

    @Autowired
    private com.project.backend.config.FileService fileService;
    
    @Value("${mhieu.upload-file.base-uri}")
    private String baseURI;
    
    @PostMapping
    public ResponseEntity<?> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "folder", defaultValue = "production-steps") String folder) {
        
        try {
            log.info("Đang upload file {} vào thư mục {}", file.getOriginalFilename(), folder);
            
            // Tạo thư mục nếu chưa tồn tại
            fileService.createDirectory(baseURI + folder);
            
            // Lưu file và lấy tên file sau khi đã lưu
            String savedFileName = fileService.store(file, folder);
            
            // Trả về URL dưới dạng chuỗi đơn giản
            return ResponseEntity.ok(savedFileName);
        } catch (IOException | URISyntaxException e) {
            log.error("Lỗi khi upload file: {}", e.getMessage());
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
} 