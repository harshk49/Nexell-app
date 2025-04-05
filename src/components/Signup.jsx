import { Github, Chrome, Eye, EyeOff } from "lucide-react";
import { React, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { authService } from "../api/services/authService";

const SignUp = ({ onSwitch }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const inputClasses =
    "w-full p-[10px] rounded-lg bg-[#000000] text-white border border-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#A3F600] hover:border-[#A3F600] transition-all duration-300 text-[14px]";
  const labelClasses =
    "block text-[12px] mb-1 text-white text-left font-medium";
  const buttonClasses =
    "px-4 py-[10px] border border-gray-700 rounded-lg text-[#000000] flex items-center gap-2 bg-[#A3F600] hover:bg-[#000000] hover:text-white hover:border-[#A3F600] transition-all duration-300 text-[14px]";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authService.register(formData);
      toast.success("Account created successfully!");
      navigate("/home");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    authService.googleAuth();
  };

  const handleGithubSignup = () => {
    authService.githubAuth();
  };

  return (
    <div className="w-full px-4 md:px-10">
      <h1 className="text-[22px] mb-1 text-white">Sign Up Account</h1>
      <p className="text-[12px] mb-4 text-gray-300">
        Enter your personal data to create your account.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className={labelClasses}>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="eg. John"
              className={inputClasses}
              required
            />
          </div>
          <div className="flex-1">
            <label className={labelClasses}>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="eg. Francisco"
              className={inputClasses}
              required
            />
          </div>
        </div>

        <div>
          <label className={labelClasses}>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Choose a username"
            className={inputClasses}
            required
          />
        </div>

        <div>
          <label className={labelClasses}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="eg. example@email.com"
            className={inputClasses}
            required
          />
        </div>

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
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#A3F600]"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <p className="mt-1 text-xs text-left text-gray-500">
            Must be at least 8 characters.
          </p>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className={`${buttonClasses} w-full justify-center`}
          >
            {loading ? "Creating Account..." : "Sign Up"}
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
            onClick={handleGithubSignup}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-black text-white border border-gray-700 rounded-lg hover:border-[#A3F600] transition-all duration-300"
          >
            <Github size={18} />
            <span>GitHub</span>
          </button>
          <button
            type="button"
            onClick={handleGoogleSignup}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-lg hover:border-[#A3F600] transition-all duration-300"
          >
            <Chrome size={18} />
            <span>Google</span>
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-300">
            Already have an account?{" "}
            <span
              className="text-[#A3F600] cursor-pointer hover:underline"
              onClick={onSwitch}
            >
              Login
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
