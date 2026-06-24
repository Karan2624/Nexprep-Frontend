import { Mail, Key, User, Loader2 } from "lucide-react";

export default function LoginForm({ formData, setFormData, loading, onSubmit }) {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
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

      <div className="flex justify-end pt-1">
        <a href="#" className="text-[12px] font-bold text-blue-600 hover:text-blue-700 transition-colors">
          Forgot password?
        </a>
      </div>

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
          ) : (
            "Sign In"
          )}
        </button>
      </div>
    </form>
  );
}