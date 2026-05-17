package com.company.enterprise.hr.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "employees")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(unique = true, nullable = false)
    private String employeeId;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String title;
    private String department;
    private String roleLevel; // CEO, HR, MANAGER, LEAD, EMPLOYEE, ADMIN
    private String location;
    private LocalDate joinDate;
    private Double compensation;
    private Double engagementScore;
    private Double performanceRating;
    private Double attritionRisk;
    private String status; // Active, Onboarding, Terminated, On Leave

    @ElementCollection
    @CollectionTable(name = "employee_skills", joinColumns = @JoinColumn(name = "employee_id"))
    @Column(name = "skill")
    private List<String> skills;

    @ElementCollection
    @CollectionTable(name = "employee_documents", joinColumns = @JoinColumn(name = "employee_id"))
    @Column(name = "document_url")
    private List<String> documents;
}
