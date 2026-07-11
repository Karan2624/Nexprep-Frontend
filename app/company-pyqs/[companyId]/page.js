"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  Plus,
  FileText,
  MessageSquare,
  Code2,
  Users,
  Briefcase,
  BookOpen,
  Target,
  CheckCircle2,
  XCircle,
  HelpCircle,
} from "lucide-react";

import { getCompanyById } from "@/lib/companyApi";
import { getReviewsByCompany } from "@/lib/companyReviewApi";
import { getCompanyPyqs } from "@/lib/companyPyqApi";

import AddReviewModal from "@/components/company/AddReviewModal";
import AddPyqModal from "@/components/company/AddPyqModal";

const AVATAR_COLORS = [
  "bg-blue-100 text-blue-700",
  "bg-emerald-100 text-emerald-700",
  "bg-orange-100 text-orange-700",
  "bg-purple-100 text-purple-700",
  "bg-pink-100 text-pink-700",
  "bg-teal-100 text-teal-700",
];

function getInitials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  return parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

function avatarColor(name = "") {
  const sum = [...name].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
}

function getAuthorName(item) {
  return (
    item?.authorId?.name ||
    item?.createdBy?.name ||
    item?.author?.name ||
    item?.userId?.name ||
    "Anonymous"
  );
}

function VerdictBadge({ verdict }) {
  const config = {
    Offered: {
      cls: "bg-emerald-100 text-emerald-700",
      icon: CheckCircle2,
    },
    Rejected: {
      cls: "bg-red-100 text-red-700",
      icon: XCircle,
    },
  }[verdict] || {
    cls: "bg-amber-100 text-amber-700",
    icon: HelpCircle,
  };

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shrink-0 ${config.cls}`}
    >
      <Icon size={14} />
      {verdict || "Pending"}
    </span>
  );
}

function DifficultyBadge({ difficulty }) {
  const cls =
    {
      Easy: "bg-emerald-100 text-emerald-700",
      Medium: "bg-orange-100 text-orange-700",
      Hard: "bg-red-100 text-red-700",
    }[difficulty] || "bg-slate-100 text-slate-700";

  return (
    <span
      className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide shrink-0 ${cls}`}
    >
      {difficulty || "N/A"}
    </span>
  );
}

