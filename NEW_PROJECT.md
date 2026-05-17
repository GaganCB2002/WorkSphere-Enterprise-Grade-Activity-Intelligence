# 🏢 Enterprise Monitoring & Analytics Platform

> A full-stack, AI-powered enterprise employee monitoring, analytics, and management system built for MNC-scale companies like Zoho, Accenture, and Cognizant.

![Tech Stack](https://img.shields.io/badge/Frontend-React_18_+_Vite-61DAFB?style=for-the-badge&logo=react)
![Backend](https://img.shields.io/badge/Backend-Spring_Boot_3-6DB33F?style=for-the-badge&logo=springboot)
![Database](https://img.shields.io/badge/Database-PostgreSQL_15-4169E1?style=for-the-badge&logo=postgresql)
![Cache](https://img.shields.io/badge/Cache-Redis_7-DC382D?style=for-the-badge&logo=redis)
![Messaging](https://img.shields.io/badge/Messaging-Apache_Kafka-231F20?style=for-the-badge&logo=apachekafka)
![AI](https://img.shields.io/badge/AI-Python_FastAPI-009688?style=for-the-badge&logo=fastapi)

---

## 📋 Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack & Architecture](#2-tech-stack--architecture)
3. [Frontend Structure](#3-frontend-structure-react--vite)
4. [Backend Structure](#4-backend-structure-spring-boot)
5. [AI Services](#5-ai-services-architecture)
6. [Database Schema](#6-database-schema)
7. [Authentication & Security](#7-authentication--security-rbac)
8. [All Modules — Feature by Feature](#8-all-modules--feature-by-feature)
9. [Department Dashboards](#9-department-dashboards)
10. [Real-Time: WebSocket & Kafka](#10-real-time-websocket--kafka)
11. [Roles & Permissions (RBAC Matrix)](#11-roles--permissions-rbac-matrix)
12. [Frontend Developer Guide](#12-frontend-developer-guide)
13. [UI/UX Designer Guide](#13-uiux-designer-guide)
14. [API Reference](#14-api-reference)
15. [DevOps & Deployment](#15-devops--deployment)
16. [Environment Variables](#16-environment-variables)
17. [Best Practices & Conventions](#17-best-practices--conventions)

---

## 1. Project Overview

This platform is a **full-stack enterprise system** designed for large MNC companies. It provides:

- 🖥️ **Real-time employee monitoring** — screen capture, app usage, browser tracking, idle detection
- 🤖 **AI-powered analytics** — productivity prediction, behavior analysis, anomaly detection
- 🔐 **Role-based access control (RBAC)** — 18 roles, 13 permissions, granular access
- 📍 **GPS tracking** — live location, geofencing, route history
- 📊 **17+ department dashboards** — CEO to Intern, each role sees only their data
- 🔒 **Cybersecurity surveillance** — threat detection, login monitoring, audit logs
- ⚡ **Real-time event streaming** — WebSocket + Kafka for live updates
- 🐳 **Microservices-ready** — Docker + Kubernetes deployment

### 🎯 Platform Scale

| Metric | Value | Notes |
|--------|-------|-------|
| Departments Supported | 17+ | HR, Engineering, Sales, Marketing, Finance, Legal... |
| User Roles | 18 | SUPER_ADMIN → INTERN |
| Permission Types | 13 | Granular access control |
| Frontend Modules | 20+ | Each with pages, components, redux, services |
| AI Services | 9 | Violence detection, productivity, behavior, face recognition... |
| Real-time Channels | WebSocket + Kafka | Live dashboards, notifications, alerts |
| Core Database Tables | 10+ | users, roles, permissions, attendance, monitoring... |

---

## 2. Tech Stack & Architecture

### 🛠️ Technologies Used

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React 18 + Vite | UI framework, fast HMR builds |
| State Management | Redux Toolkit + Redux Saga | Global state, async side effects |
| Styling | Tailwind CSS + CSS Modules | Utility-first design, scoped styles |
| Charts | Recharts + D3.js | Analytics visualizations, custom SVG charts |
| Real-time Client | WebSocket (SockJS + STOMP) | Live feeds, push notifications |
| Backend | Spring Boot 3 + Java 17 | REST APIs, microservices backbone |
| Security | Spring Security + JWT + OAuth2 | Auth, MFA, SSO, RBAC |
| Database | PostgreSQL 15 | Primary relational data store |
| Cache | Redis 7 | Sessions, rate limiting, pub/sub |
| Messaging | Apache Kafka | Event streaming, async processing |
| Real-time Server | Spring WebSocket + STOMP | Live employee activity push |
| AI Services | Python (FastAPI) | ML models for monitoring & analytics |
| Container | Docker + Docker Compose | Local development environment |
| Orchestration | Kubernetes (K8s) | Production deployment |
| CI/CD | GitHub Actions / Jenkins | Automated build and deploy |
| Cloud | AWS / Azure / GCP | Multi-cloud deployment options |
| Infrastructure | Terraform | Infrastructure as Code |
| API Docs | Swagger / OpenAPI 3 | Auto-generated API documentation |

### 🏗️ Architecture Flow

```
Browser / Mobile App
        ↓  (HTTPS)
React Frontend (Vite)
        ↓  (REST / WebSocket)
Nginx — API Gateway / Load Balancer
        ↓
Spring Boot Microservices
  ├── Auth Service        (JWT, OAuth2, MFA)
  ├── Employee Service    (Profiles, Attendance)
  ├── Monitoring Service  (Screen, App, Browser)
  ├── HR Service          (Payroll, Leave, Recruit)
  ├── Analytics Service   (Reports, Metrics)
  ├── GPS Service         (Location Tracking)
  ├── Notification Svc    (Email, Push, WebSocket)
  └── AI Bridge Service   (FastAPI calls)
        ↓
AI Services (Python / FastAPI)
  ├── Productivity Prediction
  ├── Violence Detection
  ├── Behavior Analysis
  └── Face Recognition
        ↓
Data Layer
  ├── PostgreSQL   (Primary Database)
  ├── Redis        (Cache + Sessions)
  └── Kafka        (Event Streaming)
```

---

## 3. Frontend Structure (React + Vite)

```
frontend/
│
├── public/
│   ├── favicon.ico
│   ├── logo/
│   └── assets/
│
├── src/
│   ├── api/                        ← ALL HTTP calls live here only
│   │   ├── auth/                   → Login, logout, MFA, refresh token
│   │   ├── employee/               → Profile CRUD, search, bulk import
│   │   ├── hr/                     → Attendance, payroll, leave, recruitment
│   │   ├── finance/                → Budget, expenses, invoices
│   │   ├── marketing/              → Campaigns, SEO, leads
│   │   ├── sales/                  → CRM, leads, targets, revenue
│   │   ├── analytics/              → Metrics, KPIs, aggregated stats
│   │   ├── reports/                → Generate and export reports
│   │   ├── tracking/               → Screen capture, app usage, browser
│   │   ├── ai/                     → AI prediction requests
│   │   ├── notification/           → Fetch, mark read, preferences
│   │   └── websocket/              → WebSocket connection helpers
│   │
│   ├── app/                        ← Redux store setup
│   │   ├── store.js                → Creates Redux store with middleware
│   │   ├── rootReducer.js          → Combines all module reducers
│   │   └── rootSaga.js             → Combines all module sagas
│   │
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   ├── videos/
│   │   └── fonts/
│   │
│   ├── auth/                       ← Authentication pages
│   │   ├── Login.jsx               → Email/password + OAuth2 SSO
│   │   ├── Register.jsx            → Multi-step employee registration
│   │   ├── ForgotPassword.jsx      → OTP or magic link trigger
│   │   ├── ResetPassword.jsx       → Token validation + new password
│   │   ├── MFA.jsx                 → TOTP (Google Auth), SMS OTP
│   │   └── SessionTimeout.jsx      → Countdown modal + auto-logout
│   │
│   ├── layouts/                    ← Role-specific layout wrappers
│   │   ├── AdminLayout/            → SUPER_ADMIN, ADMIN — all modules
│   │   ├── CeoLayout/              → CEO — company analytics, AI insights
│   │   ├── HrLayout/               → HR_MANAGER, HR_EXECUTIVE
│   │   ├── ManagerLayout/          → PROJECT_MANAGER — team + projects
│   │   ├── TechLeadLayout/         → TECH_LEAD — engineering modules
│   │   ├── EmployeeLayout/         → SOFTWARE_ENGINEER, EMPLOYEE, INTERN
│   │   ├── FinanceLayout/          → FINANCE_MANAGER
│   │   ├── MarketingLayout/        → MARKETING_MANAGER
│   │   └── SupportLayout/          → SUPPORT_AGENT
│   │
│   ├── components/
│   │   │
│   │   ├── common/                 ← Shared reusable UI components
│   │   │   ├── Button/             → variant, size, loading, icon props
│   │   │   ├── Modal/              → isOpen, onClose, size, children
│   │   │   ├── Loader/             → size, overlay, text props
│   │   │   ├── Table/              → columns, data, pagination, sortable
│   │   │   ├── Card/               → title, value, trend, color, skeleton
│   │   │   ├── Input/              → type, label, error, prefix/suffix icon
│   │   │   └── Dropdown/           → options, multi, searchable, grouped
│   │   │
│   │   ├── charts/                 ← Data visualization components
│   │   │   ├── BarChart/           → Recharts — comparisons, revenue
│   │   │   ├── PieChart/           → Recharts — distribution, allocation
│   │   │   ├── HeatMap/            → D3.js — activity heatmap (day/hour)
│   │   │   ├── AnalyticsChart/     → ComposedChart — KPI trends
│   │   │   └── ProductivityChart/  → AI productivity scores over time
│   │   │
│   │   ├── dashboard/              → DashboardHeader, StatCard, QuickActions
│   │   ├── navbar/                 → TopBar, NotificationBell, UserMenu
│   │   ├── sidebar/                → SideNav, NavItem, CollapsibleMenu
│   │   ├── reports/                → ReportCard, ReportFilters, ExportBtn
│   │   ├── tracking/               → ScreenCapture, AppUsageBar, IdleTimer
│   │   ├── ai/                     → PredictionCard, RiskAlert, AIInsight
│   │   ├── monitoring/             → LiveFeed, ActivityTimeline, AlertBanner
│   │   ├── gps/                    → MapContainer, LocationPin, RouteHistory
│   │   └── notifications/          → NotificationList, ToastManager
│   │
│   ├── modules/                    ← Feature modules (one per domain)
│   │   │
│   │   │   Each module follows this EXACT structure:
│   │   │   ├── pages/              → Full page components (route-level)
│   │   │   ├── components/         → Components used only in this module
│   │   │   ├── services/           → Module-specific API + data transforms
│   │   │   ├── redux/              → slice, saga, selectors
│   │   │   └── routes/             → Module route config (lazy loaded)
│   │   │
│   │   ├── employee/
│   │   ├── hr/
│   │   ├── finance/
│   │   ├── marketing/
│   │   ├── sales/
│   │   ├── ceo/
│   │   ├── manager/
│   │   ├── techlead/
│   │   ├── qa/
│   │   ├── devops/
│   │   ├── cybersecurity/
│   │   ├── analytics/
│   │   ├── ai-monitoring/
│   │   ├── gps-tracking/
│   │   ├── live-monitoring/
│   │   ├── reports/
│   │   ├── notifications/
│   │   ├── support/
│   │   └── admin/
│   │
│   ├── hooks/                      ← Custom React hooks
│   │   ├── useAuth.js              → { user, role, permissions, isAuthenticated }
│   │   ├── usePermission.js        → hasPermission(permKey) function
│   │   ├── useWebSocket.js         → Subscribe to WS topics, returns messages
│   │   ├── useGPS.js               → Current location, tracking toggle
│   │   ├── useNotifications.js     → Notification list, unread count
│   │   ├── usePagination.js        → page, pageSize, total, helpers
│   │   ├── useDebounce.js          → Debounced value for search inputs
│   │   ├── useTheme.js             → Toggle dark/light mode
│   │   └── useActivityTimer.js     → Idle detection, last active timestamp
│   │
│   ├── context/                    ← React Context providers
│   │
│   ├── routes/
│   │   ├── AppRoutes.jsx           → Master route config (all lazy-loaded)
│   │   ├── ProtectedRoute.jsx      → Redirect to /login if no valid JWT
│   │   ├── RoleBasedRoute.jsx      → 403 if role not in allowedRoles[]
│   │   └── PermissionRoute.jsx     → Gate individual features by permission
│   │
│   ├── services/
│   │   ├── jwt/                    → Token storage, decode, refresh, expiry
│   │   ├── websocket/              → STOMP client, subscribe, reconnection
│   │   ├── gps/                    → Geolocation API wrapper, tracking
│   │   ├── ai/                     → AI service API calls abstraction
│   │   └── monitoring/             → Screenshot triggers, app sampling, idle
│   │
│   ├── styles/                     ← Global CSS, Tailwind config
│   │
│   ├── utils/
│   │   ├── constants/              → API_BASE_URL, ROLES, PERMISSIONS enums
│   │   ├── permissions/            → ROLE_PERMISSIONS map per role
│   │   ├── validators/             → Email, phone, password, file validators
│   │   ├── formatters/             → Currency, date, file size, percentage
│   │   └── helpers/                → debounce, deepClone, groupBy, exportToCsv
│   │
│   ├── websocket/                  ← WebSocket config & message handlers
│   │
│   ├── App.jsx                     ← Root component, global providers
│   └── main.jsx                    ← Entry point, mounts React + Redux
│
├── .env                            ← Environment variables (never commit)
├── package.json
└── vite.config.js                  ← Path aliases (@/), API proxy, code split
```

### 3.1 Module Structure Pattern

Every module under `src/modules/` follows this **exact same structure**:

```
modules/employee/
  ├── pages/
  │   ├── EmployeeList.jsx          ← Route-level page
  │   ├── EmployeeDetail.jsx
  │   └── EmployeeCreate.jsx
  ├── components/
  │   ├── EmployeeCard.jsx          ← Used only inside this module
  │   └── EmployeeFilter.jsx
  ├── services/
  │   └── employeeService.js        ← API calls + data transforms
  ├── redux/
  │   ├── employeeSlice.js          ← Initial state + reducers
  │   ├── employeeSaga.js           ← Async side effects
  │   └── employeeSelectors.js      ← Memoized selectors
  └── routes/
      └── employeeRoutes.js         ← Lazy-loaded route config
```

---

## 4. Backend Structure (Spring Boot)

```
backend/src/main/java/com/company/enterprise/
│
├── config/
│   ├── SecurityConfig.java         ← Spring Security: CORS, JWT filter chain, URL patterns
│   ├── JwtFilter.java              ← Validates JWT on every request, sets SecurityContext
│   ├── SwaggerConfig.java          ← OpenAPI 3, JWT bearer auth in Swagger UI
│   ├── RedisConfig.java            ← Connection pool, JSON serializer, TTL defaults
│   ├── WebSocketConfig.java        ← STOMP endpoint /ws, message broker, origins
│   ├── KafkaConfig.java            ← Producer/consumer factory, topic configs, retry
│   └── CorsConfig.java             ← Allowed origins, methods, headers, credentials
│
├── security/
│   ├── JwtUtil.java                ← Generate, validate, parse JWT tokens
│   ├── JwtAuthenticationEntryPoint ← 401 response handler
│   ├── CustomUserDetailsService    ← Load user from DB for Spring Security
│   └── PasswordEncoderConfig.java  ← BCrypt configuration (strength: 12)
│
├── controller/                     ← REST API endpoint classes
│   ├── auth/                       → /api/v1/auth/* (login, refresh, mfa, logout)
│   ├── employee/                   → /api/v1/employee/*
│   ├── hr/                         → /api/v1/hr/* (attendance, payroll, leave)
│   ├── finance/                    → /api/v1/finance/*
│   ├── marketing/                  → /api/v1/marketing/*
│   ├── sales/                      → /api/v1/sales/*
│   ├── ceo/                        → /api/v1/ceo/*
│   ├── manager/                    → /api/v1/manager/*
│   ├── techlead/                   → /api/v1/techlead/*
│   ├── qa/                         → /api/v1/qa/*
│   ├── devops/                     → /api/v1/devops/*
│   ├── cybersecurity/              → /api/v1/security/*
│   ├── analytics/                  → /api/v1/analytics/*
│   ├── ai/                         → /api/v1/ai/*
│   ├── gps/                        → /api/v1/gps/*
│   ├── monitoring/                 → /api/v1/monitoring/*
│   ├── reports/                    → /api/v1/reports/*
│   ├── notification/               → /api/v1/notifications/*
│   └── admin/                      → /api/v1/admin/*
│
├── service/                        ← Business logic (never put SQL here)
│   ├── auth/
│   ├── employee/
│   ├── hr/
│   ├── finance/
│   ├── marketing/
│   ├── sales/
│   ├── ceo/
│   ├── manager/
│   ├── techlead/
│   ├── analytics/
│   ├── ai/
│   ├── gps/
│   ├── websocket/
│   ├── reports/
│   └── notifications/
│
├── repository/                     ← JPA repositories (Spring Data)
│   ├── auth/
│   ├── employee/
│   ├── hr/
│   ├── finance/
│   ├── marketing/
│   ├── analytics/
│   ├── tracking/
│   └── reports/
│
├── entity/                         ← JPA database entities
│   ├── auth/
│   │   ├── User.java               → id, email, passwordHash, status, mfaEnabled
│   │   ├── Role.java               → id, name (SUPER_ADMIN..INTERN)
│   │   ├── Permission.java         → id, key (CREATE_USER, VIEW_ANALYTICS...)
│   │   └── UserRole.java           → join table: user ↔ role
│   ├── employee/
│   ├── hr/
│   ├── finance/
│   ├── marketing/
│   ├── sales/
│   ├── analytics/
│   ├── gps/
│   ├── monitoring/
│   ├── ai/
│   ├── reports/
│   └── notification/
│
├── dto/                            ← Data Transfer Objects
│   │   Request DTOs  → What frontend sends (with @Valid annotations)
│   │   Response DTOs → What backend returns (no internal fields exposed)
│
├── mapper/                         ← MapStruct: Entity ↔ DTO conversion
│
├── exception/                      ← GlobalExceptionHandler + custom exceptions
│
├── websocket/                      ← STOMP handlers, broadcast to /topic/*
│
├── scheduler/                      ← @Scheduled: daily reports, hourly metrics
│
├── kafka/
│   ├── KafkaProducer.java          → Publish events to topics
│   └── KafkaConsumer.java          → Process events asynchronously
│
├── redis/                          ← Cache service, session store, rate limiter
│
├── audit/                          ← AuditLog entity + AuditAspect (@Around)
│
├── logs/                           ← Structured logging config
│
└── EnterpriseApplication.java      ← Spring Boot main class
```

### 4.1 Controller Pattern

```java
@RestController
@RequestMapping("/api/v1/employee")
@PreAuthorize("hasRole('HR_MANAGER') or hasRole('ADMIN')")
public class EmployeeController {

  GET    /api/v1/employee           → list employees (paginated)
  POST   /api/v1/employee           → create employee
  GET    /api/v1/employee/{id}      → get employee by ID
  PUT    /api/v1/employee/{id}      → update employee
  DELETE /api/v1/employee/{id}      → soft delete (sets deleted_at)
}
```

### 4.2 Service Layer Rules

| Rule | Detail |
|------|--------|
| Interface + Impl | Create `EmployeeService` interface + `EmployeeServiceImpl` class |
| Transaction management | `@Transactional` on writes, `@Transactional(readOnly=true)` on reads |
| Exception handling | Throw custom exceptions (`EmployeeNotFoundException`). Never return null. |
| DTO conversion | Always convert Entity → DTO in service before returning to controller |
| Kafka events | Publish domain events (`employee.created`) from the service layer |

---

## 5. AI Services Architecture

```
ai-services/
├── violence-detection/             ← CNN (YOLO/ResNet) — screen image analysis
├── productivity-prediction/        ← LSTM / Gradient Boosting — activity → score 0–100
├── anomaly-detection/              ← Isolation Forest — unusual behavior flagging
├── behavior-analysis/              ← K-Means Clustering — typing/click pattern profiles
├── face-recognition/               ← DeepFace / FaceNet — identity verification
├── sentiment-analysis/             ← BERT Transformer — chat/ticket sentiment
├── tracking-analysis/              ← DBSCAN / HMM — GPS movement pattern analysis
├── report-ai/                      ← LLM (Claude API) — natural language summaries
└── recommendation-engine/          ← Collaborative Filtering — task + learning suggestions
```

### 5.1 AI Service Summary

| Service | Input | Output | Model |
|---------|-------|--------|-------|
| violence-detection | Screen capture images | Violence probability + bounding boxes | CNN (YOLO) |
| productivity-prediction | App usage, active time, tasks | Score 0–100 + trend | LSTM |
| anomaly-detection | Activity logs, time series | Anomaly flag + severity | Isolation Forest |
| behavior-analysis | Click patterns, typing speed | Behavior profile + alerts | K-Means |
| face-recognition | Webcam frame | Identity match confidence | DeepFace |
| sentiment-analysis | Chat text, support tickets | Sentiment score + emotions | BERT |
| tracking-analysis | GPS coordinates | Route clusters + analysis | DBSCAN |
| report-ai | Raw metrics from all modules | NL summary + recommendations | Claude API |
| recommendation-engine | Employee profile + history | Task assignments + learning | Collab. Filtering |

Each AI service is a **FastAPI microservice** with:
- `POST /predict` — main inference endpoint
- `GET /health` — health check
- Model loaded at startup (joblib/PyTorch)
- Dockerfile for containerization
- Called from Spring Boot via `RestTemplate` / `WebClient`

---

## 6. Database Schema

```
database/
├── schema/
│   ├── users.sql
│   ├── roles.sql
│   ├── permissions.sql
│   ├── employees.sql
│   ├── monitoring.sql
│   ├── tracking.sql
│   ├── reports.sql
│   └── analytics.sql
├── procedures/
├── triggers/
└── backup/
```

### 6.1 Core Tables

| Table | Key Columns | Relationships |
|-------|-------------|---------------|
| `users` | id, email, password_hash, status, mfa_enabled, created_at | Has many roles (via user_roles) |
| `roles` | id, name (SUPER_ADMIN..INTERN), description | Has many permissions |
| `permissions` | id, key (CREATE_USER, VIEW_ANALYTICS...), description | Belongs to many roles |
| `employees` | id, user_id, name, dept_id, position, manager_id, hire_date, salary_band | Belongs to user, department |
| `departments` | id, name, head_employee_id, parent_dept_id | Tree structure (self-referential) |
| `attendance` | id, employee_id, date, check_in, check_out, status, working_hours | Belongs to employee |
| `activity_logs` | id, employee_id, app_name, url, duration, category, timestamp | Belongs to employee |
| `monitoring` | id, employee_id, screenshot_url, idle_seconds, active_seconds, recorded_at | Belongs to employee |
| `gps_locations` | id, employee_id, latitude, longitude, accuracy, recorded_at | Belongs to employee |
| `projects` | id, name, manager_id, start_date, end_date, status, tech_stack | Has many tasks |
| `tasks` | id, project_id, assignee_id, title, priority, status, due_date | Belongs to project, employee |
| `notifications` | id, user_id, type, title, message, read_at, created_at | Belongs to user |
| `audit_logs` | id, user_id, action, entity, entity_id, old_value, new_value, ip, timestamp | Belongs to user |

---

## 7. Authentication & Security (RBAC)

### 7.1 Authentication Flow

```
User submits credentials
        ↓
Backend validates email + BCrypt hash
        ↓ (if MFA enabled)
Send TOTP challenge → User submits OTP
        ↓
Backend generates:
  accessToken  (JWT, 15 min expiry)
  refreshToken (JWT, 7 day expiry, stored in Redis)
        ↓
Frontend:
  accessToken  → stored in memory (NOT localStorage)
  refreshToken → stored in httpOnly cookie
        ↓
Every API request: Authorization: Bearer <accessToken>
        ↓ (on 401)
Use refreshToken → get new accessToken
        ↓ (on logout)
Blacklist refreshToken in Redis
```

### 7.2 JWT Token Structure

```json
{
  "header": { "alg": "HS512", "typ": "JWT" },
  "payload": {
    "sub": "userId",
    "email": "user@company.com",
    "role": "HR_MANAGER",
    "permissions": ["MANAGE_EMPLOYEE", "VIEW_ANALYTICS"],
    "departmentId": "dept-uuid",
    "iat": 1700000000,
    "exp": 1700000900
  }
}
```

### 7.3 All Roles

```
SUPER_ADMIN     → Level 1 — Full system access, can manage admins
ADMIN           → Level 2 — All except SUPER_ADMIN-only settings
CEO             → Level 3 — Read all data + AI insights + executive reports
CTO             → Level 3 — All technical modules + team management
HR_MANAGER      → Level 4 — All HR features + employee data
HR_EXECUTIVE    → Level 4 — HR operations (limited)
FINANCE_MANAGER → Level 4 — Finance module + reports + budget
MARKETING_MANAGER → Level 4 — Marketing + campaign + leads
SALES_MANAGER   → Level 4 — Sales + CRM + revenue targets
PROJECT_MANAGER → Level 4 — Team + projects + task assignment
TECH_LEAD       → Level 5 — Engineering team + code review + deployments
DEVOPS_ENGINEER → Level 5 — Infrastructure + CI/CD + server monitoring
QA_ENGINEER     → Level 5 — Bug reports + test management
SOFTWARE_ENGINEER → Level 6 — Own tasks + code tracking + team boards
SECURITY_ANALYST → Level 6 — Cybersecurity module access
SUPPORT_AGENT   → Level 6 — Customer tickets + chat + call logs
EMPLOYEE        → Level 7 — Own profile + attendance + notifications
INTERN          → Level 8 — Very limited: own profile + basic notifications
```

---

## 8. All Modules — Feature by Feature

### 🧑‍💼 Employee Module

**Pages:** Employee List, Employee Detail, Create Employee, Edit Employee, Bulk Import, Org Chart

**Features:**
- Full employee profile management (photo, documents, emergency contacts)
- Department and manager assignment
- Bulk CSV import with validation
- Interactive organizational chart
- Document upload (ID proof, contracts, certificates)
- Employee search with advanced filters

---

### 👥 HR Module

**Pages:** Attendance Dashboard, Payroll Processing, Leave Management, Recruitment Pipeline, Performance Reviews, Employee Onboarding

**Features:**
- Calendar-view attendance with check-in/out times
- Bulk approve/reject leave requests
- Payslip PDF generation
- ATS-style recruitment pipeline (job post → applicant → interview → offer)
- 360° performance review system
- Digital onboarding checklist with task tracking

---

### 💰 Finance Module

**Pages:** Budget Overview, Expense Tracker, Invoice Manager, P&L Reports, Forecasts, Tax Reports

**Features:**
- Budget vs actual comparison charts
- Receipt OCR upload for expense claims
- Invoice PDF generation and sending
- Export to Excel / PDF
- Multi-currency support
- Monthly and quarterly P&L statements

---

### 📣 Marketing Module

**Pages:** Campaign Dashboard, SEO Analytics, Lead Tracker, Social Media, Email Analytics, ROI Reports

**Features:**
- Campaign CRUD with start/end dates and budget
- Google Analytics-style metrics integration
- Lead scoring and pipeline view
- Social media metrics (followers, engagement, reach)
- Email open rate, click rate tracking
- ROI calculation per campaign

---

### 💼 Sales Module

**Pages:** CRM Pipeline, Lead Management, Revenue Dashboard, Sales Targets, Commission Tracker, Call Logs

**Features:**
- Kanban-style CRM pipeline (Lead → Qualified → Proposal → Won/Lost)
- Lead scoring based on behavior
- Quota and target tracking per rep
- Commission calculation with rules engine
- Call recording integration and logs

---

### 🏢 CEO Module

**Pages:** Company Overview, Revenue Charts, Department KPIs, Headcount Analytics, AI Board Report, Strategy Tracker

**Features:**
- Cross-department data aggregation
- AI-generated executive board summaries
- Trend forecasting with historical comparison
- Benchmark comparison vs industry
- Strategy OKR tracker

---

### 🖥️ Live Monitoring Module

**Pages:** Screen Grid (multi-employee), Activity Timeline, App Usage Analytics, Browser History, Idle Detection, Alert Center

**Features:**
- Real-time multi-employee screenshot grid (up to 20 live feeds)
- Per-app productivity categorization (Productive / Neutral / Distracting)
- URL categorization and blocking alerts
- Idle threshold alerts (configurable)
- Full activity timeline per employee per day

---

### 📍 GPS Tracking Module

**Pages:** Live Map, Location History, Geofence Manager, Route Replay, GPS Attendance, Fleet Overview

**Features:**
- Google Maps integration with live employee pins
- Geofence creation (circle/polygon) with entry/exit alerts
- Route replay with timestamps
- GPS-based attendance (auto check-in on office entry)
- Field employee distance traveled reporting

---

### 🤖 AI Monitoring Module

**Pages:** Productivity Dashboard, Risk Heatmap, Anomaly Feed, Behavior Profiles, Model Health, Alert Rules

**Features:**
- Per-employee AI productivity scores (daily/weekly/monthly)
- Department-level risk ranking heatmap
- Anomaly timeline with explanations
- Configurable alert thresholds per rule
- AI model health monitoring (accuracy, drift)

---

### 🔒 Cybersecurity Module

**Pages:** Threat Dashboard, Login Monitor, Access Control Audit, Data Leakage Alerts, Security Reports

**Features:**
- Failed login tracking with IP geolocation
- Suspicious IP detection and blocking
- Sensitive data access audit log
- File download and print monitoring
- Weekly security posture report

---

### ⚙️ DevOps Module

**Pages:** Server Health, CI/CD Pipeline, Docker Containers, Kubernetes Pods, Error Logs, Cost Monitor

**Features:**
- Real-time CPU/memory/disk metrics per server
- Build status from GitHub Actions / Jenkins
- Docker container health and restart tracking
- Kubernetes pod status and resource usage
- Log aggregation and search
- Cloud cost tracking per service

---

### 🛡️ Admin Module

**Pages:** User Management, Role Assignment, Permission Matrix, System Settings, Audit Logs, Backup Manager

**Features:**
- Create, update, disable user accounts
- Drag-and-drop role builder
- Visual permission grid (role × permission)
- System-wide configuration panel
- Full audit trail: who did what and when
- Database backup trigger and history

---

## 9. Department Dashboards

| Dashboard | KPI Cards | Main Widgets | Quick Actions |
|-----------|-----------|--------------|---------------|
| **CEO** | Revenue, Employees, Growth %, Satisfaction | Revenue trend (12mo), Department radar, Headcount pie, AI summary | Export board report, View strategy |
| **HR** | Total Employees, Pending Leaves, Open Positions, Payroll Due | Attendance heatmap, Leave distribution, Recruitment funnel | Approve leaves, Run payroll, Post job |
| **Finance** | Monthly Revenue, Expenses, Net Profit, Budget % | Income vs expense bar, Cash flow line, Budget pie, P&L table | Create invoice, Approve expense, Export |
| **Manager** | Team Size, Active Projects, Tasks Due Today, Team Productivity % | Sprint burndown, Task status pie, Productivity trend, Gantt | Assign task, Schedule review, Sprint |
| **Tech Lead** | Commits Today, Bugs Open, Deploy Status, Velocity | Git activity graph, Sprint velocity, Bug severity, Coverage gauge | Create PR, Deploy, Code review |
| **Employee** | Tasks Today, Attendance Status, Leave Balance, Performance Score | My activity timeline, Task completion, Skill radar, Weekly hours | Clock in/out, Apply leave, Submit task |
| **Monitoring** | Active Employees, Avg Productivity, Alerts Today, Idle Count | Live screen grid, Activity heatmap, App ranking, Gauge | Screenshot, Send alert, View timeline |

---

## 10. Real-Time: WebSocket & Kafka

### 10.1 WebSocket Topics (STOMP)

| Topic | Publisher | Subscribers | Data Sent |
|-------|-----------|-------------|-----------|
| `/topic/monitoring/{empId}` | Monitoring Service | Admin, Manager | Live activity, screenshots, idle status |
| `/topic/gps/{empId}` | GPS Service | Admin, Manager, GPS Module | Current lat/lng, speed, accuracy |
| `/topic/notifications/{userId}` | Notification Service | Specific user only | Alert message, type, timestamp |
| `/topic/alerts` | AI Service, Security | Admin, Security team | Risk alerts, anomalies, threats |
| `/topic/dashboard/ceo` | Analytics Service | CEO role | Real-time revenue, headcount |
| `/topic/deployment` | DevOps Service | TechLead, DevOps | Build status, deployment progress |

### 10.2 Kafka Topics

| Topic | Produced By | Consumed By | Purpose |
|-------|-------------|-------------|---------|
| `employee.created` | Employee Service | HR Service, Notification | Trigger onboarding flow, send welcome email |
| `attendance.checked-in` | Attendance Service | Analytics, GPS | Update live dashboard, verify location |
| `monitoring.screenshot` | Monitoring Service | AI Violence Detector | Async AI analysis of screenshot |
| `monitoring.activity` | Monitoring Service | Productivity AI, Analytics | Activity logs → productivity score |
| `gps.location` | GPS Service | Analytics, Geofence Service | Process location, check geofences |
| `security.alert` | Cybersecurity Service | Notification, Audit | Persist alert, notify security team |
| `report.generate` | Scheduler | Report Service | Trigger daily/weekly report generation |

---

## 11. Roles & Permissions (RBAC Matrix)

| Permission | SUPER_ADMIN | CEO | HR_MGR | FIN_MGR | PRJ_MGR | TECH_LEAD | SW_ENG | EMPLOYEE |
|-----------|:-----------:|:---:|:------:|:-------:|:-------:|:---------:|:------:|:--------:|
| `CREATE_USER` | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `UPDATE_USER` | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ |
| `DELETE_USER` | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `VIEW_REPORT` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| `MANAGE_EMPLOYEE` | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ |
| `TRACK_EMPLOYEE` | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| `VIEW_ANALYTICS` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| `MANAGE_FINANCE` | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| `MANAGE_PROJECT` | ✅ | ✅ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ |
| `VIEW_GPS` | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| `EXPORT_REPORT` | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| `AI_ACCESS` | ✅ | ✅ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ |
| `ADMIN_ACCESS` | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

---

## 12. Frontend Developer Guide

### 12.1 Development Setup

```bash
# Prerequisites: Node.js 18+, npm / yarn / pnpm

# 1. Clone and install
git clone <repo-url>
cd frontend
npm install

# 2. Setup environment
cp .env.example .env
# Edit .env with your local values

# 3. Start development server
npm run dev          # → http://localhost:5173
npm run build        # → production build in /dist
npm run preview      # → preview production build locally
npm run lint         # → ESLint check
npm run test         # → Jest + React Testing Library
```

### 12.2 Environment Variables (Frontend)

```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
VITE_WS_URL=ws://localhost:8080/ws
VITE_AI_URL=http://localhost:5000
VITE_GOOGLE_MAPS_KEY=your_google_maps_api_key
VITE_ENVIRONMENT=development
VITE_ENABLE_GPS_TRACKING=true
VITE_ENABLE_SCREEN_MONITORING=true
VITE_ENABLE_AI_FEATURES=true
VITE_SESSION_TIMEOUT_MINUTES=30
```

### 12.3 Code Conventions

| Convention | Rule |
|-----------|------|
| File naming | PascalCase for components, camelCase for utils/services/hooks |
| Component structure | Imports → Constants → Component → Export (always in this order) |
| State management | Local state (`useState`) for UI only. Server data goes in Redux. |
| API calls | Only in Redux Sagas — never call fetch/axios directly in components |
| Error handling | Global error boundary + per-request error state in Redux slice |
| Lazy loading | All module-level page components must use `React.lazy()` |
| Testing | Unit test all utils/helpers. Integration test all sagas. |

### 12.4 Adding a New Module (Step-by-Step)

```bash
# Step 1: Create folder structure
mkdir -p src/modules/yourmodule/{pages,components,services,redux,routes}

# Step 2: Create Redux slice
# src/modules/yourmodule/redux/yourmoduleSlice.js
# → initial state, reducers, exported actions

# Step 3: Create Saga
# src/modules/yourmodule/redux/yourmoduleSaga.js
# → watchYourModule() + workerFunctions()

# Step 4: Register in root
# rootReducer.js → add yourmoduleReducer
# rootSaga.js    → add yourmoduleSaga

# Step 5: Create API file
# src/api/yourmodule/yourmoduleApi.js

# Step 6: Add routes in AppRoutes.jsx
# Wrap with <ProtectedRoute> + <RoleBasedRoute allowedRoles={[...]} />

# Step 7: Add nav item to relevant Layout sidebar
```

### 12.5 Route Guard Usage

```jsx
// Protect by authentication only
<ProtectedRoute>
  <EmployeeDashboard />
</ProtectedRoute>

// Protect by role
<RoleBasedRoute allowedRoles={['HR_MANAGER', 'ADMIN']}>
  <PayrollPage />
</RoleBasedRoute>

// Protect by specific permission
<PermissionRoute requiredPermission="VIEW_ANALYTICS">
  <AnalyticsWidget />
</PermissionRoute>
```

---

## 13. UI/UX Designer Guide

### 13.1 Design Principles

1. **Data Density First** — Enterprise users need information-dense layouts. Avoid excessive whitespace.
2. **Role-Contextual** — Each role's dashboard should feel purpose-built. CEO sees revenue charts; engineers see git metrics.
3. **Action-Oriented** — Primary actions must be immediately visible. Users should never hunt for the main CTA.
4. **Progressive Disclosure** — Show summary first, details on demand. Use modals, drawers, and expand panels.
5. **Real-Time Feedback** — Monitoring data updates live. Use smooth value-change animations, not jarring refreshes.
6. **Accessibility** — WCAG 2.1 AA minimum. Sufficient contrast ratios, full keyboard navigation, screen reader labels.

### 13.2 Color Palette

| Role | Hex | Usage |
|------|-----|-------|
| Primary (Navy) | `#1E3A5F` | Sidebar background, headings, primary text |
| Accent Blue | `#2563EB` | CTAs, links, active nav items, key metrics |
| Sky Blue | `#0EA5E9` | Charts line 1, info badges, highlights |
| Emerald Green | `#10B981` | Success states, positive trends, active status |
| Purple | `#8B5CF6` | AI features, predictions, analytics |
| Amber | `#F59E0B` | Warnings, medium risk, pending states |
| Red | `#EF4444` | Errors, high risk, danger alerts, delete |
| Slate Gray | `#64748B` | Secondary text, labels, disabled states |
| Light Blue BG | `#EFF6FF` | Info panels, card backgrounds, alt rows |
| White | `#FFFFFF` | Page background, card surface, modal |

### 13.3 Typography Scale

| Element | Size | Weight | Usage |
|---------|------|--------|-------|
| Page Title | 28–32px | Bold 700 | Dashboard name, module name at top |
| Section Heading | 20–24px | SemiBold 600 | Card titles, section headers |
| Subheading | 16–18px | Medium 500 | Widget labels, tab names, form sections |
| Body Text | 14–15px | Regular 400 | Descriptions, form labels, table cells |
| Small / Caption | 12–13px | Regular 400 | Timestamps, helper text, chart axes |
| Micro | 10–11px | Medium 500 | Badges, status pills, tags |

### 13.4 Spacing System (8px Base Grid)

```
xs:  4px   → icon gaps, tight row spacing
sm:  8px   → between form elements, list items
md:  16px  → component padding, card inner padding
lg:  24px  → section spacing, card margin
xl:  32px  → page margin, major section separation
2xl: 48px  → page top padding, hero spacing
```

### 13.5 Component Design Specs

| Component | Spec |
|-----------|------|
| **Stat Card** | 16px padding, 8px border-radius, shadow `0 2px 8px rgba(0,0,0,0.08)`, icon top-right, trend indicator bottom |
| **Data Table** | Sticky header, 44px row height, alternating row bg `#F8FAFC`, hover highlight, checkbox for bulk select |
| **Sidebar** | 240px wide (collapsed: 64px icon-only), dark navy bg, white text/icons, active item = accent blue bg + left 3px border |
| **Topbar** | 64px height, white bg, subtle bottom border, search center, notifications + user menu right |
| **Modal** | 480px default width, 24px padding, blurred backdrop overlay, close button top-right, footer with action buttons |
| **Form Input** | 40px height, 8px border-radius, focus ring accent blue, error = red border + helper text below |
| **Button (Primary)** | 40px height, 16px horizontal padding, accent blue bg, white text, hover darken 10%, loading spinner state |
| **Badge / Tag** | 20px height, 8px horizontal padding, 4px border-radius, color-coded (green / amber / red / blue) |
| **Chart Card** | White bg, 16px padding, title + subtitle + time filter top, chart area, legend bottom, export button |

### 13.6 Responsive Breakpoints

| Breakpoint | Width | Layout Behavior |
|-----------|-------|----------------|
| Mobile (sm) | < 640px | Single column. Sidebar hidden (hamburger menu). Cards stack vertically. |
| Tablet (md) | 640–1024px | Sidebar collapsed (icon-only). 2-column card grid. |
| Laptop (lg) | 1024–1440px | Full sidebar. 3–4 column card grid. Standard dashboard layout. |
| Desktop (xl) | > 1440px | Wide sidebar. 4–6 column card grid. More data visible per screen. |

---

## 14. API Reference

### 14.1 Base URL

```
Development:  http://localhost:8080/api/v1
Production:   https://api.yourdomain.com/api/v1
```

### 14.2 Authentication Headers

```
Authorization: Bearer <accessToken>
Content-Type:  application/json
```

### 14.3 Key Endpoints

| Method | Endpoint | Role Required | Description |
|--------|----------|--------------|-------------|
| `POST` | `/auth/login` | None | Login. Returns accessToken + refreshToken |
| `POST` | `/auth/refresh` | refreshToken | Get new accessToken |
| `POST` | `/auth/mfa/verify` | Partial auth | Verify MFA OTP |
| `POST` | `/auth/logout` | accessToken | Blacklist refreshToken in Redis |
| `GET` | `/employee?page=0&size=20` | HR_MANAGER+ | Paginated employee list |
| `POST` | `/employee` | HR_MANAGER+ | Create new employee |
| `GET` | `/employee/{id}` | Manager+ | Get employee detail |
| `PUT` | `/employee/{id}` | HR_MANAGER+ | Update employee |
| `GET` | `/hr/attendance?date=2024-01-01` | HR_MANAGER+ | Daily attendance records |
| `GET` | `/monitoring/live/{empId}` | ADMIN+ | Latest monitoring data |
| `POST` | `/monitoring/screenshot` | System | Upload screenshot from client agent |
| `GET` | `/gps/location/{empId}` | Manager+ | Latest GPS coordinates |
| `GET` | `/analytics/productivity?dept=Engineering` | Manager+ | Productivity metrics |
| `GET` | `/ai/prediction/{empId}` | Manager+ | AI productivity prediction |
| `GET` | `/reports/generate?type=monthly&dept=HR` | Manager+ | Generate department report |
| `GET` | `/admin/audit-logs?page=0` | ADMIN+ | System audit log |

### 14.4 Standard Response Format

```json
// Success
{
  "success": true,
  "data": { ... },
  "message": "Employee created successfully",
  "timestamp": "2024-01-01T10:00:00Z"
}

// Error
{
  "success": false,
  "error": "EMPLOYEE_NOT_FOUND",
  "message": "Employee with ID 123 not found",
  "timestamp": "2024-01-01T10:00:00Z"
}

// Paginated List
{
  "success": true,
  "data": {
    "content": [ ... ],
    "page": 0,
    "size": 20,
    "totalElements": 450,
    "totalPages": 23
  }
}
```

---

## 15. DevOps & Deployment

### 15.1 Docker Compose Services

| Service | Image | Port | Purpose |
|---------|-------|------|---------|
| frontend | Custom (node:18) | 5173 | React dev server (hot reload) |
| backend | Custom (openjdk:17) | 8080 | Spring Boot API server |
| postgres | postgres:15 | 5432 | Primary PostgreSQL database |
| redis | redis:7-alpine | 6379 | Cache, sessions, pub/sub |
| kafka | confluentinc/cp-kafka | 9092 | Event streaming |
| zookeeper | confluentinc/cp-zookeeper | 2181 | Kafka coordination |
| nginx | nginx:alpine | 80, 443 | Reverse proxy, SSL, static files |
| ai-services | Custom (python:3.11) | 5000–5008 | Each AI service on its own port |

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop all
docker-compose down
```

### 15.2 DevOps Folder Structure

```
docker/
├── frontend/           ← Dockerfile for React build
├── backend/            ← Dockerfile for Spring Boot JAR
├── nginx/              ← nginx.conf, SSL certs
├── postgres/           ← init scripts, pg_hba.conf
├── redis/              ← redis.conf
├── kafka/              ← server.properties
└── monitoring/         ← Prometheus + Grafana config

deployment/
├── kubernetes/         ← K8s manifests (Deployment, Service, Ingress)
├── aws/                ← ECS / EKS configs, ALB setup
├── azure/              ← AKS configs
├── gcp/                ← GKE configs
├── ci-cd/              ← GitHub Actions YAML workflows
└── terraform/          ← Infrastructure as Code
```

### 15.3 CI/CD Pipeline (GitHub Actions)

```yaml
Trigger: Push to main OR Pull Request

Jobs:
  1. test-frontend
     → npm install → npm run lint → npm run test

  2. test-backend
     → mvn test (JUnit 5 + Mockito)

  3. build-and-push  (main only)
     → docker build frontend → push to ECR
     → docker build backend  → push to ECR

  4. deploy-staging
     → kubectl apply -f k8s/staging/
     → Run integration tests

  5. deploy-production  (manual approval required)
     → kubectl apply -f k8s/production/
     → Smoke tests → Notify team on Slack
```

---

## 16. Environment Variables

### 16.1 Frontend `.env`

```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
VITE_WS_URL=ws://localhost:8080/ws
VITE_AI_URL=http://localhost:5000
VITE_GOOGLE_MAPS_KEY=your_google_maps_api_key
VITE_ENVIRONMENT=development
VITE_ENABLE_GPS_TRACKING=true
VITE_ENABLE_SCREEN_MONITORING=true
VITE_ENABLE_AI_FEATURES=true
VITE_SESSION_TIMEOUT_MINUTES=30
VITE_MAX_FILE_UPLOAD_MB=10
```

### 16.2 Backend `application.yml`

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/enterprise_db
    username: postgres
    password: ${DB_PASSWORD}

  redis:
    host: localhost
    port: 6379
    password: ${REDIS_PASSWORD}

  kafka:
    bootstrap-servers: localhost:9092
    consumer:
      group-id: enterprise-group

jwt:
  secret: ${JWT_SECRET}          # Min 512-bit key for HS512
  access-token-expiry: 900       # 15 minutes in seconds
  refresh-token-expiry: 604800   # 7 days in seconds

ai:
  service:
    url: http://localhost:5000

cors:
  allowed-origins: http://localhost:5173

monitoring:
  screenshot-interval-seconds: 300   # Screenshot every 5 minutes
  activity-sample-seconds: 60        # App/URL log every 1 minute

gps:
  tracking-interval-seconds: 60      # GPS ping every 1 minute
```

---

## 17. Best Practices & Conventions

### 🔐 Security

| Practice | Reason |
|---------|--------|
| Never store JWT in `localStorage` — use `httpOnly` cookies for refresh tokens | XSS attacks can steal `localStorage`; `httpOnly` is inaccessible to JavaScript |
| Hash passwords with BCrypt (strength 12) — never MD5 or plain | BCrypt is deliberately slow, making brute-force impractical |
| Rate limit login endpoint (5 attempts per 15 min via Redis) | Prevent credential brute-force attacks |
| Always use `@PreAuthorize` on every controller method | Defense in depth — don't rely on route guards alone |
| Soft delete (`deleted_at`) instead of hard delete | Data recovery, audit trail, referential integrity |

### ⚡ Frontend

| Practice | Reason |
|---------|--------|
| Lazy load all module routes with `React.lazy()` | Reduces initial bundle size — only load code users need |
| Use `React.memo` for expensive list components | Prevents unnecessary re-renders in large data tables |
| Debounce all search inputs (300–500ms) | Prevents API flooding on every keystroke |
| Show skeleton loading states, not spinners | Better perceived performance — user sees layout immediately |
| Never call `fetch`/`axios` directly inside components | Keep all async logic in sagas for testability and consistency |

### 🏗️ Backend

| Practice | Reason |
|---------|--------|
| `@Transactional(readOnly=true)` for all SELECT queries | Enables DB optimizations, prevents accidental writes |
| Return `Page<DTO>` for all list endpoints — never return full lists | Prevents memory issues with large datasets |
| Log all sensitive operations with `AuditLog` | Compliance, forensics, debugging |
| Throw custom exceptions — never return `null` | Predictable error handling throughout the stack |
| Interface + Implementation pattern for all services | Easier mocking in tests, supports dependency inversion |

### 🗃️ Database

| Practice | Reason |
|---------|--------|
| Index all foreign keys and frequently filtered columns | Drastically improves query performance at scale |
| Use `UUID` as primary keys, not auto-increment integers | Avoids sequential ID guessing; better for distributed systems |
| Partitioned tables for `activity_logs` and `gps_locations` (by month) | These tables grow fastest; partitioning keeps queries fast |
| Regular vacuum and analyze for PostgreSQL | Prevents table bloat, keeps query planner statistics fresh |

### 🤖 AI Services

| Practice | Reason |
|---------|--------|
| Run all AI inference **asynchronously via Kafka** — never block the API | AI inference takes 100ms–5s; must not block user requests |
| Store AI results in DB, serve cached results to frontend | Avoid re-running expensive inference on every page load |
| Version your ML models and log predictions | Enables rollback, A/B testing, and accuracy tracking |

### 🐳 DevOps

| Practice | Reason |
|---------|--------|
| Use Kubernetes resource limits on all containers | Prevents one service from starving others of CPU/memory |
| Store all secrets in environment variables / Vault — never hardcode | Secrets in code = security breach waiting to happen |
| Use multi-stage Docker builds for frontend and backend | Smaller final image size, faster deployments |
| Health check endpoints on every service | Kubernetes and load balancers need these for routing |

---

## 🚀 Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/your-org/enterprise-platform.git
cd enterprise-platform

# 2. Start all infrastructure with Docker Compose
docker-compose up -d postgres redis kafka zookeeper

# 3. Start backend
cd backend
cp src/main/resources/application-dev.yml.example src/main/resources/application-dev.yml
mvn spring-boot:run -Dspring-boot.run.profiles=dev

# 4. Start frontend
cd frontend
cp .env.example .env
npm install
npm run dev

# 5. Start AI services (optional)
cd ai-services/productivity-prediction
pip install -r requirements.txt
uvicorn main:app --reload --port 5001

# 6. Open in browser
http://localhost:5173

# Default login (dev only)
Email:    admin@enterprise.com
Password: Admin@1234
Role:     SUPER_ADMIN
```

---

## 📞 Support & Contact

For questions, open an issue or contact the platform engineering team.

---

*Enterprise Monitoring & Analytics Platform — Built for MNC-scale companies*
*React + Spring Boot + PostgreSQL + Redis + Kafka + AI Services*
