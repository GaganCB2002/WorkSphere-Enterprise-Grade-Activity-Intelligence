# 🏛️ WorkSphere Enterprise-Grade Activity Intelligence: 7-Tier Architecture Specification

```mermaid
graph TD
    %% Tier 1: Users & Clients
    subgraph Tier1 [1. Users & Client Layer]
        U1[Web Browser / Next.js Client]
        U2[React Native Mobile App]
        U3[WinRT Desktop C# Telemetry Agent]
    end

    %% Tier 2: Frontend
    subgraph Tier2 [2. Frontend Application Core]
        F1[React 18 / Vite SPA]
        F2[Redux Toolkit & Redux Saga State]
        F3[Tailwind CSS v4 Design System]
    end

    %% Tier 3: API Gateway
    subgraph Tier3 [3. API Gateway & Edge Layer]
        G1[Nginx Reverse Proxy & SSL Termination]
        G2[Spring Cloud Gateway :8080]
        G3[Rate Limiting & Security Filters]
    end

    %% Tier 4: Microservices
    subgraph Tier4 [4. Core Microservices Cluster]
        M1[Auth Service :8081]
        M2[Employee Service :8082]
        M3[HR Service :8083]
        M4[Analytics Service :8084]
        M5[Notification Service :8086]
        M6[Monitoring Service :8087]
        M7[GPS Tracking Service :8088]
        M8[Report Service :8089]
    end

    %% Tier 5: AI Services
    subgraph Tier5 [5. AI Intelligence Cluster]
        AI1[FastAPI AI Gateway :8085]
        AI2[PyTorch Violence Detection DNN]
        AI3[Isolation Forest Anomaly Detection]
        AI4[NLP Sentiment & Burnout Analysis]
        AI5[Facial Recognition & Biometrics]
    end

    %% Tier 6: Persistence & Messaging
    subgraph Tier6 [6. Persistence & Event Streaming]
        DB[(PostgreSQL 15 Relational DBs)]
        CACHE[(Redis 7 Distributed Cache)]
        KAFKA[Apache Kafka 7.5 Event Bus]
    end

    %% Tier 7: Analytics Engine
    subgraph Tier7 [7. Analytics & Aggregation Engine]
        AE1[Time-Series Productivity Cruncher]
        AE2[Forensic Audit & Compliance Engine]
        AE3[Burnout Risk Scoring Engine]
    end

    %% Edge Connections
    Tier1 -->|HTTPS / WSS / REST| Tier2
    Tier2 -->|API Requests / Bearer JWT| Tier3
    G1 --> G2
    G2 -->|Route Predicates| Tier4
    Tier4 <-->|gRPC / REST / Feign| Tier5
    Tier4 -->|JPA / JDBC / Lettuce| Tier6
    Tier5 -->|Tensor Output / Features| Tier6
    Tier6 -->|Debezium / Kafka Streams| Tier7
    Tier7 -->|Aggregated Data Views| Tier4

    classDef default fill:#0f172a,stroke:#334155,stroke-width:2px,color:#f8fafc;
    classDef highlight fill:#1e293b,stroke:#6366f1,stroke-width:2px,color:#ffffff;
    classDef database fill:#065f46,stroke:#34d399,stroke-width:2px,color:#ffffff;
    classDef ai fill:#701a75,stroke:#f472b6,stroke-width:2px,color:#ffffff;

    class Tier1,Tier2,Tier3 highlight;
    class Tier4 default;
    class Tier5 ai;
    class Tier6 database;
    class Tier7 highlight;
```

---

## 🔬 Architectural Tier Breakdown

### Tier 1: Users & Client Layer
The entry point to the WorkSphere ecosystem spans multiple form factors and operating environments:
- **Web Clients**: Executives, HR Managers, and Department Leads accessing the platform via high-fidelity Next.js 16 / React 18 web portals.
- **Mobile Clients**: On-the-go personnel utilizing the React Native / Expo mobile application for instant push notifications and executive summaries.
- **Desktop Agents**: Enterprise Windows workstations running the WinRT C#/C++ background telemetry daemon, capturing high-precision active window titles, keystroke frequencies, and hardware-locked GPS coordinates.

### Tier 2: Frontend Application Core
Consolidated under `apps/enterprise-monitoring-system/frontend/`, the frontend operates as a highly optimized Single Page Application (SPA) powered by Vite and React 18:
- **State Management**: Redux Toolkit provides central slice stores (`authSlice`, `monitoringSlice`), while Redux Saga orchestrates complex, asynchronous side effects (e.g., background WebSocket reconnection loops).
- **Design System**: Built on Tailwind CSS v4 and Lucide React icons, implementing dark-mode glassmorphism, biometric login animations, and E2E encryption verification badges.
- **Routing Governance**: Secured via custom higher-order route wrappers (`ProtectedRoute`, `RoleBasedRoute`, `PermissionRoute`) evaluating 18 distinct enterprise roles and 13 granular RBAC permissions.