export default function CompanyDetailsPage() {
  const { companyId } = useParams();

  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showPyqModal, setShowPyqModal] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [pyqs, setPyqs] = useState([]);
  const [activeTab, setActiveTab] = useState("pyqs");

  const fetchCompany = async () => {
    try {
      setLoading(true);

      const companyRes = await getCompanyById(companyId);
      setCompany(companyRes.data);

      const reviewRes = await getReviewsByCompany(companyId);
      setReviews(reviewRes.data || []);

      const pyqRes = await getCompanyPyqs(companyId);
      setPyqs(pyqRes.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!companyId) return;
    fetchCompany();
  }, [companyId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!company) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-16 text-center text-slate-500">
        Company not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Company Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">

        <Link
          href="/company-pyqs"
          className="inline-flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors text-sm font-semibold mb-6"
        >
          <ChevronLeft size={18} />
          Back to Companies
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">

          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0">
              {company.logo ? (
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-2xl font-bold text-slate-400">
                  {company.name?.[0]}
                </span>
              )}
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900">
                {company.name}
              </h1>

              <div className="flex items-center gap-4 mt-2 text-sm text-slate-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <FileText size={15} className="text-blue-500" />
                  {pyqs.length} OAs tracked
                </span>
                <span className="flex items-center gap-1.5">
                  <MessageSquare size={15} className="text-emerald-500" />
                  {reviews.length} Reviews
                </span>
              </div>
            </div>
          </div>

          <div className="relative shrink-0">
            <button
              onClick={() => setShowAddMenu((v) => !v)}
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-800 transition-colors shadow-md"
            >
              <Plus size={18} />
              Add Contribution
            </button>

            {showAddMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowAddMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden z-20">
                  <button
                    onClick={() => {
                      setShowAddMenu(false);
                      setShowPyqModal(true);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <Code2 size={16} className="text-blue-500" />
                    Add OA Question
                  </button>
                  <button
                    onClick={() => {
                      setShowAddMenu(false);
                      setShowReviewModal(true);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors border-t border-slate-100"
                  >
                    <Users size={16} className="text-emerald-500" />
                    Add Interview Review
                  </button>
                </div>
              </>
            )}
          </div>

        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setActiveTab("pyqs")}
          className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all ${
            activeTab === "pyqs"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Code2 size={18} />
          OA Questions ({pyqs.length})
        </button>

        <button
          onClick={() => setActiveTab("reviews")}
          className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all ${
            activeTab === "reviews"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Users size={18} />
          Interview Reviews ({reviews.length})
        </button>
      </div>

      {/* PYQ Modal */}
      {showPyqModal && (
        <AddPyqModal
          companyId={companyId}
          onClose={() => setShowPyqModal(false)}
          onSuccess={() => {
            setShowPyqModal(false);
            fetchCompany();
          }}
        />
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <AddReviewModal
          companyId={companyId}
          onClose={() => setShowReviewModal(false)}
          onSuccess={() => {
            setShowReviewModal(false);
            fetchCompany();
          }}
        />
      )}

      {/* OA Questions Tab */}
      {activeTab === "pyqs" && (
        <div className="space-y-5">
          {pyqs.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-16 text-center">
              <Code2 size={36} className="mx-auto text-slate-300 mb-3" />
              <p className="text-slate-500 font-medium">
                No OA questions added yet.
              </p>
            </div>
          ) : (
            pyqs.map((pyq) => {
              const authorName = getAuthorName(pyq);

              return (
                <Link key={pyq._id} href={`/company-pyqs/${companyId}/pyq/${pyq._id}`}>
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg hover:border-blue-200 transition-all cursor-pointer">

                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${avatarColor(
                            authorName
                          )}`}
                        >
                          {getInitials(authorName)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{authorName}</p>
                          <p className="text-sm text-slate-500">
                            Asked in {pyq.yearAsked || "N/A"}
                          </p>
                        </div>
                      </div>

                      <DifficultyBadge difficulty={pyq.difficulty} />
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {pyq.title}
                    </h3>

                    <p className="text-slate-600 leading-relaxed line-clamp-3">
                      {pyq.description}
                    </p>

                    {pyq.sampleTestCase?.[0]?.input && (
                      <div className="mt-5">
                        <p className="flex items-center gap-1.5 text-[11px] font-bold tracking-widest text-slate-400 uppercase mb-2">
                          <Code2 size={13} />
                          Sample Test Case
                        </p>

                        <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm space-y-1.5 overflow-x-auto">
                          <p className="text-slate-300">
                            <span className="text-slate-500">Input: </span>
                            {pyq.sampleTestCase[0].input}
                          </p>
                          {pyq.sampleTestCase[0].output && (
                            <p className="text-slate-300">
                              <span className="text-slate-500">Output: </span>
                              <span className="text-emerald-400">
                                {pyq.sampleTestCase[0].output}
                              </span>
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {pyq.tags?.length > 0 && (
                      <div className="flex items-center flex-wrap gap-2 mt-5 pt-5 border-t border-slate-100">
                        <Target size={15} className="text-slate-400 mr-1" />
                        {pyq.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1 rounded-lg text-sm font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                  </div>
                </Link>
              );
            })
          )}
        </div>
      )}

      {/* Interview Reviews Tab */}
      {activeTab === "reviews" && (
        <div className="space-y-5">
          {reviews.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-16 text-center">
              <Users size={36} className="mx-auto text-slate-300 mb-3" />
              <p className="text-slate-500 font-medium">
                No interview reviews yet.
              </p>
            </div>
          ) : (
            reviews.map((review) => {
              const authorName = review.authorId?.name || "Anonymous";

              return (
                <Link
                  key={review._id}
                  href={`/company-pyqs/${companyId}/review/${review._id}`}
                >
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg hover:border-blue-200 transition-all cursor-pointer">

                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${avatarColor(
                            authorName
                          )}`}
                        >
                          {getInitials(authorName)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{authorName}</p>
                          <p className="text-sm text-slate-500">
                            Interviewed in {review.year || "N/A"}
                          </p>
                        </div>
                      </div>

                      <VerdictBadge verdict={review.verdict} />
                    </div>

                    <p className="flex items-center gap-2 font-bold text-slate-900 mb-3">
                      <Briefcase size={16} className="text-blue-500" />
                      Applied for: {review.roleAppliedFor}
                    </p>

                    <div className="border-l-4 border-blue-500 bg-slate-50 rounded-r-xl px-5 py-4">
                      <p className="text-slate-700 italic leading-relaxed line-clamp-4">
                        &ldquo;{review.reviewText}&rdquo;
                      </p>
                    </div>

                    {review.topicsAsked?.length > 0 && (
                      <div className="flex items-center flex-wrap gap-2 mt-5 pt-5 border-t border-slate-100">
                        <BookOpen size={15} className="text-slate-400 mr-1" />
                        <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase mr-1">
                          Topics Asked:
                        </span>
                        {review.topicsAsked.map((topic, i) => (
                          <span
                            key={i}
                            className="bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1 rounded-lg text-sm font-medium"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}

                  </div>
                </Link>
              );
            })
          )}
        </div>
      )}

    </div>
  );
}
