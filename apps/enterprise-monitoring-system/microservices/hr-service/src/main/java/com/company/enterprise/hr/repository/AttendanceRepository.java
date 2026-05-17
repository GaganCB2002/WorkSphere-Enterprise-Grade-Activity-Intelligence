package com.company.enterprise.hr.repository;

import com.company.enterprise.hr.model.AttendanceRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AttendanceRepository extends JpaRepository<AttendanceRecord, String> {
    List<AttendanceRecord> findByEmployeeId(String employeeId);
    List<AttendanceRecord> findByDate(LocalDate date);
    Optional<AttendanceRecord> findByEmployeeIdAndDate(String employeeId, LocalDate date);
}
