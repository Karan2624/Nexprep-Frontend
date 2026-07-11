"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Building2,
  FileText,
  Zap,
  Search,
  Clock,
  MessageSquare,
  ChevronRight,
} from "lucide-react";

import { getCompanies } from "@/lib/companyApi";
import { getCompanyPyqs } from "@/lib/companyPyqApi";
import { getReviewsByCompany } from "@/lib/companyReviewApi";
import AddCompanyModal from "@/components/company/AddCompanyModal";

/** Small, local, self-contained "time ago" helper — no new deps, no other folders touched. */
function timeAgo(dateString) {
  if (!dateString) return null;

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return null;

  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isToday) return "Today";
  if (seconds < 0) return "Today";

  const days = Math.floor(seconds / 86400);
  if (days < 1) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;

  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} ${months === 1 ? "month" : "months"} ago`;

  const years = Math.floor(days / 365);
  return `${years} ${years === 1 ? "year" : "years"} ago`;
}

const isWithinLastWeek = (dateString) => {
  if (!dateString) return false;
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return false;
  const days = (new Date() - date) / 86400000;
  return days >= 0 && days <= 7;
};

const mostRecentDate = (items = []) => {
  const dates = items
    .map((item) => item?.createdAt)
    .filter(Boolean)
    .map((d) => new Date(d))
    .filter((d) => !Number.isNaN(d.getTime()));

  if (!dates.length) return null;
  return new Date(Math.max(...dates.map((d) => d.getTime())));
};

export default function CompanyPyqsPage() {
  const [companies, setCompanies] = useState([]);
  const [statsById, setStatsById] = useState({});
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const res = await getCompanies();
      const list = res.data || [];
      setCompanies(list);

      // Per-company stats built from the SAME existing endpoints
      // (getCompanyPyqs / getReviewsByCompany) — no new API calls added.
      setStatsLoading(true);
      const entries = await Promise.all(
        list.map(async (company) => {
          try {
            const [pyqRes, reviewRes] = await Promise.all([
              getCompanyPyqs(company._id).catch(() => ({ data: [] })),
              getReviewsByCompany(company._id).catch(() => ({ data: [] })),
            ]);

            const pyqs = pyqRes.data || [];
            const reviews = reviewRes.data || [];

            return [
              company._id,
              {
                pyqCount: pyqs.length,
                reviewCount: reviews.length,
                lastActivity: mostRecentDate([...pyqs, ...reviews]),
                recentCount:
                  pyqs.filter((p) => isWithinLastWeek(p.createdAt)).length +
                  reviews.filter((r) => isWithinLastWeek(r.createdAt)).length,
                tags: [
                  ...new Set([
                    ...pyqs.flatMap((p) => p.tags || []),
                    ...reviews.flatMap((r) => r.topicsAsked || []),
                  ]),
                ],
              },
            ];
          } catch {
            return [
              company._id,
              {
                pyqCount: 0,
                reviewCount: 0,
                lastActivity: null,
                recentCount: 0,
                tags: [],
              },
            ];
          }
        })
      );

      setStatsById(Object.fromEntries(entries));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const totalQuestions = useMemo(
    () =>
      Object.values(statsById).reduce(
        (sum, s) => sum + (s.pyqCount || 0),
        0
      ),
    [statsById]
  );

  const recentUpdates = useMemo(
    () =>
      Object.values(statsById).reduce(
        (sum, s) => sum + (s.recentCount || 0),
        0
      ),
    [statsById]
  );

  const filteredCompanies = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return companies;

    return companies.filter((company) => {
      const stats = statsById[company._id];
      const nameMatch = company.name?.toLowerCase().includes(query);
      const tagMatch = stats?.tags?.some((tag) =>
        tag.toLowerCase().includes(query)
      );
      return nameMatch || tagMatch;
    });
  }, [companies, statsById, search]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900">
            Company PYQs &amp; OAs
          </h1>

          <p className="text-slate-500 mt-2 max-w-xl">
            Browse previous year online assessments and interview experiences.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all shrink-0"
        >
          <Building2 size={18} />
          Add Company
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

        <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-blue-600 to-indigo-700 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mb-4">
            <Building2 size={22} className="text-white" />
          </div>
          <p className="text-[11px] font-bold tracking-widest text-blue-100 uppercase">
            Tracked Companies
          </p>
          <p className="text-4xl font-black text-white mt-1">
            {companies.length}
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mb-4">
            <FileText size={22} className="text-white" />
          </div>
          <p className="text-[11px] font-bold tracking-widest text-emerald-100 uppercase">
            Total Questions
          </p>
          <p className="text-4xl font-black text-white mt-1">
            {statsLoading ? "—" : totalQuestions}
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-orange-500 to-red-600 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mb-4">
            <Zap size={22} className="text-white" />
          </div>
          <p className="text-[11px] font-bold tracking-widest text-orange-100 uppercase">
            Recent Updates
          </p>
          <p className="text-4xl font-black text-white mt-1">
            {statsLoading ? "—" : recentUpdates}{" "}
            <span className="text-base font-semibold text-orange-100 align-middle">
              this week
            </span>
          </p>
        </div>

      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-2">
        <div className="flex items-center gap-3 px-4 py-2.5">
          <Search size={20} className="text-slate-400 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search companies or topics (e.g. Google, DP, System Design)..."
            className="w-full outline-none text-slate-700 placeholder:text-slate-400 bg-transparent"
          />
        </div>
      </div>

      {/* Company Grid */}
      {filteredCompanies.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-16 text-center">
          <Building2 size={40} className="mx-auto text-slate-300 mb-3" />
          <p className="text-slate-500 font-medium">
            {companies.length === 0
              ? "No companies tracked yet. Add one to get started."
              : "No companies match your search."}
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredCompanies.map((company) => {
            const stats = statsById[company._id] || {};
            const activityLabel = timeAgo(stats.lastActivity);

            return (
              <Link key={company._id} href={`/company-pyqs/${company._id}`}>
                <div className="group bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg hover:border-blue-200 transition-all cursor-pointer h-full">

                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="w-16 h-16 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0">
                      {company.logo ? (
                        <img
                          src={company.logo}
                          alt={company.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="text-lg font-bold text-slate-400">
                          {company.name?.[0]}
                        </span>
                      )}
                    </div>

                    {activityLabel && (
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap ${
                          activityLabel === "Today"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-blue-50 text-blue-700"
                        }`}
                      >
                        <Clock size={12} />
                        {activityLabel}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {company.name}
                      </h2>

                      <div className="flex items-center gap-4 mt-2 text-sm text-slate-500 font-medium">
                        <span className="flex items-center gap-1.5">
                          <FileText size={15} className="text-blue-500" />
                          {statsLoading ? "…" : stats.pyqCount || 0} OAs
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MessageSquare size={15} className="text-emerald-500" />
                          {statsLoading ? "…" : stats.reviewCount || 0} Reviews
                        </span>
                      </div>
                    </div>

                    <ChevronRight
                      size={20}
                      className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all shrink-0"
                    />
                  </div>

                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Add Company Modal */}
      {showModal && (
        <AddCompanyModal
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            fetchCompanies();
          }}
        />
      )}

    </div>
  );
}
