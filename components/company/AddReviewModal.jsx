"use client";

import { useState } from "react";
import { Users, X } from "lucide-react";
import { createCompanyReview } from "@/lib/companyReviewApi";

export default function AddReviewModal({
  companyId,
  onClose,
  onSuccess,
}) {
  const [formData, setFormData] = useState({
    roleAppliedFor: "",
    verdict: "",
    year: "",
    reviewText: "",
    topicsAsked: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createCompanyReview({
        companyId,
        roleAppliedFor: formData.roleAppliedFor,
        verdict: formData.verdict,
        year: Number(formData.year),
        reviewText: formData.reviewText,
        topicsAsked: formData.topicsAsked
          .split(",")
          .map((topic) => topic.trim())
          .filter(Boolean),
      });

      alert("Review added successfully!");

      onSuccess();
    } catch (err) {
      console.error(err);
      alert("Failed to add review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
              <Users size={20} className="text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Add Interview Review
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-900 transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Role Applied For */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Role Applied For
            </label>

            <input
              type="text"
              placeholder="e.g. Software Engineer Intern"
              value={formData.roleAppliedFor}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  roleAppliedFor: e.target.value,
                })
              }
              className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Verdict + Year */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Verdict
              </label>

              <select
                value={formData.verdict}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    verdict: e.target.value,
                  })
                }
                className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              >
                <option value="">Select Verdict</option>
                <option value="Offered">Offered</option>
                <option value="Rejected">Rejected</option>
                <option value="Ghosted">Ghosted</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Interview Year
              </label>

              <input
                type="number"
                placeholder="e.g. 2026"
                min="2000"
                max="2100"
                value={formData.year}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    year: e.target.value,
                  })
                }
                className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

          </div>

          {/* Interview Experience */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Interview Experience
            </label>

            <textarea
              rows={6}
              placeholder="Describe your interview experience..."
              value={formData.reviewText}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  reviewText: e.target.value,
                })
              }
              className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              required
            />
          </div>

          {/* Topics Asked */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Topics Asked
            </label>

            <input
              type="text"
              placeholder="e.g. Arrays, Graphs, DBMS, OS"
              value={formData.topicsAsked}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  topicsAsked: e.target.value,
                })
              }
              className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />

            <p className="text-xs text-slate-400 mt-2">
              Separate multiple topics with commas.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}
