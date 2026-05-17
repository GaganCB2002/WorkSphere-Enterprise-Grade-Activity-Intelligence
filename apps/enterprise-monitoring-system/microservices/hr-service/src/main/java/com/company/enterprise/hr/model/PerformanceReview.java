package com.company.enterprise.hr.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "performance_reviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PerformanceReview {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String employeeId;

    private String employeeName;
    private String reviewerId;
    private String reviewerName;
    private LocalDate reviewDate;
    private Double kpiScore;
    private Double goalCompletionRate;
    private Double overallRating;
    private String appraisalStatus; // Pending Review, Approved, Needs Improvement

    @ElementCollection
    @CollectionTable(name = "review_strengths", joinColumns = @JoinColumn(name = "review_id"))
    @Column(name = "strength")
    private List<String> strengths;

    @ElementCollection
    @CollectionTable(name = "review_improvements", joinColumns = @JoinColumn(name = "review_id"))
    @Column(name = "improvement")
    private List<String> improvements;

    @Column(length = 2000)
    private String feedbackNotes;
}
