"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  Briefcase,
  BookOpen,
  CheckCircle2,
  XCircle,
  HelpCircle,
} from "lucide-react";

import { getCompanyReviewById } from "@/lib/companyReviewApi";

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

const VERDICT_STYLES = {
  Offered: { cls: "bg-emerald-100 text-emerald-700", icon: CheckCircle2 },
  Rejected: { cls: "bg-red-100 text-red-700", icon: XCircle },
};

export default function ReviewDetailsPage() {
  const { companyId, reviewId } = useParams();

  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!reviewId) return;

    const fetchReview = async () => {
      try {
        const res = await getCompanyReviewById(reviewId);
        setReview(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReview();
  }, [reviewId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!review) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-16 text-center text-slate-500">
        Review not found.
      </div>
    );
  }

  const authorName = review.authorId?.name || "Anonymous";
  const verdictStyle =
    VERDICT_STYLES[review.verdict] || {
      cls: "bg-amber-100 text-amber-700",
      icon: HelpCircle,
    };
  const VerdictIcon = verdictStyle.icon;

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

          <div className="flex items-center gap-4">
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center font-bold shrink-0 ${avatarColor(
                authorName
              )}`}
            >
              {getInitials(authorName)}
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900">
                {authorName}
              </h1>
              <p className="text-slate-500 mt-1 text-sm font-medium">
                Interviewed in {review.year || "N/A"}
              </p>
            </div>
          </div>

          <span
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shrink-0 ${verdictStyle.cls}`}
          >
            <VerdictIcon size={14} />
            {review.verdict || "Pending"}
          </span>

        </div>

        <hr className="my-6 border-slate-100" />

        <div className="space-y-8">

          <div>
            <h2 className="flex items-center gap-2 text-sm font-bold tracking-wide text-slate-400 uppercase mb-3">
              <Briefcase size={15} />
              Applied For
            </h2>
            <p className="text-slate-900 font-semibold text-lg">
              {review.roleAppliedFor}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold tracking-wide text-slate-400 uppercase mb-3">
              Interview Experience
            </h2>

            <div className="border-l-4 border-blue-500 bg-slate-50 rounded-r-xl px-5 py-4">
              <p className="text-slate-700 whitespace-pre-wrap leading-relaxed italic">
                &ldquo;{review.reviewText}&rdquo;
              </p>
            </div>
          </div>

          <div>
            <h2 className="flex items-center gap-2 text-sm font-bold tracking-wide text-slate-400 uppercase mb-3">
              <BookOpen size={15} />
              Topics Asked
            </h2>

            <div className="flex flex-wrap gap-2">
              {review.topicsAsked?.length ? (
                review.topicsAsked.map((topic, index) => (
                  <span
                    key={index}
                    className="bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1.5 rounded-lg text-sm font-medium"
                  >
                    {topic}
                  </span>
                ))
              ) : (
                <p className="text-slate-400 text-sm">No topics recorded.</p>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
