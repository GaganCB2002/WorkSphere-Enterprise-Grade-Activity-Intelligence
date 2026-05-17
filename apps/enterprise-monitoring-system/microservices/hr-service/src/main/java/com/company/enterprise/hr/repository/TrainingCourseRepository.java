package com.company.enterprise.hr.repository;

import com.company.enterprise.hr.model.TrainingCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TrainingCourseRepository extends JpaRepository<TrainingCourse, String> {
    List<TrainingCourse> findByCategory(String category);
}
