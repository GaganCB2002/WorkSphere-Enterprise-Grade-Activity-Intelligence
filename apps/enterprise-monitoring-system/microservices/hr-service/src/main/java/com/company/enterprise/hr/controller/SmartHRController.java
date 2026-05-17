package com.company.enterprise.hr.controller;

import com.company.enterprise.hr.model.*;
import com.company.enterprise.hr.service.SmartHRService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SmartHRController {

    private final SmartHRService smartHRService;

    // --- 1 & 2. EMPLOYEES & ONBOARDING ---
    @GetMapping("/employees")
    public ResponseEntity<List<Employee>> getAllEmployees() {
        return ResponseEntity.ok(smartHRService.getAllEmployees());
    }

    @GetMapping("/employees/{employeeId}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable String employeeId) {
        return smartHRService.getEmployeeById(employeeId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/employees")
    public ResponseEntity<Employee> onboardEmployee(@RequestBody Employee employee) {
        return ResponseEntity.ok(smartHRService.onboardEmployee(employee));
    }

    // --- 3. ATTENDANCE & LEAVES ---
    @GetMapping("/attendance/{employeeId}")
    public ResponseEntity<List<AttendanceRecord>> getAttendance(@PathVariable String employeeId) {
        return ResponseEntity.ok(smartHRService.getEmployeeAttendance(employeeId));
    }

    @PostMapping("/attendance")
    public ResponseEntity<AttendanceRecord> recordAttendance(@RequestBody AttendanceRecord record) {
        return ResponseEntity.ok(smartHRService.recordAttendance(record));
    }

    @GetMapping("/leaves")
    public ResponseEntity<List<LeaveRequest>> getAllLeaves() {
        return ResponseEntity.ok(smartHRService.getAllLeaveRequests());
    }

    @PostMapping("/leaves")
    public ResponseEntity<LeaveRequest> submitLeaveRequest(@RequestBody LeaveRequest request) {
        return ResponseEntity.ok(smartHRService.submitLeaveRequest(request));
    }

    // --- 4. PAYROLL ---
    @GetMapping("/payroll")
    public ResponseEntity<List<PayrollRecord>> getAllPayrolls() {
        return ResponseEntity.ok(smartHRService.getAllPayrolls());
    }

    @PostMapping("/payroll/process")
    public ResponseEntity<PayrollRecord> processPayroll(@RequestBody Map<String, Object> payload) {
        String employeeId = (String) payload.get("employeeId");
        String month = (String) payload.get("month");
        Double reimbursements = payload.containsKey("reimbursements") ? 
                Double.valueOf(payload.get("reimbursements").toString()) : 0.0;
        return ResponseEntity.ok(smartHRService.processPayrollForEmployee(employeeId, month, reimbursements));
    }

    // --- 5. PERFORMANCE ---
    @GetMapping("/performance")
    public ResponseEntity<List<PerformanceReview>> getAllPerformanceReviews() {
        return ResponseEntity.ok(smartHRService.getAllPerformanceReviews());
    }

    @PostMapping("/performance")
    public ResponseEntity<PerformanceReview> submitPerformanceReview(@RequestBody PerformanceReview review) {
        return ResponseEntity.ok(smartHRService.submitPerformanceReview(review));
    }

    // --- 6. LMS ---
    @GetMapping("/lms/courses")
    public ResponseEntity<List<TrainingCourse>> getAllCourses() {
        return ResponseEntity.ok(smartHRService.getAllCourses());
    }

    @PostMapping("/lms/courses")
    public ResponseEntity<TrainingCourse> createCourse(@RequestBody TrainingCourse course) {
        return ResponseEntity.ok(smartHRService.createCourse(course));
    }

    @PostMapping("/lms/enroll")
    public ResponseEntity<TrainingCourse> enrollInCourse(@RequestBody Map<String, String> payload) {
        return ResponseEntity.ok(smartHRService.enrollEmployeeInCourse(payload.get("courseId"), payload.get("employeeId")));
    }

    // --- 7. ENGAGEMENT ---
    @GetMapping("/engagement/surveys")
    public ResponseEntity<List<EngagementSurvey>> getAllSurveys() {
        return ResponseEntity.ok(smartHRService.getAllSurveys());
    }

    // --- 8. CHAT ---
    @GetMapping("/chat/history")
    public ResponseEntity<List<ChatMessage>> getChatHistory(@RequestParam String senderId, @RequestParam String receiverId) {
        return ResponseEntity.ok(smartHRService.getChatHistory(senderId, receiverId));
    }

    @PostMapping("/chat/send")
    public ResponseEntity<ChatMessage> sendChatMessage(@RequestBody ChatMessage message) {
        return ResponseEntity.ok(smartHRService.sendChatMessage(message));
    }

    // --- 12. LIVE TRACKING ---
    @GetMapping("/tracking/{employeeId}")
    public ResponseEntity<List<LiveTrackingLog>> getTrackingLogs(@PathVariable String employeeId) {
        return ResponseEntity.ok(smartHRService.getRecentTrackingLogs(employeeId));
    }

    @PostMapping("/tracking")
    public ResponseEntity<LiveTrackingLog> logLocation(@RequestBody LiveTrackingLog logEntry) {
        return ResponseEntity.ok(smartHRService.logLiveLocation(logEntry));
    }

    // --- 13. PROOF OF WORK ---
    @GetMapping("/proof-of-work")
    public ResponseEntity<List<ProofOfWork>> getAllProofOfWorks() {
        return ResponseEntity.ok(smartHRService.getAllProofOfWorks());
    }

    @PostMapping("/proof-of-work")
    public ResponseEntity<ProofOfWork> submitProofOfWork(@RequestBody ProofOfWork pow) {
        return ResponseEntity.ok(smartHRService.submitProofOfWork(pow));
    }

    // --- 14. VIOLATIONS ---
    @GetMapping("/violations")
    public ResponseEntity<List<AIViolationLog>> getAllViolations() {
        return ResponseEntity.ok(smartHRService.getAllViolations());
    }

    // --- 15. INVENTORY ---
    @GetMapping("/inventory")
    public ResponseEntity<List<InventoryAsset>> getAllAssets() {
        return ResponseEntity.ok(smartHRService.getAllAssets());
    }

    @PostMapping("/inventory/allocate")
    public ResponseEntity<InventoryAsset> allocateAsset(@RequestBody Map<String, String> payload) {
        return ResponseEntity.ok(smartHRService.allocateAsset(
                payload.get("assetTag"), payload.get("employeeId"), payload.get("employeeName")));
    }

    // --- 16. ANALYTICS DASHBOARD ---
    @GetMapping("/analytics")
    public ResponseEntity<Map<String, Object>> getAnalytics() {
        return ResponseEntity.ok(smartHRService.getEnterpriseAnalytics());
    }
}
