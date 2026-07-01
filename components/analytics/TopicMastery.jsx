import { AlertCircle } from "lucide-react";

export default function TopicMastery({ topicsData, weakspots }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm lg:col-span-2">
      {weakspots.insight && (
        <div className="bg-red-50 p-3 rounded-lg mb-4 flex gap-2">
          <AlertCircle size={16} />
          <p>{weakspots.insight}</p>
        </div>
      )}

      {/* Scrollable section */}
      <div className="max-h-[320px] overflow-y-auto pr-2">
        {topicsData.map((topic, idx) => (
          <div key={idx} className="py-2 border-b">
            <div className="font-medium">{topic.topic}</div>
            <div className={topic.levelColor}>{topic.level}</div>

            {/* Progress bar */}
            <div className={`w-full h-2 rounded-full mt-2 ${topic.trackColor}`}>
              <div
                className={`h-2 rounded-full ${topic.progressColor}`}
                style={{ width: `${topic.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}