import { ApiResponse, LoginResponse, UserListParams, UserProfile } from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export const apiEndpoints = {
  auth: {
    login: `${API_BASE_URL}/api/v1/auth/login/access-token`,
    testToken: `${API_BASE_URL}/api/v1/auth/login/test-token`,
    passwordRecovery: (email: string) => `${API_BASE_URL}/api/v1/auth/password-recovery/${email}`,
  },
  users: {
    list: `${API_BASE_URL}/api/v1/users/`,
    create: `${API_BASE_URL}/api/v1/users/`,
    me: `${API_BASE_URL}/api/v1/users/me`,
    byId: (id: number) => `${API_BASE_URL}/api/v1/users/${id}`,
    changePassword: `${API_BASE_URL}/api/v1/users/me/change-password`,
    permissions: `${API_BASE_URL}/api/v1/users/permissions/check`,
  },
};

// API call with authentication
export const apiCall = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  const token = localStorage.getItem('access_token');
  
  const response = await fetch(endpoint, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
};

// Login function
export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  const formData = new FormData();
  formData.append('username', email);
  formData.append('password', password);
  
  const response = await fetch(apiEndpoints.auth.login, {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();
  return {
    access_token: data.access_token,
    token_type: data.token_type
  };
};

// Get current user profile
export const getCurrentUser = async (): Promise<UserProfile> => {
  const response = await apiCall<UserProfile>(apiEndpoints.users.me);
  return response.data;
};

// Fetch users with filters
export const fetchUsers = async (params: UserListParams) => {
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, value.toString());
    }
  });
  
  const response = await apiCall<UserProfile[]>(`${apiEndpoints.users.list}?${queryParams}`);
  return response;
};

// Check user permissions
export const checkPermissions = async () => {
  const response = await apiCall<{
    can_manage_users: boolean;
    can_create_users: boolean;
    can_update_users: boolean;
    can_delete_users: boolean;
    manageable_roles: string[];
  }>(apiEndpoints.users.permissions);
  
  return response.data;
}; 