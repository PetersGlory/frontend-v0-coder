const BASE_URL = "https://v0-coder.onrender.com";

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

const TOKEN_STORAGE_KEY = 'easearch_jwt';

export function saveToken(token: string) {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  details?: unknown;
}

export async function apiFetch<T>(path: string, options: {
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
  auth?: boolean;
} = {}): Promise<ApiResponse<T>> {
  const { method = 'GET', body, headers = {}, auth = false } = options;

  const url = `${BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
  const token = getToken();

  const finalHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  };

  if (auth && token) {
    finalHeaders['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    method,
    headers: finalHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    credentials: 'include',
  });

  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const payload = isJson ? await response.json() : undefined;

  if (!response.ok) {
    return {
      success: false,
      error: (payload && (payload.error || payload.message)) || response.statusText,
      details: payload,
    } as ApiResponse<T>;
  }

  return (payload as ApiResponse<T>) || { success: true } as ApiResponse<T>;
}

// Auth-specific helpers aligned with API_DOCUMENTATION.md
export interface AuthUser {
  id: number;
  email: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  is_active?: boolean;
  email_verified?: boolean;
  created_at?: string;
  avatar_url?: string;
}

export interface LoginResponse {
  user: AuthUser;
  token: string;
}

export async function login(email: string, password: string) {
  const res = await apiFetch<LoginResponse>('/api/auth/login', {
    method: 'POST',
    body: { email, password },
  });
  if (res.success && res.data?.token) {
    saveToken(res.data.token);
  }
  return res;
}

export interface RegisterBody {
  email: string;
  username: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

export async function register(body: RegisterBody) {
  const res = await apiFetch<LoginResponse>('/api/auth/register', {
    method: 'POST',
    body,
  });
  if (res.success && res.data?.token) {
    saveToken(res.data.token);
  }
  return res;
}

export async function getProfile() {
  return apiFetch<{ user: AuthUser }>('/api/auth/profile', { auth: true });
}

export async function updateProfile(body: Partial<AuthUser>) {
  return apiFetch<{ user: AuthUser }>('/api/auth/profile', { method: 'PUT', body, auth: true });
}

// Billing
export interface BillingPlan {
  code: string;
  name: string;
  price_cents: number;
  interval: 'monthly' | 'yearly';
  request_limit: number;
  priority_support: boolean;
}

export interface SubscriptionInfo {
  plan_code: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing' | 'none';
  current_period_end?: string;
}

export async function getBillingPlans() {
  return apiFetch<{ plans: BillingPlan[] }>('/api/billing/plans');
}

export async function subscribeToPlan(plan_code: string) {
  return apiFetch<{ subscription: SubscriptionInfo }>('/api/billing/subscribe', {
    method: 'POST',
    body: { plan_code },
    auth: true,
  });
}

export async function getMySubscription() {
  return apiFetch<{ subscription: SubscriptionInfo }>('/api/billing/me', { auth: true });
}

export async function cancelMySubscription() {
  return apiFetch<{ subscription: SubscriptionInfo }>('/api/billing/cancel', { method: 'POST', auth: true });
}

export interface HistoryItem {
  id: number;
  prompt: string;
  spec: any;
  created_at: string;
  // Add more fields as needed based on backend response
}

export async function getHistory() {
  return apiFetch<{ history: HistoryItem[] }>('/api/history', { auth: true });
}

