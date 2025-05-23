package com.project.backend.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LogisticsDataDTO {
    private Double temperature;
    private Double humidity;
    private String location;
    private String gpsCoordinates;
    private LocalDateTime timestamp;
    private String notes;
    private boolean deliveryCompleted;
} 