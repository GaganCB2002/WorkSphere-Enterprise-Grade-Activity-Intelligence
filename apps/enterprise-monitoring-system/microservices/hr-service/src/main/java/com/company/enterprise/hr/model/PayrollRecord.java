package com.company.enterprise.hr.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "payroll_records")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PayrollRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String employeeId;

    private String employeeName;
    private String month; // YYYY-MM
    private String department;
    private Double basicSalary;
    private Double hra;
    private Double specialAllowance;
    private Double bonus;
    private Double pf;
    private Double esi;
    private Double tds;
    private Double expenseReimbursements;
    private Double netSalary;
    private String status; // Pending, Processed, Paid
    private String bankTransactionId;
}
