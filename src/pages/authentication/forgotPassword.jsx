import { useState } from "react";
import { motion } from "framer-motion";

const securityTips = [
  "Use a mix of uppercase, lowercase, numbers, and symbols.",
  "Avoid using personal information like birthdays or names.",
  "Enable two-factor authentication for extra security.",
  "Change your passwords regularly and don’t reuse old ones.",
  "Use a password manager to store and generate secure passwords.",
];

const commonIssues = [
  "Didn't receive the OTP? Check your spam folder.",
  "Make sure you entered the correct registered email.",
  "OTP expired? Request a new one after 60 seconds.",
  "Ensure your internet connection is stable.",
];

const ForgotPassword = () => {
  const [tipIndex, setTipIndex] = useState(0);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const nextTip = () => setTipIndex((prev) => (prev + 1) % securityTips.length);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="flex flex-col xl:flex-row min-h-screen items-center justify-center bg-blue-900 p-6 sm:p-8 gap-8">
      {/* Form Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full xl:w-[50%] bg-[#F5F5F5] shadow-2xl rounded-3xl p-8 flex flex-col gap-4"
      >
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 bg-indigo-600 rounded-full transition-all`}
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Step Titles */}
        <h2 className="text-2xl font-bold text-center text-indigo-700">
          {step === 1
            ? "Forgot Password"
            : step === 2
            ? "Enter OTP"
            : "Reset Password"}
        </h2>

        {/* Step Indicators */}
        <div className="flex justify-center space-x-4">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-10 w-10 flex items-center justify-center rounded-full font-semibold text-sm ${
                step >= s
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {s}
            </div>
          ))}
        </div>

        {/* Step 1: Enter Email */}
        {step === 1 && (
          <>
            <label className="block mt-4 font-medium">Enter your Email</label>
            <input
              type="email"
              className="w-full p-3 mt-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </>
        )}

        {/* Step 2: Enter OTP */}
        {step === 2 && (
          <>
            <label className="block mt-4 font-medium">Enter OTP</label>
            <input
              type="text"
              className="w-full p-3 mt-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              placeholder="OTP Code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </>
        )}

        {/* Step 3: Reset Password */}
        {step === 3 && (
          <>
            <label className="block mt-4 font-medium">New Password</label>
            <input
              type="password"
              className="w-full p-3 mt-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <label className="block mt-4 font-medium">Confirm Password</label>
            <input
              type="password"
              className="w-full p-3 mt-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-gray-400 text-white font-semibold rounded-lg shadow-lg hover:bg-gray-500 transition duration-300"
            >
              Back
            </button>
          )}

          <button
            onClick={handleNext}
            className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300"
          >
            {step === 3 ? "Reset Password" : "Next"}
          </button>
        </div>
      </motion.div>

      {/* Help Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl xl:w-[48%] min-h-[60vh] xl:min-h-[50vh] flex flex-col justify-between space-y-6 text-white px-4 sm:px-6 md:px-12"
      >
        {/* Security Tips */}
        <div className="p-6 bg-white rounded-2xl shadow-md text-center">
          <h3 className="text-xl font-semibold text-blue-900">
            🔒 Security Tip
          </h3>
          <motion.p
            key={tipIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-2 text-base text-blue-900 opacity-90"
          >
            {securityTips[tipIndex]}
          </motion.p>
          <button
            onClick={nextTip}
            className="mt-3 px-4 py-2 bg-blue-900 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-600 transition duration-300"
          >
            Next Tip
          </button>
        </div>

        {/* Common Issues */}
        <div className="p-6 bg-white rounded-2xl shadow-md text-center">
          <h3 className="text-xl font-semibold text-blue-900">
            ⚠️ Common Issues
          </h3>
          <ul className="mt-2 text-base text-blue-900 opacity-90 space-y-2 text-center">
            {commonIssues.map((issue, index) => (
              <li key={index} className="flex justify-center items-center">
                <span className="mr-2">•</span> {issue}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Support */}
        <div className="p-6 bg-white rounded-2xl shadow-md text-center">
          <h3 className="text-xl font-semibold text-blue-900">
            📩 Need More Help?
          </h3>
          <p className="mt-2 text-base text-blue-900 opacity-90 ">
            If you're still facing issues, contact support at{" "}
            <span className="font-semibold">support@example.com</span>.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
