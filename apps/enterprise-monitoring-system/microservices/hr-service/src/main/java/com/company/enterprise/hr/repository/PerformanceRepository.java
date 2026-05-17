package com.company.enterprise.hr.repository;

import com.company.enterprise.hr.model.PerformanceReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PerformanceRepository extends JpaRepository<PerformanceReview, String> {
    List<PerformanceReview> findByEmployeeId(String employeeId);
    List<PerformanceReview> findByAppraisalStatus(String appraisalStatus);
}
