"use client";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  resetSubscription,
  subscribeToNewsletter,
} from "@/store/subscriptionSlice";

/**
 * Example component showing how to use the subscription functionality
 * This can be used in any component that needs newsletter subscription
 */
const SubscriptionExample = () => {
  const dispatch = useAppDispatch();
  const { status, isLoading, error, message } = useAppSelector(
    (state) => state.subscription,
  );

  // Email validation function
  const validateEmail = (values: { email: string }) => {
    const errors: { email?: string } = {};
    const { email } = values;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address";
    } else if (email.length > 254) {
      errors.email = "Email address is too long";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: { email: "" },
    validate: validateEmail,
    onSubmit: async (values, { resetForm }) => {
      try {
        // Clear any previous errors
        dispatch(resetSubscription());

        // Dispatch the subscription action
        const result = await dispatch(subscribeToNewsletter(values.email));

        // If successful, reset the form
        if (subscribeToNewsletter.fulfilled.match(result)) {
          resetForm();
        }
      } catch (error) {
        console.error("Subscription error:", error);
      }
    },
  });

  // Auto-clear success/error messages after 5 seconds
  useEffect(() => {
    if (status === "success" || status === "error") {
      const timer = setTimeout(() => {
        dispatch(resetSubscription());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [status, dispatch]);

  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-4 text-center">
        Subscribe to Newsletter
      </h3>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${formik.errors.email && formik.touched.email
              ? "border-red-500"
              : "border-gray-300"
              }`}
            disabled={isLoading}
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || !formik.isValid || !formik.dirty}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Subscribing...
            </>
          ) : (
            "Subscribe to Newsletter"
          )}
        </button>
      </form>

      {/* Success Message */}
      {status === "success" && message && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 rounded-lg">
          <p className="text-green-700 text-sm text-center">{message}</p>
        </div>
      )}

      {/* Error Message */}
      {status === "error" && error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 rounded-lg">
          <p className="text-red-700 text-sm text-center">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {status === "pending" && (
        <div className="mt-4 p-3 bg-blue-100 border border-blue-400 rounded-lg">
          <p className="text-blue-700 text-sm text-center">
            Processing your subscription...
          </p>
        </div>
      )}
    </div>
  );
};

export default SubscriptionExample;
