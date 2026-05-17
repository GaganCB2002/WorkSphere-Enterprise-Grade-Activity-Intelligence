/**
 * @file permissions.js
 * @description Centralized enterprise RBAC permission constants and validation utilities.
 */

export const PERMISSIONS = {
  CREATE_USER: 'CREATE_USER',
  UPDATE_USER: 'UPDATE_USER',
  DELETE_USER: 'DELETE_USER',
  VIEW_REPORT: 'VIEW_REPORT',
  MANAGE_EMPLOYEE: 'MANAGE_EMPLOYEE',
  TRACK_EMPLOYEE: 'TRACK_EMPLOYEE',
  VIEW_ANALYTICS: 'VIEW_ANALYTICS',
  MANAGE_FINANCE: 'MANAGE_FINANCE',
  MANAGE_PROJECT: 'MANAGE_PROJECT',
  VIEW_GPS: 'VIEW_GPS',
  EXPORT_REPORT: 'EXPORT_REPORT',
  AI_ACCESS: 'AI_ACCESS',
  ADMIN_ACCESS: 'ADMIN_ACCESS',
};

export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  CEO: 'CEO',
  CTO: 'CTO',
  HR_MANAGER: 'HR_MANAGER',
  HR_EXECUTIVE: 'HR_EXECUTIVE',
  FINANCE_MANAGER: 'FINANCE_MANAGER',
  MARKETING_MANAGER: 'MARKETING_MANAGER',
  SALES_MANAGER: 'SALES_MANAGER',
  PROJECT_MANAGER: 'PROJECT_MANAGER',
  TECH_LEAD: 'TECH_LEAD',
  DEVOPS_ENGINEER: 'DEVOPS_ENGINEER',
  QA_ENGINEER: 'QA_ENGINEER',
  SOFTWARE_ENGINEER: 'SOFTWARE_ENGINEER',
  SECURITY_ANALYST: 'SECURITY_ANALYST',
  SUPPORT_AGENT: 'SUPPORT_AGENT',
  EMPLOYEE: 'EMPLOYEE',
  INTERN: 'INTERN',
};

/**
 * Enterprise Role-Permission Mapping Matrix
 */
export const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: Object.values(PERMISSIONS),
  [ROLES.CEO]: [
    PERMISSIONS.VIEW_REPORT,
    PERMISSIONS.TRACK_EMPLOYEE,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.MANAGE_FINANCE,
    PERMISSIONS.MANAGE_PROJECT,
    PERMISSIONS.VIEW_GPS,
    PERMISSIONS.EXPORT_REPORT,
    PERMISSIONS.AI_ACCESS,
    PERMISSIONS.ADMIN_ACCESS,
  ],
  [ROLES.HR_MANAGER]: [
    PERMISSIONS.CREATE_USER,
    PERMISSIONS.UPDATE_USER,
    PERMISSIONS.VIEW_REPORT,
    PERMISSIONS.MANAGE_EMPLOYEE,
    PERMISSIONS.TRACK_EMPLOYEE,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.EXPORT_REPORT,
  ],
  [ROLES.FINANCE_MANAGER]: [
    PERMISSIONS.VIEW_REPORT,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.MANAGE_FINANCE,
    PERMISSIONS.EXPORT_REPORT,
  ],
  [ROLES.PROJECT_MANAGER]: [
    PERMISSIONS.VIEW_REPORT,
    PERMISSIONS.TRACK_EMPLOYEE,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.MANAGE_PROJECT,
  ],
  [ROLES.SECURITY_ANALYST]: [
    PERMISSIONS.VIEW_REPORT,
    PERMISSIONS.TRACK_EMPLOYEE,
    PERMISSIONS.VIEW_GPS,
    PERMISSIONS.EXPORT_REPORT,
    PERMISSIONS.AI_ACCESS,
  ],
  [ROLES.EMPLOYEE]: [PERMISSIONS.VIEW_REPORT],
};

/**
 * Validates if a user has the required permission.
 * @param {Object} user - The authenticated user object containing role or permissions.
 * @param {string} requiredPermission - The permission required for access.
 * @returns {boolean} True if authorized, false otherwise.
 */
export const hasPermission = (user, requiredPermission) => {
  if (!user) return false;

  // If user object explicitly contains permissions array
  if (Array.isArray(user.permissions) && user.permissions.includes(requiredPermission)) {
    return true;
  }

  // Fallback to Role-Based Matrix check
  if (user.role && ROLE_PERMISSIONS[user.role]) {
    return ROLE_PERMISSIONS[user.role].includes(requiredPermission);
  }

  return false;
};

/**
 * Validates if a user has at least one of the required roles.
 * @param {Object} user - The authenticated user object.
 * @param {string[]} allowedRoles - Array of allowed role names.
 * @returns {boolean} True if authorized, false otherwise.
 */
export const hasRole = (user, allowedRoles) => {
  if (!user || !user.role) return false;
  return allowedRoles.includes(user.role);
};
