package com.company.enterprise.hr.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "training_courses")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TrainingCourse {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String title;

    @Column(length = 1000)
    private String description;

    private String category; // Engineering, Compliance, Leadership, Soft Skills
    private String certificationName;
    private Double durationHours;

    @ElementCollection
    @CollectionTable(name = "course_enrolled_employees", joinColumns = @JoinColumn(name = "course_id"))
    @Column(name = "employee_id")
    private List<String> enrolledEmployeeIds;

    @ElementCollection
    @CollectionTable(name = "course_completed_employees", joinColumns = @JoinColumn(name = "course_id"))
    @Column(name = "employee_id")
    private List<String> completedEmployeeIds;
}
