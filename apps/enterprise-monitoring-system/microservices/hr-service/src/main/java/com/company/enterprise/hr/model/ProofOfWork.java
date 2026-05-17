package com.company.enterprise.hr.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "proof_of_work_records")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProofOfWork {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String employeeId;

    private String employeeName;
    private String taskTitle;

    @Column(nullable = false)
    private String mediaUrl; // Image or Video URL

    private LocalDateTime timestamp;
    private Double latitude;
    private Double longitude;
    private Boolean verified;
    private String aiAnalysisSummary;
}
