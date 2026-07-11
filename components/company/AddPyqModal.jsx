"use client";

import { useState } from "react";
import { Code2, X } from "lucide-react";
import { createCompanyPyq } from "@/lib/companyPyqApi";

export default function AddPyqModal({
  companyId,
  onClose,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    year: "",
    difficulty: "",
    question: "",
    topics: "",

    sampleInput: "",
    sampleOutput: "",
    explanation: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await createCompanyPyq({
        companyId,
        title: formData.title,
        description: formData.question,
        difficulty: formData.difficulty,
        yearAsked: Number(formData.year),

        tags: formData.topics
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),

        sampleTestCase: [
          {
            input: formData.sampleInput,
            output: formData.sampleOutput,
            explanation: formData.explanation,
          },
        ],
      });

      onSuccess();

      setFormData({
        title: "",
        year: "",
        difficulty: "",
        question: "",
        topics: "",
        sampleInput: "",
        sampleOutput: "",
        explanation: "",
      });
    } catch (err) {
      console.error(err);
      alert(
        err?.response?.data?.message || "Failed to create PYQ."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <Code2 size={20} className="text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Add Interview PYQ
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

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Question Title
            </label>

            <input
              type="text"
              placeholder="e.g. Reverse Linked List"
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
              className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Year + Difficulty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Interview Year */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Interview Year
              </label>

              <input
                type="number"
                placeholder="2026"
                value={formData.year}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    year: e.target.value,
                  })
                }
                className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Difficulty
              </label>

              <select
                value={formData.difficulty}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    difficulty: e.target.value,
                  })
                }
                className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Select Difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

          </div>

          {/* Question */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Question
            </label>

            <textarea
              rows={6}
              placeholder="Write the interview question..."
              value={formData.question}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  question: e.target.value,
                })
              }
              className="w-full border border-slate-200 rounded-xl p-3 resize-none outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Topics */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Topics
            </label>

            <input
              type="text"
              placeholder="Arrays, Trees, Graphs"
              value={formData.topics}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  topics: e.target.value,
                })
              }
              className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />

            <p className="text-xs text-slate-400 mt-2">
              Separate multiple topics using commas.
            </p>
          </div>

          {/* Sample Test Case Section */}
          <div className="border-t border-slate-100 pt-6 mt-2">
            <h3 className="text-lg font-bold text-slate-900">
              Sample Test Case
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Add one example to help students understand the problem.
            </p>
          </div>

          {/* Sample Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Sample Input
            </label>

            <textarea
              rows={3}
              placeholder="e.g. nums = [2,7,11,15], target = 9"
              value={formData.sampleInput}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  sampleInput: e.target.value,
                })
              }
              className="w-full border border-slate-200 rounded-xl p-3 resize-none outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono text-sm"
            />
          </div>

          {/* Sample Output */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Sample Output
            </label>

            <textarea
              rows={3}
              placeholder="e.g. [0,1]"
              value={formData.sampleOutput}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  sampleOutput: e.target.value,
                })
              }
              className="w-full border border-slate-200 rounded-xl p-3 resize-none outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono text-sm"
            />
          </div>

          {/* Explanation */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Explanation (Optional)
            </label>

            <textarea
              rows={3}
              placeholder="Explain how the sample input produces the output..."
              value={formData.explanation}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  explanation: e.target.value,
                })
              }
              className="w-full border border-slate-200 rounded-xl p-3 resize-none outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
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
              {loading ? "Adding..." : "Add PYQ"}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
