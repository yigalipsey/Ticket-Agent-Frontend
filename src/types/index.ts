// Export all types from a central location
export * from "./fixture";
export * from "./offer";
export * from "./league";
export * from "./team";
export * from "./venue";

// Common types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface SearchResult<T> {
  items: T[];
  total: number;
  query: string;
  filters?: Record<string, unknown>;
}

// UI Types
export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "select"
    | "textarea"
    | "checkbox";
  required?: boolean;
  placeholder?: string;
  options?: SelectOption[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}

// Theme Types
export type Theme = "light" | "dark" | "system";

export interface ThemeConfig {
  theme: Theme;
  primaryColor: string;
  fontFamily: string;
  direction: "ltr" | "rtl";
}

// Agent Authentication Types
export interface AgentLoginCredentials {
  email: string;
  password: string;
}

export interface AgentLoginResponse {
  token: string;
  agent: Agent;
}

export interface Agent {
  _id: string;
  name: string;
  email: string;
  whatsapp?: string;
  isActive: boolean;
  agentType: "individual" | "agency";
  companyName?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}
