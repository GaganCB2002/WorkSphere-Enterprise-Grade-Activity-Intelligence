package com.company.enterprise.hr.repository;

import com.company.enterprise.hr.model.LiveTrackingLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LiveTrackingRepository extends JpaRepository<LiveTrackingLog, String> {
    List<LiveTrackingLog> findByEmployeeIdOrderByTimestampDesc(String employeeId);
    List<LiveTrackingLog> findByGeofenceViolationTrue();
}
