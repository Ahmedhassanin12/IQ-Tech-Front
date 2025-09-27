import api from "@/axios_instance";

// Define response types
export interface SubscriptionResponse {
  data: {
    id: number;
    email: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;

  };
  meta: {
    pagination?: {
      page?: number;
      pageSize?: number;
      pageCount?: number;
      total?: number;
    };
  };
}

export interface SubscriptionError {
  error: {
    status: number;
    name: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

export interface ApiError {
  message: string;
  status?: number;
  details?: Record<string, unknown>;
}

// Type guard for axios errors
const isAxiosError = (error: unknown): error is { response?: { data: SubscriptionError; status: number }; request?: unknown; message: string } => {
  return error !== null && typeof error === 'object' && 'message' in error;
};

export const addSub = async (
  data: { email: string },
): Promise<SubscriptionResponse> => {
  try {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new Error("Please enter a valid email address");
    }

    const response = await api.post<SubscriptionResponse>("/subscriptions", {
      data: {
        email: data.email,
      },
    });

    return response.data;
  } catch (error: unknown) {
    // Handle different types of errors
    if (isAxiosError(error)) {
      if (error.response) {
        // Server responded with error status
        const errorData = error.response.data as SubscriptionError;
        const status = error.response.status;

        if (status === 400) {
          throw new Error("Invalid email format or missing required fields");
        } else if (status === 409) {
          throw new Error("This email is already subscribed to our newsletter");
        } else if (status === 422) {
          throw new Error(errorData.error.message || "Validation failed");
        } else if (status >= 500) {
          throw new Error("Server error. Please try again later");
        } else {
          throw new Error(errorData.error.message || "An unexpected error occurred");
        }
      } else if (error.request) {
        // Network error
        throw new Error("Network error. Please check your connection and try again");
      } else {
        // Other errors (validation, etc.)
        throw new Error(error.message || "An unexpected error occurred");
      }
    } else if (error instanceof Error) {
      // Standard Error objects
      throw error;
    } else {
      // Unknown error type
      throw new Error("An unexpected error occurred");
    }
  }
};

// Function to check if email already exists
export const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    const response = await api.get(`/subscriptions?filters[email][$eq]=${encodeURIComponent(email)}`);
    return response.data.data && response.data.data.length > 0;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.warn("Error checking email existence:", errorMessage);
    return false;
  }
};