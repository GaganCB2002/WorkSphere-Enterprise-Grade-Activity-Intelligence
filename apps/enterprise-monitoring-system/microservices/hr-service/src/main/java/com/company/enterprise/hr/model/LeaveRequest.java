package com.company.enterprise.hr.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "leave_requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeaveRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String employeeId;

    private String employeeName;
    private String type; // Sick, Casual, Annual, Maternity, Paternity
    private LocalDate startDate;
    private LocalDate endDate;
    private String status; // Pending, Approved, Rejected
    private String reason;
    private Boolean aiApproved;
    private String aiDecisionReason;
}
