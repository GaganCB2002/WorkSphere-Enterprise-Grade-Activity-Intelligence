export type EnterpriseRole =
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'CEO'
  | 'CTO'
  | 'HR_MANAGER'
  | 'HR_EXECUTIVE'
  | 'FINANCE_MANAGER'
  | 'MARKETING_MANAGER'
  | 'SALES_MANAGER'
  | 'PROJECT_MANAGER'
  | 'TECH_LEAD'
  | 'DEVOPS_ENGINEER'
  | 'QA_ENGINEER'
  | 'SOFTWARE_ENGINEER'
  | 'SECURITY_ANALYST'
  | 'SUPPORT_AGENT'
  | 'EMPLOYEE'
  | 'INTERN';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: EnterpriseRole;
  department: string;
  avatar: string;
  mfaEnabled: boolean;
  status: 'ONLINE' | 'OFFLINE' | 'IDLE' | 'BUSY';
  lastActive: string;
}

export interface StatCardData {
  title: string;
  value: string | number;
  trend: string;
  trendType: 'up' | 'down' | 'neutral';
  icon: string;
  color: string;
}

export interface ActivityLog {
  id: string;
  employeeId: string;
  employeeName: string;
  appName: string;
  windowTitle: string;
  category: 'PRODUCTIVE' | 'NEUTRAL' | 'DISTRACTING';
  durationSeconds: number;
  timestamp: string;
}

export interface MonitoringTelemetry {
  employeeId: string;
  screenshotUrl: string;
  activeSeconds: number;
  idleSeconds: number;
  keystrokeVelocity: number;
  mouseVelocity: number;
  recordedAt: string;
}

export interface AttendanceLog {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string | null;
  status: 'PRESENT' | 'ABSENT' | 'HALF_DAY' | 'ON_LEAVE' | 'REMOTE';
  workingHours: number;
}

export interface GpsLocation {
  employeeId: string;
  employeeName: string;
  latitude: number;
  longitude: number;
  accuracy: number;
  speed: number;
  recordedAt: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  assigneeId: string;
  assigneeName: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';
  dueDate: string;
  estimatedHours: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  managerId: string;
  managerName: string;
  startDate: string;
  endDate: string;
  status: 'PLANNED' | 'ACTIVE' | 'ON_HOLD' | 'COMPLETED';
  budget: number;
  spent: number;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  role: EnterpriseRole;
  action: string;
  target: string;
  ipAddress: string;
  timestamp: string;
}

export interface AiInsight {
  id: string;
  category: 'PRODUCTIVE' | 'VIOLENCE_DETECT' | 'ANOMALY' | 'BEHAVIOR' | 'EXECUTIVE_SUMMARY';
  title: string;
  description: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  confidenceScore: number;
  timestamp: string;
}

export interface DepartmentKpi {
  departmentName: string;
  headcount: number;
  monthlyBudget: number;
  budgetSpent: number;
  activeProjects: number;
  averageProductivity: number;
}
