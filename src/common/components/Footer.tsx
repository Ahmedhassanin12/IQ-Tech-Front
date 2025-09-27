"use client";
import { useFormik } from "formik";
import { useLocale } from "next-intl";
import { useEffect } from "react";
import { FaGooglePlusG, FaTwitter } from "react-icons/fa";
import { TiSocialFacebook } from "react-icons/ti";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  resetSubscription,
  subscribeToNewsletter,
} from "@/store/subscriptionSlice";

const Footer = () => {
  return (
    <footer id="contact" className={`bg-brand-primary text-white py-10 `}>
      <div className="container mx-auto px-4">
        <div>
          {/* Brand */}
          <div className="flex items-center justify-end gap-1.5">
            <NewsletterSubscription />
            <p className=" text-white">Contacts</p>
            <div className="flex space-x-4">
              <a
                href="#d"
                className="text-white hover:text-amber-400 transition-colors"
              >
                <TiSocialFacebook className="w-5 h-5" />
              </a>
              <a
                href="#d"
                className="text-white hover:text-amber-400 transition-colors"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a
                href="#d"
                className="text-white hover:text-amber-400 transition-colors"
              >
                <FaGooglePlusG className="w-5 h-5" />
              </a>
            </div>
          </div>
          <hr className="py-3 my-5" />
          {/* Quick Links */}
          <div className="flex items-center justify-between">
            <ul className="flex items-center justify-start gap-3">
              <li>
                <a
                  href="#home"
                  className="hover:text-gray-400 text-white transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-gray-400 text-white font-[300] text-sm transition-colors"
                >
                  Our Strategy
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-gray-400 text-white font-[300] text-sm transition-colors"
                >
                  Our Strategy
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  className="hover:text-gray-400 text-white font-[300] text-sm transition-colors"
                >
                  Social Responsibility
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-gray-400 text-white font-[300] text-sm transition-colors"
                >
                  Our Services
                </a>
              </li>
            </ul>

            <h6 className="text-md font-semibold mb-2 text-white">
              © 2025. All rights reserved.
            </h6>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const NewsletterSubscription = () => {
  const dispatch = useAppDispatch();
  const { status, isLoading, error, message } = useAppSelector(
    (state) => state.subscription,
  );
  const locale = useLocale();

  const isRtl = locale === "ar";

  // Email validation function
  const validateEmail = (values: { email: string }) => {
    const errors: { email?: string } = {};
    const { email } = values;

    if (!email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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
    <div className="w-full max-w-md">
      <div className="space-y-3">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col sm:flex-row items-center justify-center gap-2 bg-white rounded-lg p-1"
        >
          <div className="flex-1 w-full">
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-3 bg-white rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${isRtl ? "text-right" : "text-left"
                } ${formik.errors.email && formik.touched.email
                  ? "border-2 border-red-500"
                  : "border border-gray-300"
                }`}
              disabled={isLoading}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-400 text-xs mt-1 px-1">
                {formik.errors.email}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading || !formik.isValid || !formik.dirty}
            className="w-full sm:w-[180px] cursor-pointer bg-amber-600 hover:bg-amber-700 disabled:bg-amber-800 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center min-h-[48px]"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Subscribing...
              </>
            ) : (
              "Subscribe"
            )}
          </button>
        </form>
      </div>

      {/* Success Message */}
      {status === "success" && message && (
        <div className="mt-3 p-3 bg-green-600/20 border border-green-500 rounded-lg">
          <p className="text-green-400 text-sm text-center">{message}</p>
        </div>
      )}

      {/* Error Message */}
      {status === "error" && error && (
        <div className="mt-3 p-3 bg-red-600/20 border border-red-500 rounded-lg">
          <p className="text-red-400 text-sm text-center">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {status === "pending" && (
        <div className="mt-3 p-3 bg-blue-600/20 border border-blue-500 rounded-lg">
          <p className="text-blue-400 text-sm text-center">
            Processing your subscription...
          </p>
        </div>
      )}
    </div>
  );
};
