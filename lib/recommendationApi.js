export async function fetchRecommendationsData() {
  try {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

    const [lcRes, cfRes] = await Promise.all([
      fetch(`${API_BASE}/recommendations/leetcode`, { credentials: "include" }),
      fetch(`${API_BASE}/recommendations/codeforces`, { credentials: "include" })
    ]);

    const lcData = lcRes.ok ? await lcRes.json() : null;
    const cfData = cfRes.ok ? await cfRes.json() : null;

    return {
      leetcode: lcData?.data || lcData || null,
      codeforces: cfData?.data || cfData || null
    };
  } catch (error) {
    console.error("Failed to fetch recommendations:", error);
    return { leetcode: null, codeforces: null };
  }
}