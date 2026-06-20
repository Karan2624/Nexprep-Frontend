"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Key, User, Loader2, AlertCircle } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

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
  });

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
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
      } else {
        const res = await fetch("http://localhost:8000/api/v1/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name: formData.name,
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
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
      }
    } catch (err) {
      setError(err?.message || "Something went wrong");
      setLoading(false); 
    } 
  };

  const toggleAuthMode = () => {
    setError("");
    setIsLogin(!isLogin);
    setFormData({ name: "", username: "", email: "", password: "" });
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

          <form className="space-y-4" onSubmit={handleAuthSubmit}>
            {!isLogin && (
              <>
                <div className="relative group">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-11 pr-4 py-3.5 bg-white/60 text-slate-900 border border-slate-200 rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all shadow-sm"
                  />
                </div>

                <div className="relative group">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="Username"
                    required
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full pl-11 pr-4 py-3.5 bg-white/60 text-slate-900 border border-slate-200 rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all shadow-sm"
                  />
                </div>

                <div className="relative group">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-11 pr-4 py-3.5 bg-white/60 text-slate-900 border border-slate-200 rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all shadow-sm"
                  />
                </div>
              </>
            )}

            {isLogin && (
              <>
                <div className="relative group">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="Username"
                    required={!formData.email} 
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value, email: "" })}
                    className="w-full pl-11 pr-4 py-3.5 bg-white/60 text-slate-900 border border-slate-200 rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all shadow-sm"
                  />
                </div>

                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="shrink-0 px-4 text-slate-400 text-xs font-bold uppercase tracking-widest">OR</span>
                  <div className="flex-grow border-t border-slate-200"></div>
                </div>

                <div className="relative group">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    required={!formData.username} 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value, username: "" })}
                    className="w-full pl-11 pr-4 py-3.5 bg-white/60 text-slate-900 border border-slate-200 rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all shadow-sm"
                  />
                </div>
              </>
            )}

            <div className="relative group pt-2">
              <Key size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors mt-1" />
              <input
                type="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-11 pr-4 py-3.5 bg-white/60 text-slate-900 border border-slate-200 rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all shadow-sm"
              />
            </div>

            {isLogin && (
              <div className="flex justify-end pt-1">
                <a href="#" className="text-[12px] font-bold text-blue-600 hover:text-blue-700 transition-colors">
                  Forgot password?
                </a>
              </div>
            )}

            <div className="pt-2">
              <button
                disabled={loading}
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-[0_8px_20px_rgba(37,99,235,0.25)] transform active:scale-[0.98] transition-all text-[15px] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Please wait...
                  </>
                ) : isLogin ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </form>

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