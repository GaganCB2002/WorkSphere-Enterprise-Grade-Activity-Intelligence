package com.company.enterprise.hr.repository;

import com.company.enterprise.hr.model.PayrollRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface PayrollRepository extends JpaRepository<PayrollRecord, String> {
    List<PayrollRecord> findByEmployeeId(String employeeId);
    List<PayrollRecord> findByMonth(String month);
    Optional<PayrollRecord> findByEmployeeIdAndMonth(String employeeId, String month);
    List<PayrollRecord> findByStatus(String status);
}
