package com.company.enterprise.hr.repository;

import com.company.enterprise.hr.model.ProofOfWork;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProofOfWorkRepository extends JpaRepository<ProofOfWork, String> {
    List<ProofOfWork> findByEmployeeIdOrderByTimestampDesc(String employeeId);
    List<ProofOfWork> findByVerifiedFalse();
}
