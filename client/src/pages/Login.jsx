import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button, Loading, Textbox } from "../components";
import { useLoginMutation } from "../redux/slices/api/authApiSlice";
import { setCredentials } from "../redux/slices/authSlice";
import { useEffect } from "react";

const Login = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (data) => {
    try {
      const res = await login(data).unwrap();
      dispatch(setCredentials(res));
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#f3f4f6] dark:bg-gradient-to-b dark:from-[#302943] dark:via-slate-900 dark:to-black relative overflow-hidden">
      
      {/* Floating Circle */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#1273A6] rounded-full animate-bounce-slow opacity-20 z-0"></div>
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#1273A6] rounded-full animate-pulse-slow opacity-15 z-0"></div>

      <div className="flex flex-col lg:flex-row w-full max-w-6xl items-center justify-between px-5 relative z-10">
        
        {/* Left Info Section */}
        <div className="lg:w-2/3 flex flex-col items-start justify-center gap-6 lg:gap-10 mb-10 lg:mb-0">
          <span className="text-lg font-semibold text-[#1273A6]">
            Simplify Your Work, Stay Productive
          </span>
          <h1 className="text-4xl md:text-6xl 2xl:text-7xl font-black text-gray-900 dark:text-gray-100 leading-tight">
            Manage <span className="text-[#1273A6]">Tasks</span> Seamlessly
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl">
            Organize, track, and complete your work efficiently with TaskFloat.
          </p>
        </div>

        {/* Right Form Section */}
        <div className="lg:w-1/3 w-full flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="w-full md:w-[400px] flex flex-col gap-6 bg-white dark:bg-slate-900 px-10 pt-14 pb-14 rounded-2xl shadow-lg"
          >
            <div>
              <p className="text-3xl font-bold text-[#1273A6] text-center">
                Sign in to TaskFloat
              </p>
              <p className="text-center text-gray-700 dark:text-gray-400">
                Enter your credentials to access your tasks.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <Textbox
                placeholder="you@example.com"
                type="email"
                name="email"
                label="Email Address"
                className="w-full rounded-full"
                register={register("email", { required: "Email Address is required!" })}
                error={errors.email ? errors.email.message : ""}
              />
              <Textbox
                placeholder="password"
                type="password"
                name="password"
                label="Password"
                className="w-full rounded-full"
                register={register("password", { required: "Password is required!" })}
                error={errors.password ? errors.password.message : ""}
              />
              <span className="text-sm text-gray-600 hover:underline cursor-pointer text-right">
                Forgot Password?
              </span>
            </div>

            {isLoading ? (
              <Loading />
            ) : (
              <Button
                type="submit"
                label="Log In"
                className="w-full h-10 bg-[#1273A6] text-white rounded-full hover:bg-blue-700 transition-all duration-300"
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
