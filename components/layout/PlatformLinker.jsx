import { useState } from "react";
import { Link2, Plus } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { api } from "../../lib/axios";

export default function PlatformLinker({ onSync }) {
  const { user, checkAuth } = useAuthStore();
  const [modalConfig, setModalConfig] = useState({ isOpen: false, platform: null });
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [optimisticLeetCode, setOptimisticLeetCode] = useState(false);
  const [optimisticCodeforces, setOptimisticCodeforces] = useState(false);

  if (!user) return null;

  const isLeetCodeLinked = !!user.leetcodeProfileId || optimisticLeetCode;
  const isCodeforcesLinked = !!user.codeforcesProfileId || optimisticCodeforces;

  const openModal = (platform) => {
    setModalConfig({ isOpen: true, platform });
    setInputValue("");
    setError("");
  };

  const closeModal = () => {
    setModalConfig({ isOpen: false, platform: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      setError("Input cannot be empty");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (modalConfig.platform === "leetcode") {
        await api.post("/leetcodeStat/", { username: inputValue.trim() });
        setOptimisticLeetCode(true); 
      } else if (modalConfig.platform === "codeforces") {
        await api.post("/codeforcesStat/link-codeforces", { handle: inputValue.trim() });
        setOptimisticCodeforces(true); 
      }
      
      closeModal();
      
      await checkAuth();
      if (onSync) {
        onSync();
      }
      
    } catch (err) {
      setError(err.response?.data?.message || "Failed to link account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {isLeetCodeLinked ? (
          <div className="bg-[#FFA116] text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm cursor-default shadow-sm">
            <Link2 size={14} />
            LeetCode Linked
          </div>
        ) : (
          <button
            onClick={() => openModal("leetcode")}
            className="bg-[#FFA116] text-white hover:opacity-90 px-4 py-2 rounded-full flex items-center gap-2 text-sm transition-opacity shadow-sm font-semibold"
          >
            <Plus size={14} />
            Link LeetCode
          </button>
        )}

        {isCodeforcesLinked ? (
          <div className="bg-[#1F8ACB] text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm cursor-default shadow-sm">
            <Link2 size={14} />
            Codeforces Linked
          </div>
        ) : (
          <button
            onClick={() => openModal("codeforces")}
            className="bg-[#1F8ACB] text-white hover:opacity-90 px-4 py-2 rounded-full flex items-center gap-2 text-sm transition-opacity shadow-sm font-semibold"
          >
            <Plus size={14} />
            Link Codeforces
          </button>
        )}
      </div>

      {modalConfig.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <h3 className="text-xl font-bold mb-4 capitalize text-slate-900">
              Link {modalConfig.platform}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {modalConfig.platform === "leetcode" ? "Username" : "Handle"}
                </label>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Enter your ${modalConfig.platform} ${
                    modalConfig.platform === "leetcode" ? "username" : "handle"
                  }`}
                  autoFocus
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? "Linking..." : "Link Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}