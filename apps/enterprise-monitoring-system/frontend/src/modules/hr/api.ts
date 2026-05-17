import type {
  Employee,
  AttendanceRecord,
  LeaveRequest,
  PayrollRecord,
  PerformanceReview,
  TrainingCourse,
  EngagementSurvey,
  ChatMessage,
  LiveTrackingLog,
  ProofOfWork,
  AIViolationLog,
  InventoryAsset
} from './types';

const BASE_URL = 'http://localhost:8083/api/v1/hr';

// Fallback Mock Data in case backend is offline
let mockEmployees: Employee[] = [
  {
    id: '1', employeeId: 'EMP-001', name: 'Arjun Mehta', email: 'arjun.mehta@worksphere.com',
    title: 'Senior Tech Lead', department: 'Engineering', roleLevel: 'TECH_LEAD',
    location: 'Bangalore, India', joinDate: '2022-01-15', compensation: 1850000,
    engagementScore: 94.5, performanceRating: 4.8, attritionRisk: 4.2, status: 'Active',
    skills: ['Java', 'Spring Boot', 'React', 'Microservices', 'Kubernetes'],
    documents: ['https://worksphere.com/docs/offer_emp001.pdf', 'https://worksphere.com/docs/nda_emp001.pdf']
  },
  {
    id: '2', employeeId: 'EMP-002', name: 'Priya Sharma', email: 'priya.sharma@worksphere.com',
    title: 'HR Manager', department: 'HR & Admin', roleLevel: 'HR',
    location: 'Davangere, India', joinDate: '2021-06-10', compensation: 1250000,
    engagementScore: 98.0, performanceRating: 4.9, attritionRisk: 2.1, status: 'Active',
    skills: ['Talent Acquisition', 'Employee Relations', 'Payroll Management', 'LMS'],
    documents: ['https://worksphere.com/docs/offer_emp002.pdf']
  },
  {
    id: '3', employeeId: 'EMP-003', name: 'Rohan Desai', email: 'rohan.desai@worksphere.com',
    title: 'Software Engineer', department: 'Engineering', roleLevel: 'EMPLOYEE',
    location: 'Bangalore, India', joinDate: '2023-03-20', compensation: 950000,
    engagementScore: 82.0, performanceRating: 3.8, attritionRisk: 18.5, status: 'Active',
    skills: ['React', 'TypeScript', 'Tailwind CSS'], documents: ['https://worksphere.com/docs/offer_emp003.pdf']
  }
];

let mockAttendance: AttendanceRecord[] = [
  {
    id: '1', employeeId: 'EMP-001', date: new Date().toISOString().split('T')[0],
    checkInTime: new Date(Date.now() - 8 * 3600 * 1000).toISOString(),
    checkOutTime: new Date().toISOString(), status: 'Present', workMode: 'Office',
    biometricVerified: true, locationCoordinates: '12.9716,77.5946'
  },
  {
    id: '2', employeeId: 'EMP-003', date: new Date().toISOString().split('T')[0],
    checkInTime: new Date(Date.now() - 9 * 3600 * 1000).toISOString(),
    checkOutTime: new Date(Date.now() - 1 * 3600 * 1000).toISOString(), status: 'Present', workMode: 'Remote',
    biometricVerified: true, locationCoordinates: '14.4644,75.9218'
  }
];

let mockLeaves: LeaveRequest[] = [
  {
    id: '1', employeeId: 'EMP-003', employeeName: 'Rohan Desai', type: 'Sick',
    startDate: new Date(Date.now() + 2 * 86400 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() + 3 * 86400 * 1000).toISOString().split('T')[0],
    status: 'Approved', reason: 'Dental surgery appointment', aiApproved: true,
    aiDecisionReason: 'AI Auto-Approval: Short duration leave within standard policy limits.'
  }
];

