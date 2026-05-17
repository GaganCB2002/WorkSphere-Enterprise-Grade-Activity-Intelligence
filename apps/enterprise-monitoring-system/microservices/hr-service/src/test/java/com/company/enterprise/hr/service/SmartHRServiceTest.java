package com.company.enterprise.hr.service;

import com.company.enterprise.hr.model.*;
import com.company.enterprise.hr.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class SmartHRServiceTest {

    @Mock
    private EmployeeRepository employeeRepository;
    @Mock
    private AttendanceRepository attendanceRepository;
    @Mock
    private LeaveRequestRepository leaveRequestRepository;
    @Mock
    private PayrollRepository payrollRepository;
    @Mock
    private LiveTrackingRepository liveTrackingRepository;
    @Mock
    private AIViolationRepository aiViolationRepository;
    @Mock
    private ProofOfWorkRepository proofOfWorkRepository;

    @InjectMocks
    private SmartHRService smartHRService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testOnboardEmployee() {
        Employee emp = Employee.builder()
                .employeeId("EMP-100")
                .name("Test User")
                .email("test@worksphere.com")
                .build();

        when(employeeRepository.save(any(Employee.class))).thenAnswer(i -> i.getArguments()[0]);

        Employee saved = smartHRService.onboardEmployee(emp);

        assertNotNull(saved.getJoinDate());
        assertEquals("Onboarding", saved.getStatus());
        assertEquals(85000.0, saved.getCompensation());
        assertEquals(90.0, saved.getEngagementScore());
    }

    @Test
    void testSubmitLeaveRequest_AIAutoApproval() {
        LeaveRequest req = LeaveRequest.builder()
                .employeeId("EMP-100")
                .type("Sick")
                .startDate(LocalDate.now())
                .endDate(LocalDate.now().plusDays(1))
                .build();

        when(leaveRequestRepository.save(any(LeaveRequest.class))).thenAnswer(i -> i.getArguments()[0]);

        LeaveRequest processed = smartHRService.submitLeaveRequest(req);

        assertEquals("Approved", processed.getStatus());
        assertTrue(processed.getAiApproved());
        assertTrue(processed.getAiDecisionReason().contains("AI Auto-Approval"));
    }

    @Test
    void testSubmitLeaveRequest_RequiresManagerApproval() {
        LeaveRequest req = LeaveRequest.builder()
                .employeeId("EMP-100")
                .type("Annual")
                .startDate(LocalDate.now())
                .endDate(LocalDate.now().plusDays(5)) // Exceeds 3 days threshold
                .build();

        when(leaveRequestRepository.save(any(LeaveRequest.class))).thenAnswer(i -> i.getArguments()[0]);

        LeaveRequest processed = smartHRService.submitLeaveRequest(req);

        assertEquals("Pending", processed.getStatus());
        assertFalse(processed.getAiApproved());
        assertTrue(processed.getAiDecisionReason().contains("Requires Manager Review"));
    }

    @Test
    void testProcessPayrollForEmployee() {
        Employee emp = Employee.builder()
                .employeeId("EMP-100")
                .name("Test User")
                .compensation(1000000.0)
                .department("Engineering")
                .build();

        when(employeeRepository.findByEmployeeId("EMP-100")).thenReturn(Optional.of(emp));
        when(payrollRepository.save(any(PayrollRecord.class))).thenAnswer(i -> i.getArguments()[0]);

        PayrollRecord payroll = smartHRService.processPayrollForEmployee("EMP-100", "2026-05", 10000.0);

        assertEquals("EMP-100", payroll.getEmployeeId());
        assertEquals(500000.0, payroll.getBasicSalary());
        assertEquals(250000.0, payroll.getHra());
        assertEquals(150000.0, payroll.getSpecialAllowance());
        assertEquals(100000.0, payroll.getBonus());
        assertEquals(60000.0, payroll.getPf()); // 12% of basic
        assertEquals(150000.0, payroll.getTds()); // 15% of total
        assertEquals(10000.0, payroll.getExpenseReimbursements());
        assertEquals("Processed", payroll.getStatus());
        assertNotNull(payroll.getBankTransactionId());
    }

    @Test
    void testLogLiveLocation_WithinGeofence() {
        LiveTrackingLog logEntry = LiveTrackingLog.builder()
                .employeeId("EMP-100")
                .latitude(13.0) // Within 12-15 range
                .longitude(77.0)
                .build();

        when(liveTrackingRepository.save(any(LiveTrackingLog.class))).thenAnswer(i -> i.getArguments()[0]);

        LiveTrackingLog saved = smartHRService.logLiveLocation(logEntry);

        assertFalse(saved.getGeofenceViolation());
        assertEquals("Authorized Office Hub", saved.getGeofenceZoneName());
        verify(aiViolationRepository, never()).save(any(AIViolationLog.class));
    }

    @Test
    void testLogLiveLocation_GeofenceViolation() {
        LiveTrackingLog logEntry = LiveTrackingLog.builder()
                .employeeId("EMP-100")
                .latitude(10.0) // Outside 12-15 range
                .longitude(77.0)
                .build();

        when(liveTrackingRepository.save(any(LiveTrackingLog.class))).thenAnswer(i -> i.getArguments()[0]);
        when(aiViolationRepository.save(any(AIViolationLog.class))).thenAnswer(i -> i.getArguments()[0]);

        LiveTrackingLog saved = smartHRService.logLiveLocation(logEntry);

        assertTrue(saved.getGeofenceViolation());
        assertEquals("Out of Authorized Perimeter", saved.getGeofenceZoneName());
        verify(aiViolationRepository, times(1)).save(any(AIViolationLog.class));
    }
}
