import { useState } from "react";
import { Github, Chrome, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { authService } from "../api/services/authService";

const Login = ({ onSwitch }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });

  // Input styling classes for reuse
  const inputClasses =
    "w-full p-[10px] rounded-lg bg-[#000000] text-white border border-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#F5F5F5] hover:border-[#F5F5F5] transition-all duration-300 text-[14px]";

  // Label styling classes
  const labelClasses =
    "block text-[12px] mb-1 text-white text-left font-medium";

  // Button styling classes for normal and hover states
  const buttonClasses =
    "px-4 py-[10px] border border-gray-700 rounded-lg text-[#000000] flex items-center gap-2 bg-[#F5F5F5] hover:bg-[#000000] hover:text-white hover:border-[#F5F5F5] transition-all duration-300 text-[14px]";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authService.login(formData);
      toast.success("Login successful!");
      navigate("/home");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    authService.googleAuth();
  };

  const handleGithubLogin = () => {
    authService.githubAuth();
  };

  return (
    <div className="w-full max-w-md p-6 mx-auto">
      {/* Heading */}
      <h1 className="text-[22px] mb-1 text-white text-center">Welcome Back</h1>
      <p className="text-[12px] mb-4 text-gray-300 text-center">
        Sign in to your account to continue.
      </p>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email or Username Input */}
        <div>
          <label className={labelClasses}>Email or Username</label>
          <input
            type="text"
            name="emailOrUsername"
            value={formData.emailOrUsername}
            onChange={handleChange}
            placeholder="Enter your email or username"
            className={inputClasses}
            required
          />
        </div>

        {/* Password Input with Visibility Toggle */}
        <div>
          <label className={labelClasses}>Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={inputClasses}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#F5F5F5]"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Remember Me and Forgot Password */}
        {/* <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe((prev) => !prev)}
              className="w-4 h-4 rounded border-gray-700 text-[#F5F5F5] focus:ring-[#F5F5F5] bg-[#000000]"
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 text-[14px] text-gray-300"
            >
              Remember me
            </label>
          </div>
          <a href="#" className="text-sm text-[#F5F5F5] hover:underline">
            Forgot password?
          </a>
        </div> */}

        {/* Sign In Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className={`${buttonClasses} w-full justify-center`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </div>

        {/* OAuth Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-700"></div>
          <span className="px-3 text-sm text-gray-400">Or continue with</span>
          <div className="flex-grow border-t border-gray-700"></div>
        </div>

        {/* OAuth Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={handleGithubLogin}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-black text-white border border-gray-700 rounded-lg hover:border-[#F5F5F5] transition-all duration-300"
          >
            <Github size={18} />
            <span>GitHub</span>
          </button>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-[#F5F5F5] text-gray-800 border border-gray-300 rounded-lg hover:border-[#F5F5F5] transition-all duration-300"
          >
            <Chrome size={18} />
            <span>Google</span>
          </button>
        </div>

        {/* Switch to Signup Option */}
        <div className="text-center">
          <p className="text-sm text-gray-300">
            Don't have an account?{" "}
            <span
              className="text-[#F5F5F5] cursor-pointer hover:underline"
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
