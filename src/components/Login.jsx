import { Github, Chrome, Eye } from "lucide-react";

const Login = ({ onSwitch }) => {
  // Input styling classes for reuse
  const inputClasses =
    "w-full p-[10px] rounded-lg bg-[#000000] text-white border border-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#A3F600] hover:border-[#A3F600] transition-all duration-300 text-[14px]";

  // Label styling classes
  const labelClasses =
    "block text-[12px] mb-1 text-white text-left font-medium";

  // Button styling classes for normal and hover states
  const buttonClasses =
    "px-4 py-[10px] border border-gray-700 rounded-lg text-[#000000] flex items-center gap-2 bg-[#A3F600] hover:bg-[#000000] hover:text-white hover:border-[#A3F600] transition-all duration-300 text-[14px]";

  return (
    <div className="w-full max-w-md p-6 mx-auto">
      {/* Heading */}
      <h1 className="text-[22px] mb-1 text-white text-center">Welcome Back</h1>
      <p className="text-[12px] mb-4 text-gray-300 text-center">
        Sign in to your account to continue.
      </p>

      {/* Login Form */}
      <form className="space-y-6">
        {/* Email Input */}
        <div>
          <label className={labelClasses}>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className={inputClasses}
            required
          />
        </div>

        {/* Password Input with Visibility Toggle */}
        <div>
          <label className={labelClasses}>Password</label>
          <div className="relative">
            <input
              type="password"
              placeholder="Enter your password"
              className={inputClasses}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#A3F600]"
            >
              <Eye size={20} />
            </button>
          </div>
        </div>

        {/* Remember Me and Forgot Password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-gray-700 text-[#A3F600] focus:ring-[#A3F600] bg-[#000000]"
            />
            <label className="ml-2 text-[14px] text-gray-300">
              Remember me
            </label>
          </div>
          <a href="#" className="text-sm text-[#A3F600] hover:underline">
            Forgot password?
          </a>
        </div>

        {/* Sign In Button */}
        <div>
          <button
            type="submit"
            className={`${buttonClasses} w-full justify-center`}
          >
            Sign In
          </button>
        </div>

        {/* Divider for Alternative Sign-in Options */}
        <div className="flex items-center justify-center gap-4">
          <div className="h-[1px] bg-gray-700 flex-1" />
          <span className="text-[14px] text-gray-300">or</span>
          <div className="h-[1px] bg-gray-700 flex-1" />
        </div>

        {/* Social Login Buttons */}
        <div className="flex justify-center gap-4">
          <button type="button" className={buttonClasses}>
            <Chrome className="w-5 h-5" />
            Google
          </button>
          <button type="button" className={buttonClasses}>
            <Github className="w-5 h-5" />
            GitHub
          </button>
        </div>

        {/* Switch to Signup Option */}
        <div className="text-center">
          <p className="text-sm text-gray-300">
            Don't have an account?{" "}
            <span
              className="text-[#A3F600] cursor-pointer hover:underline"
              onClick={onSwitch}
            >
              Sign up
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
