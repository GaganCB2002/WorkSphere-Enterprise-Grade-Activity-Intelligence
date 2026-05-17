package com.company.enterprise.hr.repository;

import com.company.enterprise.hr.model.InventoryAsset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface InventoryAssetRepository extends JpaRepository<InventoryAsset, String> {
    Optional<InventoryAsset> findByAssetTag(String assetTag);
    List<InventoryAsset> findByAssignedToEmployeeId(String employeeId);
    List<InventoryAsset> findByStatus(String status);
}
