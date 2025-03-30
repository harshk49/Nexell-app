import { useSearchParams } from "react-router-dom";
import Login from "./Login";
import SignUp from "./Signup";
import "react-toastify/dist/ReactToastify.css";

const Authenticate = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "login";

  return (
    <div className="absolute inset-0 min-h-screen w-full flex items-center justify-center bg-[#A3F600]">
      <div className="w-full max-w-5xl mx-auto min-h-[600px] rounded-2xl border-2 border-gray-900 flex flex-col md:flex-row p-4 md:p-6 gap-4 md:gap-6 bg-[#000000] shadow-[0_0_40px_rgba(0,0,0,0.3),0_0_80px_rgba(0,0,0,0.2),0_0_120px_rgba(0,0,0,0.1)] overflow-hidden">
        {mode === "login" ? (
          <>
            <div className="hidden md:block flex-1 rounded-xl border-2 border-white bg-[#000000] shadow-[inset_0_0_20px_rgba(255,255,255,0.2),0_0_30px_rgba(255,255,255,0.15),0_0_50px_rgba(255,255,255,0.1)] flex items-center justify-center">
              <Login />
            </div>
            <div className="flex-1 rounded-xl bg-[#000000] p-8 flex items-center justify-center">
              <SignUp />
            </div>
          </>
        ) : (
          <>
            <div className="hidden md:block flex-1 rounded-xl border-2 border-white bg-[#000000] shadow-[inset_0_0_20px_rgba(255,255,255,0.2),0_0_30px_rgba(255,255,255,0.15),0_0_50px_rgba(255,255,255,0.1)] flex items-center justify-center">
              <SignUp />
            </div>
            <div className="flex-1 rounded-xl bg-[#000000] p-8 flex items-center justify-center">
              <Login />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Authenticate;
