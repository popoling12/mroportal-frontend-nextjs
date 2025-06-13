export enum UserRole {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin", 
  PLANT_MANAGER = "plant_manager",
  SITE_SUPERVISOR = "site_supervisor",
  TECHNICIAN = "technician",
  OPERATOR = "operator",
  ANALYST = "analyst",
  VIEWER = "viewer",
  CUSTOMER = "customer",
  CONTRACTOR = "contractor"
}

export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive", 
  SUSPENDED = "suspended",
  PENDING = "pending"
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

export interface NotificationSettings {
  email_enabled: boolean;
  sms_enabled: boolean;
  push_enabled: boolean;
  work_order_notifications: boolean;
  asset_alerts: boolean;
  system_maintenance: boolean;
  daily_reports: boolean;
}

export interface UserPreferences {
  theme: "light" | "dark";
  dashboard_layout: "grid" | "list" | "card";
  notifications_enabled: boolean;
  language: string;
  timezone: string;
}

export interface UserProfile {
  id: number;
  uuid: string;
  email: string;
  username?: string;
  first_name: string;
  last_name: string;
  full_name?: string;
  phone?: string;
  mobile?: string;
  avatar_url?: string;
  role: UserRole;
  status: UserStatus;
  department?: string;
  position?: string;
  company?: string;
  employee_id?: string;
  timezone: string;
  language: string;
  country?: string;
  city?: string;
  is_active: boolean;
  last_login?: string;
  two_factor_enabled: boolean;
  emergency_contact?: EmergencyContact;
  notification_settings?: NotificationSettings;
  preferences?: UserPreferences;
  created_at: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  total?: number;
  page?: number;
  per_page?: number;
}

export interface UserListParams {
  skip?: number;
  limit?: number;
  role?: UserRole;
  status?: UserStatus;
  search?: string;
  department?: string;
} 