let mockPayrolls: PayrollRecord[] = [
  {
    id: '1', employeeId: 'EMP-001', employeeName: 'Arjun Mehta', month: '2026-04',
    department: 'Engineering', basicSalary: 925000, hra: 462500, specialAllowance: 277500,
    bonus: 185000, pf: 111000, esi: 16187.5, tds: 277500, expenseReimbursements: 12500,
    netSalary: 1457812.5, status: 'Paid', bankTransactionId: 'TXN-98765432'
  }
];

let mockPerformance: PerformanceReview[] = [
  {
    id: '1', employeeId: 'EMP-001', employeeName: 'Arjun Mehta', reviewerId: 'EMP-002',
    reviewerName: 'Priya Sharma', reviewDate: '2026-05-01', kpiScore: 4.8, goalCompletionRate: 4.9,
    overallRating: 4.85, appraisalStatus: 'Approved for Promotion',
    strengths: ['Exceptional architectural vision', 'Strong mentorship', 'Flawless delivery'],
    improvements: ['Delegate more routine tasks'], feedbackNotes: 'Arjun continues to be a cornerstone of our core engineering division.'
  }
];

let mockCourses: TrainingCourse[] = [
  {
    id: '1', title: 'Advanced Kubernetes & Service Mesh', description: 'Mastering K8s networking, Istio service mesh, and enterprise security policies.',
    category: 'Engineering', certificationName: 'CKA Enterprise Certified', durationHours: 24,
    enrolledEmployeeIds: ['EMP-001', 'EMP-003'], completedEmployeeIds: ['EMP-001']
  }
];

let mockSurveys: EngagementSurvey[] = [
  {
    id: '1', title: 'Q2 Hybrid Work & Workplace Experience Survey', category: 'Work Environment',
    publishedDate: '2026-05-02', participationRate: 92.4, averageSentimentScore: 88.5,
    questions: ['How satisfied are you with our hybrid flexibility?', 'Do you feel supported by your direct lead?']
  }
];

let mockMessages: ChatMessage[] = [
  {
    id: '1', senderId: 'EMP-002', senderName: 'Priya Sharma', receiverId: 'EMP-001',
    content: 'Hi Arjun, please verify the onboarding workflow for the new Davangere engineering hires.',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), isRead: true
  }
];

let mockTrackingLogs: LiveTrackingLog[] = [
  {
    id: '1', employeeId: 'EMP-003', employeeName: 'Rohan Desai', latitude: 14.4644, longitude: 75.9218,
    timestamp: new Date().toISOString(), wifiSsid: 'WorkSphere-Corp-Davangere', ipAddress: '192.168.10.45',
    geofenceViolation: false, geofenceZoneName: 'Davangere Office Hub'
  }
];

let mockProofOfWorks: ProofOfWork[] = [
  {
    id: '1', employeeId: 'EMP-003', employeeName: 'Rohan Desai', taskTitle: 'Frontend Dashboard UI Grid Refactoring',
    mediaUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString(), latitude: 14.4644, longitude: 75.9218,
    verified: true, aiAnalysisSummary: 'AI Computer Vision: Image verified. Timestamp matches active shift window. Geolocation verified within 15 meters of target site.'
  }
];

let mockViolations: AIViolationLog[] = [
  {
    id: '1', employeeId: 'EMP-003', employeeName: 'Rohan Desai', violationType: 'INACTIVITY_DETECTED',
    timestamp: new Date(Date.now() - 86400 * 1000).toISOString(), confidenceScore: 0.89,
    evidenceUrl: 'https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?auto=format&fit=crop&w=800&q=80',
    resolved: true, resolutionNotes: 'Employee was attending an impromptu whiteboard design session away from desk.'
  }
];

let mockAssets: InventoryAsset[] = [
  {
    id: '1', assetTag: 'AST-LPT-101', name: 'MacBook Pro 16 M3 Max', category: 'Laptop',
    assignedToEmployeeId: 'EMP-001', assignedToEmployeeName: 'Arjun Mehta', assignmentDate: '2024-01-10',
    status: 'Assigned', value: 285000
  },
  {
    id: '2', assetTag: 'AST-MNT-202', name: 'Dell UltraSharp 32 4K USB-C Monitor', category: 'Monitor',
    assignedToEmployeeId: 'EMP-003', assignedToEmployeeName: 'Rohan Desai', assignmentDate: '2024-02-15',
    status: 'Assigned', value: 75000
  }
];

