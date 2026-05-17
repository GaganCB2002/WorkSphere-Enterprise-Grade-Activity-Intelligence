-- ====================================================================
-- Enterprise RBAC Seed Script (Roles, Permissions, Role-Permissions)
-- ====================================================================

-- 1. Insert 18 Enterprise Roles
INSERT INTO roles (id, name, description) VALUES 
(1, 'SUPER_ADMIN', 'Super Administrator with unrestricted access'),
(2, 'ADMIN', 'System Administrator'),
(3, 'CEO', 'Chief Executive Officer'),
(4, 'CTO', 'Chief Technology Officer'),
(5, 'HR_MANAGER', 'Human Resources Manager'),
(6, 'HR_EXECUTIVE', 'Human Resources Executive'),
(7, 'FINANCE_MANAGER', 'Finance & Accounts Manager'),
(8, 'MARKETING_MANAGER', 'Marketing Department Manager'),
(9, 'SALES_MANAGER', 'Sales Department Manager'),
(10, 'PROJECT_MANAGER', 'Project Management Officer'),
(11, 'TECH_LEAD', 'Technical Lead'),
(12, 'DEVOPS_ENGINEER', 'DevOps & Infrastructure Engineer'),
(13, 'QA_ENGINEER', 'Quality Assurance Engineer'),
(14, 'SOFTWARE_ENGINEER', 'Software Development Engineer'),
(15, 'SECURITY_ANALYST', 'Cybersecurity & Compliance Analyst'),
(16, 'SUPPORT_AGENT', 'IT & Customer Support Agent'),
(17, 'EMPLOYEE', 'Standard Enterprise Employee'),
(18, 'INTERN', 'Intern / Trainee')
ON CONFLICT (name) DO NOTHING;

-- 2. Insert 13 Granular Permissions
INSERT INTO permissions (id, name, description) VALUES 
(1, 'CREATE_USER', 'Ability to create new enterprise user accounts'),
(2, 'UPDATE_USER', 'Ability to modify existing user profiles and roles'),
(3, 'DELETE_USER', 'Ability to deactivate or delete user accounts'),
(4, 'VIEW_REPORT', 'Access to view departmental and compliance reports'),
(5, 'MANAGE_EMPLOYEE', 'Ability to manage employee organizational hierarchy'),
(6, 'TRACK_EMPLOYEE', 'Access to live workstation telemetry and screenshots'),
(7, 'VIEW_ANALYTICS', 'Access to enterprise productivity and burnout analytics'),
(8, 'MANAGE_FINANCE', 'Access to financial ledgers and payroll management'),
(9, 'MANAGE_PROJECT', 'Ability to create and manage enterprise projects'),
(10, 'VIEW_GPS', 'Access to hardware-enforced live GPS tracking feeds'),
(11, 'EXPORT_REPORT', 'Ability to export forensic and audit reports (PDF/CSV)'),
(12, 'AI_ACCESS', 'Access to AI inference insights (violence, anomaly, sentiment)'),
(13, 'ADMIN_ACCESS', 'Access to administrative system settings and gateways')
ON CONFLICT (name) DO NOTHING;

-- 3. Map Permissions to Roles (Sample Enterprise Matrix)
-- SUPER_ADMIN (Role 1) gets all 13 permissions
INSERT INTO role_permissions (role_id, permission_id) VALUES 
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8), (1, 9), (1, 10), (1, 11), (1, 12), (1, 13),

-- CEO (Role 3) gets strategic & executive permissions
(3, 4), (3, 6), (3, 7), (3, 8), (3, 9), (3, 10), (3, 11), (3, 12), (3, 13),

-- HR_MANAGER (Role 5) gets employee management permissions
(5, 1), (5, 2), (5, 4), (5, 5), (5, 6), (5, 7), (5, 11),

-- FINANCE_MANAGER (Role 7) gets finance permissions
(7, 4), (7, 7), (7, 8), (7, 11),

-- PROJECT_MANAGER (Role 10) gets project & tracking permissions
(10, 4), (10, 6), (10, 7), (10, 9),

-- SECURITY_ANALYST (Role 15) gets tracking, AI, and report permissions
(15, 4), (15, 6), (15, 10), (15, 11), (15, 12),

-- EMPLOYEE (Role 17) gets basic view permissions
(17, 4)
ON CONFLICT (role_id, permission_id) DO NOTHING;

-- 4. Seed Default Super Admin User (password: admin123 hashed via bcrypt)
INSERT INTO users (id, username, password, email, is_active) VALUES 
(1, 'superadmin', '$2a$12$LQxV/G1pD2y4.A.u1zV8e.0W9T/U5mK/5i1wY2qX3rZ4tE5vF6wG', 'admin@worksphere.com', true)
ON CONFLICT (username) DO NOTHING;

INSERT INTO user_roles (user_id, role_id) VALUES (1, 1) ON CONFLICT (user_id, role_id) DO NOTHING;
