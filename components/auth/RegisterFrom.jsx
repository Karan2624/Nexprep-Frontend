import { Mail, Key, User, Loader2, Image as ImageIcon } from "lucide-react";

export default function RegisterForm({ formData, setFormData, loading, onSubmit, avatarPreview, handleFileChange }) {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      
      <div className="flex items-center gap-4 mb-2">
        <div className="shrink-0 w-14 h-14 rounded-full border border-slate-200 overflow-hidden bg-white flex items-center justify-center shadow-sm">
          {avatarPreview ? (
            <img src={avatarPreview} alt="Avatar Preview" className="w-full h-full object-cover" />
          ) : (
            <ImageIcon size={24} className="text-slate-300" />
          )}
        </div>
        <div className="flex-grow">
          <label className="block w-full pl-4 pr-4 py-3 bg-white/60 text-slate-600 border border-slate-200 rounded-xl text-[14px] hover:bg-white cursor-pointer transition-all shadow-sm text-center">
            <span className="truncate font-medium">
              {formData.avatar ? formData.avatar.name : "Upload Profile Picture"}
            </span>
            <input
              type="file"
              accept="image/jpeg, image/png, image/jpg"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>

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
            "Create Account"
          )}
        </button>
      </div>
    </form>
  );
}