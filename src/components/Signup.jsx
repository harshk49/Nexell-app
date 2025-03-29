import { Github } from "lucide-react";
import { Chrome } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { authService } from "../api/services/authService";
import { colors } from "../lib/colors";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const inputClasses =
    "w-full p-2.5 rounded-lg bg-black text-white border border-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#A3F600] transition-all duration-300 text-sm";
  const labelClasses = "block text-xs mb-1.5 text-white text-left font-medium";
  const buttonClasses = `px-6 py-2.5 border border-gray-700 rounded-lg text-black flex items-center gap-2 bg-[${colors.authBgColor}] hover:bg-black hover:text-white hover:border-[${colors.authBgColor}] transition-all duration-300 text-sm`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authService.register(formData);
      toast.success("Account created successfully!");
      // Redirect to home page after successful signup
      window.location.href = "/home";
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`absolute inset-0 min-h-screen w-full flex items-center justify-center bg-[${colors.authBgColor}]`}
    >
      <div className="w-full max-w-5xl mx-auto min-h-[650px] rounded-2xl border-2 border-gray-900 flex flex-col md:flex-row p-4 md:p-8 gap-4 md:gap-8 bg-black shadow-[0_0_40px_rgba(0,0,0,0.3),0_0_80px_rgba(0,0,0,0.2),0_0_120px_rgba(0,0,0,0.1)] overflow-hidden">
        <div
          className={`hidden md:block flex-1 rounded-xl border-2 border-gray-900 bg-[${colors.authBgColor}] shadow-[inset_0_0_20px_rgba(255,255,255,0.2),0_0_30px_rgba(255,255,255,0.15),0_0_50px_rgba(255,255,255,0.1)]`}
        />
        <div className="flex-1 rounded-xl bg-black">
          <div className="px-4 md:px-14 py-6 md:py-8">
            <h1 className="text-2xl mb-2 text-white">Sign Up Account</h1>
            <p className="text-xs mb-6 text-gray-300">
              Enter your personal data to create your account.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#A3F600]"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1 text-left">
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

              <div className="flex items-center gap-4 justify-center mt-8">
                <div className="h-[1px] bg-gray-700 flex-1" />
                <span className="text-sm text-gray-300">or</span>
                <div className="h-[1px] bg-gray-700 flex-1" />
              </div>

              <div className="flex gap-4 justify-center">
                <button type="button" className={buttonClasses}>
                  <Chrome className="w-5 h-5" />
                  Google
                </button>
                <button type="button" className={buttonClasses}>
                  <Github className="w-5 h-5" />
                  GitHub
                </button>
              </div>

              <div className="text-center mt-6">
                <p className="text-sm text-gray-300">
                  Already have an account?{" "}
                  <a href="/login" className="text-[#A3F600] hover:underline">
                    Log in
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
