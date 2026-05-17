package com.company.enterprise.hr.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "engagement_surveys")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EngagementSurvey {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String title;

    private String category; // Work Environment, Leadership, Work-Life Balance
    private LocalDate publishedDate;
    private Double participationRate;
    private Double averageSentimentScore;

    @ElementCollection
    @CollectionTable(name = "survey_questions", joinColumns = @JoinColumn(name = "survey_id"))
    @Column(name = "question")
    private List<String> questions;
}
