import { api } from "./axios";


export async function fetchRecommendationsData() {
  try {

    const [lcData, cfData] = await Promise.all([
      api.get("/recommendations/leetcode")
         .then(res => res.data.data || res.data)
         .catch(() => null),
      api.get("/recommendations/codeforces")
         .then(res => res.data.data || res.data)
         .catch(() => null)
    ]);

    return {
      leetcode: lcData,
      codeforces: cfData
    };
  } catch (error) {
    console.error("Failed to fetch recommendations:", error);
    return { leetcode: null, codeforces: null };
  }
}