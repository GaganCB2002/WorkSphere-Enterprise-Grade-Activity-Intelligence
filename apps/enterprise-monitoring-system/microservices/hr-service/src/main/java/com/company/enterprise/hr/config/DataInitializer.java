package com.company.enterprise.hr.config;

import com.company.enterprise.hr.model.*;
import com.company.enterprise.hr.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final EmployeeRepository employeeRepository;
    private final AttendanceRepository attendanceRepository;
    private final LeaveRequestRepository leaveRequestRepository;
    private final PayrollRepository payrollRepository;
    private final PerformanceRepository performanceRepository;
    private final TrainingCourseRepository trainingCourseRepository;
    private final EngagementSurveyRepository engagementSurveyRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final LiveTrackingRepository liveTrackingRepository;
    private final ProofOfWorkRepository proofOfWorkRepository;
    private final AIViolationRepository aiViolationRepository;
    private final InventoryAssetRepository inventoryAssetRepository;

    @Override
    public void run(String... args) {
        log.info("Initializing Smart Employee Management System Data...");

        if (employeeRepository.count() > 0) {
            log.info("Database already initialized.");
            return;
        }

        // 1. Employees
        Employee emp1 = Employee.builder()
                .employeeId("EMP-001")
                .name("Arjun Mehta")
                .email("arjun.mehta@worksphere.com")
                .title("Senior Tech Lead")
                .department("Engineering")
                .roleLevel("TECH_LEAD")
                .location("Bangalore, India")
                .joinDate(LocalDate.of(2022, 1, 15))
                .compensation(1850000.0)
                .engagementScore(94.5)
                .performanceRating(4.8)
                .attritionRisk(4.2)
                .status("Active")
                .skills(List.of("Java", "Spring Boot", "React", "Microservices", "Kubernetes"))
                .documents(List.of("https://worksphere.com/docs/offer_emp001.pdf", "https://worksphere.com/docs/nda_emp001.pdf"))
                .build();

        Employee emp2 = Employee.builder()
                .employeeId("EMP-002")
                .name("Priya Sharma")
                .email("priya.sharma@worksphere.com")
                .title("HR Manager")
                .department("HR & Admin")
                .roleLevel("HR")
                .location("Davangere, India")
                .joinDate(LocalDate.of(2021, 6, 10))
                .compensation(1250000.0)
                .engagementScore(98.0)
                .performanceRating(4.9)
                .attritionRisk(2.1)
                .status("Active")
                .skills(List.of("Talent Acquisition", "Employee Relations", "Payroll Management", "LMS"))
                .documents(List.of("https://worksphere.com/docs/offer_emp002.pdf"))
                .build();

        Employee emp3 = Employee.builder()
                .employeeId("EMP-003")
                .name("Rohan Desai")
                .email("rohan.desai@worksphere.com")
                .title("Software Engineer")
                .department("Engineering")
                .roleLevel("EMPLOYEE")
                .location("Bangalore, India")
                .joinDate(LocalDate.of(2023, 3, 20))
                .compensation(950000.0)
                .engagementScore(82.0)
                .performanceRating(3.8)
                .attritionRisk(18.5)
                .status("Active")
                .skills(List.of("React", "TypeScript", "Tailwind CSS"))
                .documents(List.of("https://worksphere.com/docs/offer_emp003.pdf"))
                .build();

        employeeRepository.saveAll(List.of(emp1, emp2, emp3));

        // 2. Attendance
        AttendanceRecord att1 = AttendanceRecord.builder()
                .employeeId("EMP-001")
                .date(LocalDate.now())
                .checkInTime(LocalDateTime.now().minusHours(8))
                .checkOutTime(LocalDateTime.now())
                .status("Present")
                .workMode("Office")
                .biometricVerified(true)
                .locationCoordinates("12.9716,77.5946")
                .build();

        AttendanceRecord att2 = AttendanceRecord.builder()
                .employeeId("EMP-003")
                .date(LocalDate.now())
                .checkInTime(LocalDateTime.now().minusHours(9))
                .checkOutTime(LocalDateTime.now().minusHours(1))
                .status("Present")
                .workMode("Remote")
                .biometricVerified(true)
                .locationCoordinates("14.4644,75.9218") // Davangere
                .build();

        attendanceRepository.saveAll(List.of(att1, att2));

        // 3. Leave Requests
        LeaveRequest leave1 = LeaveRequest.builder()
                .employeeId("EMP-003")
                .employeeName("Rohan Desai")
                .type("Sick")
                .startDate(LocalDate.now().plusDays(2))
                .endDate(LocalDate.now().plusDays(3))
                .status("Approved")
                .reason("Dental surgery appointment")
                .aiApproved(true)
                .aiDecisionReason("AI Auto-Approval: Short duration leave within standard policy limits.")
                .build();

        leaveRequestRepository.save(leave1);

        // 4. Payroll
        PayrollRecord pay1 = PayrollRecord.builder()
                .employeeId("EMP-001")
                .employeeName("Arjun Mehta")
                .month("2026-04")
                .department("Engineering")
                .basicSalary(925000.0)
                .hra(462500.0)
                .specialAllowance(277500.0)
                .bonus(185000.0)
                .pf(111000.0)
                .esi(16187.5)
                .tds(277500.0)
                .expenseReimbursements(12500.0)
                .netSalary(1457812.5)
                .status("Paid")
                .bankTransactionId("TXN-98765432")
                .build();

        payrollRepository.save(pay1);

        // 5. Performance
        PerformanceReview rev1 = PerformanceReview.builder()
                .employeeId("EMP-001")
                .employeeName("Arjun Mehta")
                .reviewerId("EMP-002")
                .reviewerName("Priya Sharma")
                .reviewDate(LocalDate.now().minusDays(10))
                .kpiScore(4.8)
                .goalCompletionRate(4.9)
                .overallRating(4.85)
                .appraisalStatus("Approved for Promotion")
                .strengths(List.of("Exceptional architectural vision", "Strong mentorship", "Flawless delivery"))
                .improvements(List.of("Delegate more routine tasks"))
                .feedbackNotes("Arjun continues to be a cornerstone of our core engineering division.")
                .build();

        performanceRepository.save(rev1);

        // 6. LMS Courses
        TrainingCourse course1 = TrainingCourse.builder()
                .title("Advanced Kubernetes & Service Mesh")
                .description("Mastering K8s networking, Istio service mesh, and enterprise security policies.")
                .category("Engineering")
                .certificationName("CKA Enterprise Certified")
                .durationHours(24.0)
                .enrolledEmployeeIds(List.of("EMP-001", "EMP-003"))
                .completedEmployeeIds(List.of("EMP-001"))
                .build();

        trainingCourseRepository.save(course1);

        // 7. Engagement Surveys
        EngagementSurvey survey1 = EngagementSurvey.builder()
                .title("Q2 Hybrid Work & Workplace Experience Survey")
                .category("Work Environment")
                .publishedDate(LocalDate.now().minusDays(15))
                .participationRate(92.4)
                .averageSentimentScore(88.5)
                .questions(List.of("How satisfied are you with our hybrid flexibility?", "Do you feel supported by your direct lead?"))
                .build();

        engagementSurveyRepository.save(survey1);

        // 8. Chat Messages
        ChatMessage chat1 = ChatMessage.builder()
                .senderId("EMP-002")
                .senderName("Priya Sharma")
                .receiverId("EMP-001")
                .content("Hi Arjun, please verify the onboarding workflow for the new Davangere engineering hires.")
                .timestamp(LocalDateTime.now().minusMinutes(30))
                .isRead(true)
                .build();

        chatMessageRepository.save(chat1);

        // 12. Live Tracking
        LiveTrackingLog track1 = LiveTrackingLog.builder()
                .employeeId("EMP-003")
                .employeeName("Rohan Desai")
                .latitude(14.4644)
                .longitude(75.9218)
                .timestamp(LocalDateTime.now())
                .wifiSsid("WorkSphere-Corp-Davangere")
                .ipAddress("192.168.10.45")
                .geofenceViolation(false)
                .geofenceZoneName("Davangere Office Hub")
                .build();

        liveTrackingRepository.save(track1);

        // 13. Proof of Work
        ProofOfWork pow1 = ProofOfWork.builder()
                .employeeId("EMP-003")
                .employeeName("Rohan Desai")
                .taskTitle("Frontend Dashboard UI Grid Refactoring")
                .mediaUrl("https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80")
                .timestamp(LocalDateTime.now().minusHours(2))
                .latitude(14.4644)
                .longitude(75.9218)
                .verified(true)
                .aiAnalysisSummary("AI Computer Vision: Image verified. Timestamp matches active shift window. Geolocation verified within 15 meters of target site.")
                .build();

        proofOfWorkRepository.save(pow1);

        // 14. AI Violation Logs
        AIViolationLog vio1 = AIViolationLog.builder()
                .employeeId("EMP-003")
                .employeeName("Rohan Desai")
                .violationType("INACTIVITY_DETECTED")
                .timestamp(LocalDateTime.now().minusDays(1))
                .confidenceScore(0.89)
                .evidenceUrl("https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?auto=format&fit=crop&w=800&q=80")
                .resolved(true)
                .resolutionNotes("Employee was attending an impromptu whiteboard design session away from desk.")
                .build();

        aiViolationRepository.save(vio1);

        // 15. Inventory Assets
        InventoryAsset asset1 = InventoryAsset.builder()
                .assetTag("AST-LPT-101")
                .name("MacBook Pro 16 M3 Max")
                .category("Laptop")
                .assignedToEmployeeId("EMP-001")
                .assignedToEmployeeName("Arjun Mehta")
                .assignmentDate(LocalDate.of(2024, 1, 10))
                .status("Assigned")
                .value(285000.0)
                .build();

        InventoryAsset asset2 = InventoryAsset.builder()
                .assetTag("AST-MNT-202")
                .name("Dell UltraSharp 32 4K USB-C Monitor")
                .category("Monitor")
                .assignedToEmployeeId("EMP-003")
                .assignedToEmployeeName("Rohan Desai")
                .assignmentDate(LocalDate.of(2024, 2, 15))
                .status("Assigned")
                .value(75000.0)
                .build();

        inventoryAssetRepository.saveAll(List.of(asset1, asset2));

        log.info("Smart Employee Management System Data Successfully Initialized.");
    }
}
