package com.company.enterprise.hr.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ai_violation_logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AIViolationLog {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String employeeId;

    private String employeeName;
    private String violationType; // INACTIVITY_DETECTED, UNSAFE_BEHAVIOR, UNAUTHORIZED_ACCESS
    private LocalDateTime timestamp;
    private Double confidenceScore;
    private String evidenceUrl; // Screenshot or video frame
    private Boolean resolved;
    private String resolutionNotes;
}
