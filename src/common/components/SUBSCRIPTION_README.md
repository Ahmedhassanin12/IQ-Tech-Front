# Newsletter Subscription System

This document explains how to use the newsletter subscription functionality in the application.

## Overview

The subscription system includes:
- Redux state management for subscription status
- Formik integration for form validation
- Comprehensive error handling
- Email validation and duplicate checking
- Loading states and user feedback

## Files Structure

```
src/
├── store/
│   └── subscriptionSlice.ts          # Redux slice for subscription state
├── lib/api/subscription/
│   └── subscription.ts               # API functions for subscription
├── axios_instance/
│   └── index.ts                      # Axios configuration with interceptors
└── common/components/
    ├── Footer.tsx                    # Footer with integrated subscription form
    └── SubscriptionExample.tsx       # Example component for subscription
```

## Usage

### 1. Basic Integration

```tsx
import { useAppSelector, useAppDispatch } from "@/store/hook";
import { subscribeToNewsletter, resetSubscription } from "@/store/subscriptionSlice";

const MyComponent = () => {
  const dispatch = useAppDispatch();
  const { status, isLoading, error, message } = useAppSelector((state) => state.subscription);

  const handleSubscribe = async (email: string) => {
    const result = await dispatch(subscribeToNewsletter(email));
    // Handle result...
  };

  return (
    // Your component JSX
  );
};
```

### 2. With Formik Integration

```tsx
import { useFormik } from "formik";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import { subscribeToNewsletter, resetSubscription } from "@/store/subscriptionSlice";

const SubscriptionForm = () => {
  const dispatch = useAppDispatch();
  const { status, isLoading, error, message } = useAppSelector((state) => state.subscription);

  const validateEmail = (values: { email: string }) => {
    const errors: { email?: string } = {};
    const { email } = values;
    
    if (!email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address";
    }
    
    return errors;
  };

  const formik = useFormik({
    initialValues: { email: "" },
    validate: validateEmail,
    onSubmit: async (values, { resetForm }) => {
      const result = await dispatch(subscribeToNewsletter(values.email));
      if (subscribeToNewsletter.fulfilled.match(result)) {
        resetForm();
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        type="email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={isLoading}
      />
      {formik.errors.email && formik.touched.email && (
        <p className="error">{formik.errors.email}</p>
      )}
      <button type="submit" disabled={isLoading || !formik.isValid}>
        {isLoading ? "Subscribing..." : "Subscribe"}
      </button>
    </form>
  );
};
```

## State Management

### Redux State

```typescript
interface SubscriptionState {
  status: 'idle' | 'pending' | 'success' | 'error';
  message: string | null;
  isLoading: boolean;
  error: string | null;
  subscribedEmails: string[];
  lastSubscribedEmail: string | null;
}
```

### Available Actions

- `subscribeToNewsletter(email: string)` - Subscribe to newsletter
- `checkEmailExists(email: string)` - Check if email already exists
- `clearStatus()` - Clear status and messages
- `setStatus(payload)` - Set custom status
- `resetSubscription()` - Reset all subscription state

## API Functions

### `addSub(data: { email: string })`

Subscribes an email to the newsletter with comprehensive error handling:

- **Email validation** before API call
- **Duplicate checking** to prevent re-subscription
- **HTTP status code handling** (400, 409, 422, 500+)
- **Network error handling**
- **Type-safe error responses**

### `checkEmailExists(email: string)`

Checks if an email is already subscribed:

- Returns `boolean`
- Graceful error handling (assumes not subscribed on error)
- Used internally by `addSub`

## Error Handling

The system handles various error scenarios:

### Client-side Validation
- Empty email field
- Invalid email format
- Email too long (>254 characters)

### Server-side Errors
- **400**: Invalid email format or missing fields
- **409**: Email already subscribed
- **422**: Validation failed
- **500+**: Server errors
- **Network errors**: Connection issues

### Error Messages
All error messages are user-friendly and displayed in the UI with appropriate styling.

## Features

### ✅ Email Validation
- Regex pattern validation
- Required field validation
- Length validation (max 254 characters)

### ✅ Duplicate Prevention
- Pre-subscription email checking
- Clear error messages for duplicates

### ✅ Loading States
- Form submission loading
- Button disabled during submission
- Loading spinners and text

### ✅ Auto-clear Messages
- Success/error messages auto-clear after 5 seconds
- Manual clear with `resetSubscription()`

### ✅ Responsive Design
- Mobile-friendly form layout
- Proper spacing and typography
- RTL support for Arabic locale

### ✅ Type Safety
- Full TypeScript support
- Proper error type definitions
- Type-safe Redux actions

## Example Components

### Footer Integration
The Footer component (`src/common/components/Footer.tsx`) includes a fully integrated subscription form with:
- Formik validation
- Redux state management
- Responsive design
- RTL support
- Error/success message display

### Standalone Component
The `SubscriptionExample.tsx` component shows how to create a standalone subscription form that can be used anywhere in the application.

## Best Practices

1. **Always validate on the client side** before making API calls
2. **Use the provided validation function** for consistent email validation
3. **Handle loading states** to provide good UX
4. **Clear messages automatically** to avoid stale state
5. **Use TypeScript** for type safety
6. **Test error scenarios** to ensure proper error handling

## Testing

To test the subscription functionality:

1. **Valid email**: Should subscribe successfully
2. **Invalid email**: Should show validation error
3. **Duplicate email**: Should show "already subscribed" error
4. **Network error**: Should show network error message
5. **Server error**: Should show appropriate server error message

## Configuration

The API base URL and timeout can be configured in `src/axios_instance/index.ts`:

```typescript
const api = axios.create({
  baseURL: "http://localhost:1337/api", // Configure your API URL
  timeout: 10000, // 10 seconds timeout
});
```
