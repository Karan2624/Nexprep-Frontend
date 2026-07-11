"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  Pencil,
  Trash2,
  FileText,
  Target,
  Code2,
} from "lucide-react";

import { getCompanyPyqById, deleteCompanyPyq } from "@/lib/companyPyqApi";
import EditPyqModal from "@/components/company/EditPyqModal";

const DIFFICULTY_STYLES = {
  Easy: "bg-emerald-100 text-emerald-700",
  Medium: "bg-orange-100 text-orange-700",
  Hard: "bg-red-100 text-red-700",
};

export default function PyqDetailsPage() {
  const { companyId, pyqId } = useParams();
  const router = useRouter();

  const [pyq, setPyq] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchPyq = async () => {
    try {
      const res = await getCompanyPyqById(pyqId);
      setPyq(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!pyqId) return;
    fetchPyq();
  }, [pyqId]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this PYQ?"
    );

    if (!confirmDelete) return;

    try {
      setDeleting(true);
      await deleteCompanyPyq(pyq._id);

      alert("PYQ deleted successfully!");

      router.push(`/company-pyqs/${companyId}`);
    } catch (err) {
      console.error(err);

      alert(err?.response?.data?.message || "Failed to delete PYQ.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!pyq) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-16 text-center text-slate-500">
        PYQ not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">

        <Link
          href={`/company-pyqs/${companyId}`}
          className="inline-flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors text-sm font-semibold mb-6"
        >
          <ChevronLeft size={18} />
          Back to Company
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">

          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900">
              {pyq.title}
            </h1>

            <p className="text-slate-500 mt-2 text-sm font-medium">
              Interview Year: {pyq.yearAsked || "N/A"}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span
              className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide ${
                DIFFICULTY_STYLES[pyq.difficulty] || "bg-slate-100 text-slate-700"
              }`}
            >
              {pyq.difficulty || "N/A"}
            </span>

            <button
              onClick={() => setShowEditModal(true)}
              className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-slate-50 transition-colors"
            >
              <Pencil size={14} />
              Edit
            </button>

            <button
              onClick={handleDelete}
              disabled={deleting}
              className="inline-flex items-center gap-1.5 bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-red-100 transition-colors disabled:opacity-50"
            >
              <Trash2 size={14} />
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>

        </div>

        <hr className="my-6 border-slate-100" />

        <div className="space-y-8">

          <div>
            <h2 className="flex items-center gap-2 text-sm font-bold tracking-wide text-slate-400 uppercase mb-3">
              <FileText size={15} />
              Question Description
            </h2>

            <p className="text-slate-700 whitespace-pre-wrap leading-relaxed bg-slate-50 rounded-xl p-5">
              {pyq.description}
            </p>
          </div>

          <div>
            <h2 className="flex items-center gap-2 text-sm font-bold tracking-wide text-slate-400 uppercase mb-3">
              <Target size={15} />
              Topics
            </h2>

            <div className="flex flex-wrap gap-2">
              {pyq.tags?.length ? (
                pyq.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1.5 rounded-lg text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <p className="text-slate-400 text-sm">No tags available.</p>
              )}
            </div>
          </div>

          <div>
            <h2 className="flex items-center gap-2 text-sm font-bold tracking-wide text-slate-400 uppercase mb-3">
              <Code2 size={15} />
              Sample Test Cases
            </h2>

            {pyq.sampleTestCase?.length ? (
              <div className="space-y-4">
                {pyq.sampleTestCase.map((test, index) => (
                  <div
                    key={index}
                    className="bg-slate-900 rounded-xl p-5 font-mono text-sm space-y-2 overflow-x-auto"
                  >
                    <p className="text-slate-300">
                      <span className="text-slate-500">Input: </span>
                      {test.input}
                    </p>

                    <p className="text-slate-300">
                      <span className="text-slate-500">Output: </span>
                      <span className="text-emerald-400">{test.output}</span>
                    </p>

                    {test.explanation && (
                      <>
                        <div className="border-t border-slate-700 my-2" />
                        <p className="text-slate-400">
                          <span className="text-slate-500">Explanation: </span>
                          {test.explanation}
                        </p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 text-sm">
                No sample test cases available.
              </p>
            )}
          </div>

        </div>

      </div>

      {showEditModal && (
        <EditPyqModal
          pyq={pyq}
          onClose={() => setShowEditModal(false)}
          onSuccess={async () => {
            await fetchPyq();
            setShowEditModal(false);
            alert("PYQ updated successfully!");
          }}
        />
      )}
    </div>
  );
}
