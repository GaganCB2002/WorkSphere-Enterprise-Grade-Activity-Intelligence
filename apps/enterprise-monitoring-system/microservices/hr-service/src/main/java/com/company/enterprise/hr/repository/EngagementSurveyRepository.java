package com.company.enterprise.hr.repository;

import com.company.enterprise.hr.model.EngagementSurvey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EngagementSurveyRepository extends JpaRepository<EngagementSurvey, String> {
    List<EngagementSurvey> findByCategory(String category);
}
