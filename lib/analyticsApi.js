export async function fetchAnalyticsData() {
  try {
    const API_BASE =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

    const fetchOptions = {
      credentials: "include",
    };

    const [lcRecRes, lcWeakRes, cfProfRes, lcStatRes, cfStatRes] =
      await Promise.all([
        fetch(`${API_BASE}/recommendations/leetcode`, fetchOptions),
        fetch(`${API_BASE}/recommendations/leetcode/weakspots`, fetchOptions),
        fetch(`${API_BASE}/recommendations/codeforces/profile`, fetchOptions),
        fetch(`${API_BASE}/leetcodeStat`, fetchOptions),
        fetch(`${API_BASE}/codeforcesStat/me`, fetchOptions),
      ]);

    const lcRec = lcRecRes.ok ? (await lcRecRes.json()).data : null;
    const lcWeak = lcWeakRes.ok ? (await lcWeakRes.json()).data : null;
    const cfProf = cfProfRes.ok ? (await cfProfRes.json()).data : null;
    const lcProfileStats = lcStatRes.ok
      ? (await lcStatRes.json()).data
      : null;
    const cfProfileStats = cfStatRes.ok
      ? (await cfStatRes.json()).data
      : null;

    let radarData = [];
    let topicsData = [];
    let lcLineData = [];
    let cfLineData = [];
    let lcPieData = [];
    let cfPieData = [];

    let lcStats = {
      total: 0,
      easy: 0,
      med: 0,
      hard: 0,
      maxRating: 0,
      medEasyRatio: 0,
      hardMedRatio: 0,
    };

    let cfStats = {
      maxRating: 0,
      velocity: 0,
      status: "neutral",
      aiConfidence: 0,
      recTarget: "MIXED",
      total: 0,
    };

    let weakspots = {
      list: [],
      insight: "",
    };

    
    const snapshot = lcRec?.masterySnapshot || lcRec?.mastery_snapshot;
    
    if (snapshot) {
      radarData = Object.entries(snapshot)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([key, val]) => ({
          subject: key
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" "),
          A: Math.round(val * 100),
          fullMark: 100,
        }));
    }

    if (cfProf?.topics) {
      topicsData = cfProf.topics.map((t) => {
        let levelColor = "text-emerald-600";
        let progressColor = "bg-emerald-500";
        let trackColor = "bg-emerald-100/60";

        if (t.level === "intermediate") {
          levelColor = "text-orange-500";
          progressColor = "bg-orange-500";
          trackColor = "bg-orange-100/60";
        } else if (t.level === "beginner") {
          levelColor = "text-rose-500";
          progressColor = "bg-rose-500";
          trackColor = "bg-rose-100/60";
        }

        return {
          topic: t.topic.charAt(0).toUpperCase() + t.topic.slice(1),
          level: t.level.charAt(0).toUpperCase() + t.level.slice(1),
          levelColor,
          progressColor,
          trackColor,
          progress: Math.round(t.mastery * 100),
          next: t.level === "beginner" ? "Start Basics" : "Advance",
        };
      });
    }

    if (lcWeak) {
      weakspots = {
        list: lcWeak.weak_spots || [],
        insight: lcWeak.insight || "",
      };
    }

    if (lcProfileStats) {
      lcPieData = [
        {
          name: "Easy",
          value: lcProfileStats.easySolved || 0,
          color: "#10b981",
        },
        {
          name: "Medium",
          value: lcProfileStats.mediumSolved || 0,
          color: "#f59e0b",
        },
        {
          name: "Hard",
          value: lcProfileStats.hardSolved || 0,
          color: "#f43f5e",
        },
      ];

      if (lcProfileStats.contestParticipation) {
        lcLineData = lcProfileStats.contestParticipation
          .map((c, i, arr) => ({
            name: new Date(c.contestDate).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
            }),
            rating: Math.round(c.rating),
            change:
              i === 0
                ? 0
                : Math.round(c.rating) - Math.round(arr[i - 1].rating) > 0
                ? `+${
                    Math.round(c.rating) - Math.round(arr[i - 1].rating)
                  }`
                : Math.round(c.rating) - Math.round(arr[i - 1].rating),
          }))
          .slice(-10);
      }

      lcStats = {
        total: lcProfileStats.totalSolved || 0,
        easy: lcProfileStats.easySolved || 0,
        med: lcProfileStats.mediumSolved || 0,
        hard: lcProfileStats.hardSolved || 0,
        maxRating: lcProfileStats.contestRating
          ? Math.round(lcProfileStats.contestRating)
          : 0,
        medEasyRatio: lcRec?.calibration?.medium_to_easy_ratio || 0,
        hardMedRatio: lcRec?.calibration?.hard_to_medium_ratio || 0,
      };
    }

    if (cfProf && cfProfileStats) {
      let grey = 0,
        green = 0,
        cyan = 0,
        blue = 0;

      if (cfProfileStats.solvedByProblemRating) {
        Object.entries(cfProfileStats.solvedByProblemRating).forEach(
          ([rating, count]) => {
            const r = parseInt(rating);

            if (r < 1200) grey += count;
            else if (r < 1400) green += count;
            else if (r < 1600) cyan += count;
            else blue += count;
          }
        );
      }

      cfPieData = [
        { name: "<1200", value: grey, color: "#94a3b8" },
        { name: "1200-1399", value: green, color: "#10b981" },
        { name: "1400-1599", value: cyan, color: "#06b6d4" },
        { name: "1600+", value: blue, color: "#3b82f6" },
      ];

      if (cfProfileStats.contestHistory) {
        cfLineData = cfProfileStats.contestHistory
          .map((c) => ({
            name: new Date(c.contestDate).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
            }),
            rating: c.newRating,
            change:
              c.newRating - c.oldRating > 0
                ? `+${c.newRating - c.oldRating}`
                : c.newRating - c.oldRating,
          }))
          .slice(-10);
      }

      cfStats = {
        maxRating: cfProfileStats.maxRating || 0,
        velocity: cfProf.growth_velocity || 0,
        status: cfProf.status || "neutral",
        aiConfidence: lcRec?.calibration?.confidence
          ? Math.round(lcRec.calibration.confidence * 100)
          : 0,
        recTarget:
          lcRec?.calibration?.recommended_difficulty || "MIXED",
        total: cfProfileStats.totalQuestionSolved || 0,
      };
    }

    return {
      radarData,
      topicsData,
      lcLineData,
      cfLineData,
      lcPieData,
      cfPieData,
      lcStats,
      cfStats,
      weakspots,
    };
  } catch (error) {
    console.error("Failed to fetch analytics:", error);

    return {
      radarData: [],
      topicsData: [],
      lcLineData: [],
      cfLineData: [],
      lcPieData: [],
      cfPieData: [],
      lcStats: {},
      cfStats: {},
      weakspots: {},
    };
  }
}