async function fetchWithFallback<T>(endpoint: string, fallbackData: T, options?: RequestInit): Promise<T> {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers
      }
    });
    if (!res.ok) throw new Error('Backend error');
    return (await res.json()) as T;
  } catch (err) {
    console.warn(`[SmartHR API] Backend offline for ${endpoint}. Using rich fallback data.`);
    return fallbackData;
  }
}

export const smartHRApi = {
  getEmployees() { return fetchWithFallback<Employee[]>('/employees', mockEmployees); },
  onboardEmployee(emp: Partial<Employee>) {
    const newEmp: Employee = {
      id: String(mockEmployees.length + 1), employeeId: emp.employeeId || `EMP-00${mockEmployees.length + 1}`,
      name: emp.name || '', email: emp.email || '', title: emp.title || '', department: emp.department || '',
      roleLevel: emp.roleLevel || 'EMPLOYEE', location: emp.location || 'Bangalore, India',
      joinDate: new Date().toISOString().split('T')[0], compensation: emp.compensation || 850000,
      engagementScore: 90.0, performanceRating: 4.5, attritionRisk: 12.5, status: 'Onboarding',
      skills: emp.skills || [], documents: emp.documents || []
    };
    mockEmployees.push(newEmp);
    return fetchWithFallback<Employee>('/employees', newEmp, { method: 'POST', body: JSON.stringify(newEmp) });
  },

  getAttendance(empId: string) {
    const data = mockAttendance.filter(a => a.employeeId === empId);
    return fetchWithFallback<AttendanceRecord[]>(`/attendance/${empId}`, data.length ? data : mockAttendance);
  },
  recordAttendance(rec: Partial<AttendanceRecord>) {
    const newRec: AttendanceRecord = {
      id: String(mockAttendance.length + 1), employeeId: rec.employeeId || 'EMP-001',
      date: new Date().toISOString().split('T')[0], checkInTime: new Date().toISOString(),
      checkOutTime: new Date().toISOString(), status: rec.status || 'Present', workMode: rec.workMode || 'Office',
      biometricVerified: true, locationCoordinates: rec.locationCoordinates || '12.9716,77.5946'
    };
    mockAttendance.push(newRec);
    return fetchWithFallback<AttendanceRecord>('/attendance', newRec, { method: 'POST', body: JSON.stringify(newRec) });
  },

  getLeaves() { return fetchWithFallback<LeaveRequest[]>('/leaves', mockLeaves); },
  submitLeaveRequest(req: Partial<LeaveRequest>) {
    const newReq: LeaveRequest = {
      id: String(mockLeaves.length + 1), employeeId: req.employeeId || 'EMP-003',
      employeeName: req.employeeName || 'Rohan Desai', type: req.type || 'Sick',
      startDate: req.startDate || new Date().toISOString().split('T')[0],
      endDate: req.endDate || new Date().toISOString().split('T')[0],
      status: 'Approved', reason: req.reason || '', aiApproved: true,
      aiDecisionReason: 'AI Auto-Approval: Short duration leave within standard policy limits.'
    };
    mockLeaves.push(newReq);
    return fetchWithFallback<LeaveRequest>('/leaves', newReq, { method: 'POST', body: JSON.stringify(newReq) });
  },

  getPayrolls() { return fetchWithFallback<PayrollRecord[]>('/payroll', mockPayrolls); },
  processPayroll(empId: string, month: string, reimbursements: number = 0) {
    const newPay: PayrollRecord = {
      id: String(mockPayrolls.length + 1), employeeId: empId, employeeName: 'Employee ' + empId,
      month, department: 'Engineering', basicSalary: 500000, hra: 250000, specialAllowance: 150000,
      bonus: 100000, pf: 60000, esi: 10000, tds: 150000, expenseReimbursements: reimbursements,
      netSalary: 780000 + reimbursements, status: 'Processed', bankTransactionId: 'TXN-' + Math.floor(Math.random()*10000000)
    };
    mockPayrolls.push(newPay);
    return fetchWithFallback<PayrollRecord>('/payroll/process', newPay, {
      method: 'POST', body: JSON.stringify({ employeeId: empId, month, reimbursements })
    });
  },

  getPerformanceReviews() { return fetchWithFallback<PerformanceReview[]>('/performance', mockPerformance); },
  submitPerformanceReview(rev: Partial<PerformanceReview>) {
    const newRev: PerformanceReview = {
      id: String(mockPerformance.length + 1), employeeId: rev.employeeId || 'EMP-003',
      employeeName: rev.employeeName || 'Rohan Desai', reviewerId: rev.reviewerId || 'EMP-002',
      reviewerName: rev.reviewerName || 'Priya Sharma', reviewDate: new Date().toISOString().split('T')[0],
      kpiScore: rev.kpiScore || 4.5, goalCompletionRate: rev.goalCompletionRate || 4.6,
      overallRating: rev.overallRating || 4.55, appraisalStatus: 'Approved for Promotion',
      strengths: rev.strengths || ['Fast learner'], improvements: rev.improvements || ['Communication'],
      feedbackNotes: rev.feedbackNotes || 'Solid contributor.'
    };
    mockPerformance.push(newRev);
    return fetchWithFallback<PerformanceReview>('/performance', newRev, { method: 'POST', body: JSON.stringify(newRev) });
  },

  getCourses() { return fetchWithFallback<TrainingCourse[]>('/lms/courses', mockCourses); },
  createCourse(course: Partial<TrainingCourse>) {
    const newCourse: TrainingCourse = {
      id: String(mockCourses.length + 1), title: course.title || '', description: course.description || '',
      category: course.category || 'Engineering', certificationName: course.certificationName || '',
      durationHours: course.durationHours || 10, enrolledEmployeeIds: [], completedEmployeeIds: []
    };
    mockCourses.push(newCourse);
    return fetchWithFallback<TrainingCourse>('/lms/courses', newCourse, { method: 'POST', body: JSON.stringify(newCourse) });
  },
  enrollInCourse(courseId: string, employeeId: string) {
    const course = mockCourses.find(c => c.id === courseId);
    if (course && !course.enrolledEmployeeIds.includes(employeeId)) {
      course.enrolledEmployeeIds.push(employeeId);
    }
    return fetchWithFallback<TrainingCourse>('/lms/enroll', course || mockCourses[0], {
      method: 'POST', body: JSON.stringify({ courseId, employeeId })
    });
  },

  getSurveys() { return fetchWithFallback<EngagementSurvey[]>('/engagement/surveys', mockSurveys); },

  getChatHistory(senderId: string, receiverId: string) {
    return fetchWithFallback<ChatMessage[]>(`/chat/history?senderId=${senderId}&receiverId=${receiverId}`, mockMessages);
  },
  sendChatMessage(msg: Partial<ChatMessage>) {
    const newMsg: ChatMessage = {
      id: String(mockMessages.length + 1), senderId: msg.senderId || 'EMP-001', senderName: msg.senderName || 'Arjun Mehta',
      receiverId: msg.receiverId || 'EMP-002', content: msg.content || '', timestamp: new Date().toISOString(),
      isRead: false, attachedLocation: msg.attachedLocation, attachedMediaUrl: msg.attachedMediaUrl
    };
    mockMessages.push(newMsg);
    return fetchWithFallback<ChatMessage>('/chat/send', newMsg, { method: 'POST', body: JSON.stringify(newMsg) });
  },

  getTrackingLogs(empId: string) { return fetchWithFallback<LiveTrackingLog[]>(`/tracking/${empId}`, mockTrackingLogs); },
  logLocation(log: Partial<LiveTrackingLog>) {
    const newLog: LiveTrackingLog = {
      id: String(mockTrackingLogs.length + 1), employeeId: log.employeeId || 'EMP-003', employeeName: log.employeeName || 'Rohan Desai',
      latitude: log.latitude || 14.4644, longitude: log.longitude || 75.9218, timestamp: new Date().toISOString(),
      wifiSsid: log.wifiSsid || 'WorkSphere-Corp-Davangere', ipAddress: log.ipAddress || '192.168.10.45',
      geofenceViolation: false, geofenceZoneName: 'Davangere Office Hub'
    };
    mockTrackingLogs.push(newLog);
    return fetchWithFallback<LiveTrackingLog>('/tracking', newLog, { method: 'POST', body: JSON.stringify(newLog) });
  },

  getProofOfWorks() { return fetchWithFallback<ProofOfWork[]>('/proof-of-work', mockProofOfWorks); },
  submitProofOfWork(pow: Partial<ProofOfWork>) {
    const newPow: ProofOfWork = {
      id: String(mockProofOfWorks.length + 1), employeeId: pow.employeeId || 'EMP-003', employeeName: pow.employeeName || 'Rohan Desai',
      taskTitle: pow.taskTitle || 'Task Verification', mediaUrl: pow.mediaUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      timestamp: new Date().toISOString(), latitude: pow.latitude || 14.4644, longitude: pow.longitude || 75.9218,
      verified: true, aiAnalysisSummary: 'AI Computer Vision: Image verified. Timestamp matches active shift window. Geolocation verified within 15 meters of target site.'
    };
    mockProofOfWorks.push(newPow);
    return fetchWithFallback<ProofOfWork>('/proof-of-work', newPow, { method: 'POST', body: JSON.stringify(newPow) });
  },

  getViolations() { return fetchWithFallback<AIViolationLog[]>('/violations', mockViolations); },

  getAssets() { return fetchWithFallback<InventoryAsset[]>('/inventory', mockAssets); },
  allocateAsset(assetTag: string, employeeId: string, employeeName: string) {
    const asset = mockAssets.find(a => a.assetTag === assetTag);
    if (asset) {
      asset.assignedToEmployeeId = employeeId;
      asset.assignedToEmployeeName = employeeName;
      asset.status = 'Assigned';
    }
    return fetchWithFallback<InventoryAsset>('/inventory/allocate', asset || mockAssets[0], {
      method: 'POST', body: JSON.stringify({ assetTag, employeeId, employeeName })
    });
  },

  getAnalytics() {
    const fallbackAnalytics = {
      totalEmployees: mockEmployees.length,
      activePayrolls: mockPayrolls.length,
      pendingLeaves: mockLeaves.filter(l => l.status === 'Pending').length,
      geofenceAlerts: mockTrackingLogs.filter(t => t.geofenceViolation).length,
      openViolations: mockViolations.filter(v => !v.resolved).length,
      avgEngagement: 91.5,
      avgPerformance: 4.6,
      attritionRate: 8.4,
      monthlyHiringCost: 1450000.0,
      attendanceTrend: [
        { label: 'Mon', value: 98.5 }, { label: 'Tue', value: 97.2 },
        { label: 'Wed', value: 99.1 }, { label: 'Thu', value: 96.8 }, { label: 'Fri', value: 95.4 }
      ],
      productivityTrend: [
        { label: 'Week 1', value: 88 }, { label: 'Week 2', value: 92 },
        { label: 'Week 3', value: 95 }, { label: 'Week 4', value: 94 }
      ],
      departmentBreakdown: [
        { department: 'Engineering', count: 45 }, { department: 'Sales', count: 25 },
        { department: 'Marketing', count: 18 }, { department: 'HR & Admin', count: 12 }
      ]
    };
    return fetchWithFallback<any>('/analytics', fallbackAnalytics);
  }
};
