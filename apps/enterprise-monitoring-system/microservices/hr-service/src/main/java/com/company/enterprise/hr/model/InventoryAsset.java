package com.company.enterprise.hr.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "inventory_assets")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InventoryAsset {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(unique = true, nullable = false)
    private String assetTag;

    @Column(nullable = false)
    private String name;

    private String category; // Laptop, Monitor, Mobile, Accessory, Furniture
    private String assignedToEmployeeId;
    private String assignedToEmployeeName;
    private LocalDate assignmentDate;
    private String status; // Available, Assigned, In Maintenance, Retired
    private Double value;
}
