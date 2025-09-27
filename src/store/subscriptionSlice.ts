import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addSub, checkEmailExists as checkEmailExistsAPI } from "@/lib/api/subscription/subscription";

export const subscribeToNewsletter = createAsyncThunk(
  "subscription/subscribeToNewsletter",
  async (email: string, { rejectWithValue }) => {
    try {
      // First check if email already exists
      const emailExists = await checkEmailExistsAPI(email);
      if (emailExists) {
        return rejectWithValue("This email is already subscribed to our newsletter");
      }

      // If email doesn't exist, proceed with subscription
      const response = await addSub({ email });
      return {
        email: response.data.email,
        id: response.data.id,
        message: "Successfully subscribed to newsletter!"
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      return rejectWithValue(errorMessage);
    }
  },
);

export const checkEmailExists = createAsyncThunk(
  "subscription/checkEmailExists",
  async (email: string, { rejectWithValue }) => {
    try {
      const exists = await checkEmailExistsAPI(email);
      return { email, exists };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      return rejectWithValue(errorMessage);
    }
  },
);

interface SubscriptionState {
  status: 'idle' | 'pending' | 'success' | 'error';
  message: string | null;
  isLoading: boolean;
  error: string | null;
  subscribedEmails: string[]; // For tracking in development
  lastSubscribedEmail: string | null;
}

const initialState: SubscriptionState = {
  status: 'idle',
  message: null,
  isLoading: false,
  error: null,
  subscribedEmails: [],
  lastSubscribedEmail: null,
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    clearStatus: (state) => {
      state.status = 'idle';
      state.message = null;
      state.error = null;
    },
    setStatus: (state, action) => {
      state.status = action.payload.status;
      state.message = action.payload.message;
    },
    resetSubscription: (state) => {
      state.status = 'idle';
      state.message = null;
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Subscribe to newsletter cases
      .addCase(subscribeToNewsletter.pending, (state) => {
        state.isLoading = true;
        state.status = "pending";
        state.error = null;
        state.message = null;
      })
      .addCase(subscribeToNewsletter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "success";
        state.message = action.payload.message;
        state.error = null;
        state.lastSubscribedEmail = action.payload.email;
        // Add to subscribed emails if not already present
        if (!state.subscribedEmails.includes(action.payload.email)) {
          state.subscribedEmails.push(action.payload.email);
        }
      })
      .addCase(subscribeToNewsletter.rejected, (state, action) => {
        state.isLoading = false;
        state.status = "error";
        state.error = action.payload as string;
        state.message = null;
      })
      // Check email exists cases
      .addCase(checkEmailExists.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkEmailExists.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.exists) {
          state.status = "error";
          state.error = "This email is already subscribed to our newsletter";
        } else {
          state.status = "idle";
          state.error = null;
        }
      })
      .addCase(checkEmailExists.rejected, (state, action) => {
        state.isLoading = false;
        state.status = "error";
        state.error = action.payload as string;
      });
  },
});

export const { clearStatus, setStatus, resetSubscription } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
