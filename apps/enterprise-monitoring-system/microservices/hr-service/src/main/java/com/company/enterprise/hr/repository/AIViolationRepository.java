package com.company.enterprise.hr.repository;

import com.company.enterprise.hr.model.AIViolationLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AIViolationRepository extends JpaRepository<AIViolationLog, String> {
    List<AIViolationLog> findByEmployeeIdOrderByTimestampDesc(String employeeId);
    List<AIViolationLog> findByResolvedFalse();
}
