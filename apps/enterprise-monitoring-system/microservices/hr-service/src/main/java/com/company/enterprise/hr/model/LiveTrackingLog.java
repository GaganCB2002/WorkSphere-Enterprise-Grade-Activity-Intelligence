package com.company.enterprise.hr.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "live_tracking_logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LiveTrackingLog {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String employeeId;

    private String employeeName;
    private Double latitude;
    private Double longitude;
    private LocalDateTime timestamp;
    private String wifiSsid;
    private String ipAddress;
    private Boolean geofenceViolation;
    private String geofenceZoneName;
}
