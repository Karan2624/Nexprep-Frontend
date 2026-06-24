"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterFrom";

export default function AuthPage() {
  const router = useRouter();
  const { login, user } = useAuthStore();

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    avatar: null, 
  });
  
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, avatar: file });
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!formData.username && !formData.email) {
        setError("Please enter either a username or an email.");
        setLoading(false);
        return;
      }

      const result = await login({
        username: formData.username || undefined,
        email: formData.email || undefined,
        password: formData.password,
      });

      if (result.success) {
        router.refresh(); 
        router.push("/dashboard"); 
      } else {
        setError(result.error || "Login failed");
        setLoading(false);
      }
    } catch (err) {
      setError(err?.message || "Something went wrong");
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("username", formData.username);
      submitData.append("email", formData.email);
      submitData.append("password", formData.password);
      
      if (formData.avatar) {
        submitData.append("avatar", formData.avatar);
      }

      const res = await fetch("http://localhost:8000/api/v1/users/register", {
        method: "POST",
        credentials: "include",
        body: submitData, 
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        setLoading(false); 
      } else {
        const autoLogin = await login({
          username: formData.username,
          password: formData.password,
        });

        if (autoLogin.success) {
          router.refresh(); 
          router.push("/dashboard"); 
        } else {
          setError("Account created successfully! Please log in.");
          setIsLogin(true);
          setLoading(false);
        }
      }
    } catch (err) {
      setError(err?.message || "Something went wrong");
      setLoading(false); 
    } 
  };

  const toggleAuthMode = () => {
    setError("");
    setIsLogin(!isLogin);
    setFormData({ name: "", username: "", email: "", password: "", avatar: null });
    setAvatarPreview(null);
  };

  if (user) {
    return null; 
  }

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-white/80 rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] p-8 sm:p-10 relative overflow-hidden z-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full blur-[40px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-400/10 rounded-full blur-[40px] pointer-events-none" />

        <div className="relative z-10">
          <div className="flex justify-center mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-bold text-3xl rounded-[18px] shadow-[0_8px_20px_rgba(37,99,235,0.3)]">
              N
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">
              {isLogin ? "Welcome back" : "Create an account"}
            </h2>
            <p className="text-slate-500 text-[14px] font-medium">
              {isLogin
                ? "Enter your details to access your dashboard."
                : "Join NexPrep to master your skills."}
            </p>
          </div>

          {error && (
            <div className="mb-5 flex items-center gap-3 p-4 bg-rose-50/80 backdrop-blur-sm text-rose-600 text-[14px] font-medium rounded-xl shadow-[0_8px_16px_rgba(225,29,72,0.06)] animate-pop-in">
              <AlertCircle size={18} className="shrink-0 text-rose-500" />
              <p className="leading-tight">{error}</p>
            </div>
          )}

          {isLogin ? (
            <LoginForm 
              formData={formData} 
              setFormData={setFormData} 
              loading={loading} 
              onSubmit={handleLoginSubmit} 
            />
          ) : (
            <RegisterForm 
              formData={formData} 
              setFormData={setFormData} 
              loading={loading} 
              onSubmit={handleRegisterSubmit} 
              avatarPreview={avatarPreview}
              handleFileChange={handleFileChange}
            />
          )}

          <div className="mt-8 text-center pt-6 border-t border-slate-200/60">
            <p className="text-[14px] text-slate-600 font-medium">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={toggleAuthMode}
                className="font-black text-blue-600 hover:text-blue-800 transition-colors ml-1 cursor-pointer"
              >
                {isLogin ? "Register now" : "Log in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}