### Tier 3: API Gateway & Edge Layer
All incoming client traffic is intercepted at the enterprise edge before reaching internal microservices:
- **Nginx Reverse Proxy**: Handles SSL/TLS termination, static asset caching, gzip compression, and initial HTTP request sanitization.
- **Spring Cloud Gateway (`gateway-service:8080`)**: Operates as the central routing backbone. Configured with declarative path predicates (`/api/v1/auth/**`, `/api/v1/employee/**`), it enforces global rate limiting, CORS headers, and initial JWT structural validation.

### Tier 4: Core Microservices Cluster
The business logic of WorkSphere is decoupled into 10 highly specialized, containerized Spring Boot 3 microservices:
- **Auth Service (`:8081`)**: Manages biometric verification workflows, user registration, bcrypt password hashing, and JWT issuance/revocation.
- **Employee Service (`:8082`)**: Maintains organizational hierarchies, department transfers, and designation mappings.
- **HR Service (`:8083`)**: Handles leave requests, attendance logs, and payroll integrations.
- **Analytics Service (`:8084`)**: Ingests raw telemetry to calculate daily productivity percentages and active work hours.
- **Monitoring Service (`:8087`)**: High-throughput ingestion endpoint for WinRT desktop agent telemetry and secure screenshot URL logging.
- **GPS Tracking Service (`:8088`)**: Processes hardware-enforced spatial coordinates, calculating distance traveled and geofence breaches.
- **Report & Notification Services (`:8089`, `:8086`)**: Generates forensic PDF/CSV audit reports and dispatches real-time WebSocket alerts/emails.

### Tier 5: AI Intelligence Cluster
A dedicated Python FastAPI microservices cluster (`ai-service:8085`) powering real-time artificial intelligence inference:
- **Violence Detection**: PyTorch Deep Neural Network analyzing CCTV and webcam video streams for physical aggression and weapon detection.
- **Anomaly Detection**: Unsupervised Scikit-Learn Isolation Forest models establishing baseline employee behavior and flagging irregular file downloads or unauthorized access.
- **Sentiment & Burnout Analysis**: Transformer-based NLP models evaluating enterprise chat and webmail text to predict employee burnout risk scores and team morale.
- **Facial Recognition**: Biometric zero-input facial verification engine preventing workstation spoofing and unauthorized physical access.

### Tier 6: Persistence & Event Streaming
A robust, highly available data storage and messaging backbone designed for zero data loss:
- **PostgreSQL 15**: Relational storage sharded across multiple isolated databases (`worksphere_auth`, `worksphere_employee`, `worksphere_monitoring`), enforcing strict foreign key constraints and PL/pgSQL automated audit timestamps (`updated_at`).
- **Redis 7**: In-memory data store utilized for distributed caching, active user session management, JWT blacklist tracking, and high-speed pub/sub messaging.
- **Apache Kafka 7.5**: Enterprise event streaming platform. Acts as the central nervous system, decoupling microservices via asynchronous message topics (`telemetry.ingested`, `alert.triggered`, `user.authenticated`).

### Tier 7: Analytics & Aggregation Engine
The analytical powerhouse of the platform, continuously consuming Kafka event streams to generate actionable executive intelligence:
- **Time-Series Productivity Cruncher**: Aggregates high-frequency keystroke and active window telemetry into minute-by-minute productivity indices.
- **Burnout Risk Scoring Engine**: Correlates excessive overtime hours, declining keystroke rates, and negative chat sentiment to calculate predictive employee burnout scores.
- **Forensic Audit Engine**: Generates cryptographically verifiable compliance logs and executive summaries for legal and internal audit teams.

---

## 🔄 End-to-End Request Flow Sequence

```mermaid
sequenceDiagram
    autonumber
    actor User as Client (Web/Mobile/Agent)
    participant Edge as Nginx / API Gateway
    participant Auth as Auth Microservice
    participant Kafka as Apache Kafka Bus
    participant Service as Core Microservice (e.g. Monitoring)
    participant AI as AI Cluster (FastAPI/PyTorch)
    participant DB as PostgreSQL / Redis

    User->>Edge: POST /api/v1/auth/login (Biometric/Credentials)
    Edge->>Auth: Route Request (Port 8081)
    Auth->>DB: Verify User & RBAC Permissions
    DB-->>Auth: User Verified (SUPER_ADMIN)
    Auth->>Kafka: Publish Event [user.authenticated]
    Auth-->>Edge: Return Signed Bearer JWT
    Edge-->>User: 200 OK + JWT Token

    User->>Edge: POST /api/v1/monitoring/telemetry + Bearer JWT
    Edge->>Edge: Validate JWT & Rate Limit
    Edge->>Service: Route Telemetry (Port 8087)
    Service->>Kafka: Publish Event [telemetry.ingested]
    Service->>DB: Persist Raw Telemetry Row
    Service-->>Edge: 202 Accepted
    Edge-->>User: Telemetry Logged Successfully

    Kafka->>AI: Consume [telemetry.ingested] Stream
    AI->>AI: Execute PyTorch/Isolation Forest Inference
    alt Anomaly / Violence Detected (Confidence > 0.85)
        AI->>Kafka: Publish Event [alert.triggered]
        Kafka->>Service: Trigger WebSocket Broadcast
        Service-->>User: WSS Push Notification (SECURITY ALERT!)
    end
```
