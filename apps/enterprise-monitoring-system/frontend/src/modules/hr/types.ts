export interface Employee {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  title: string;
  department: string;
  roleLevel: string; // CEO, HR, MANAGER, LEAD, EMPLOYEE, ADMIN
  location: string;
  joinDate: string;
  compensation: number;
  engagementScore: number;
  performanceRating: number;
  attritionRisk: number;
  status: string; // Active, Onboarding, Terminated, On Leave
  skills: string[];
  documents: string[];
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  checkInTime: string;
  checkOutTime: string;
  status: string; // Present, Absent, Half Day, Late, Overtime
  workMode: string; // Office, Remote, Hybrid
  biometricVerified: boolean;
  locationCoordinates: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: string; // Sick, Casual, Annual, Maternity, Paternity
  startDate: string;
  endDate: string;
  status: string; // Pending, Approved, Rejected
  reason: string;
  aiApproved?: boolean;
  aiDecisionReason?: string;
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  month: string; // YYYY-MM
  department: string;
  basicSalary: number;
  hra: number;
  specialAllowance: number;
  bonus: number;
  pf: number;
  esi: number;
  tds: number;
  expenseReimbursements: number;
  netSalary: number;
  status: string; // Pending, Processed, Paid
  bankTransactionId?: string;
}

export interface PerformanceReview {
  id: string;
  employeeId: string;
  employeeName: string;
  reviewerId: string;
  reviewerName: string;
  reviewDate: string;
  kpiScore: number;
  goalCompletionRate: number;
  overallRating: number;
  appraisalStatus: string; // Pending Review, Approved, Needs Improvement
  strengths: string[];
  improvements: string[];
  feedbackNotes: string;
}

export interface TrainingCourse {
  id: string;
  title: string;
  description: string;
  category: string; // Engineering, Compliance, Leadership, Soft Skills
  certificationName: string;
  durationHours: number;
  enrolledEmployeeIds: string[];
  completedEmployeeIds: string[];
}

export interface EngagementSurvey {
  id: string;
  title: string;
  category: string;
  publishedDate: string;
  participationRate: number;
  averageSentimentScore: number;
  questions: string[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  receiverId?: string;
  groupId?: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  attachedLocation?: string;
  attachedMediaUrl?: string;
}

export interface LiveTrackingLog {
  id: string;
  employeeId: string;
  employeeName: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  wifiSsid: string;
  ipAddress: string;
  geofenceViolation: boolean;
  geofenceZoneName: string;
}

export interface ProofOfWork {
  id: string;
  employeeId: string;
  employeeName: string;
  taskTitle: string;
  mediaUrl: string;
  timestamp: string;
  latitude: number;
  longitude: number;
  verified: boolean;
  aiAnalysisSummary?: string;
}

export interface AIViolationLog {
  id: string;
  employeeId: string;
  employeeName: string;
  violationType: string;
  timestamp: string;
  confidenceScore: number;
  evidenceUrl: string;
  resolved: boolean;
  resolutionNotes?: string;
}

export interface InventoryAsset {
  id: string;
  assetTag: string;
  name: string;
  category: string; // Laptop, Monitor, Mobile, Accessory, Furniture
  assignedToEmployeeId?: string;
  assignedToEmployeeName?: string;
  assignmentDate?: string;
  status: string; // Available, Assigned, In Maintenance, Retired
  value: number;
}
