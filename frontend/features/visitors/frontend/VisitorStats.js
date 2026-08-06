import { useEffect, useState } from "react";
import {
  BsPeopleFill,
  BsEyeFill,
  BsPhoneFill,
  BsLaptopFill,
  BsTabletFill,
} from "react-icons/bs";
import { API_URL } from "../../_shared/frontend/api";

const deviceIcon = (type) => {
  if (type === "mobile") return <BsPhoneFill />;
  if (type === "tablet") return <BsTabletFill />;
  return <BsLaptopFill />;
};

const formatTime = (date) =>
  date
    ? new Date(date).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

const VisitorStats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/visitors`)
      .then((res) => res.json())
      .then(setStats)
      .catch(() => setStats(null));
  }, []);

  if (!stats) return null;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-teal-500/15 text-xl text-teal-600 dark:text-teal-400">
            <BsPeopleFill />
          </span>
          <div>
            <div className="text-2xl font-bold">{stats.totalVisitors}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Unique visitors
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-indigo-500/15 text-xl text-indigo-600 dark:text-indigo-400">
            <BsEyeFill />
          </span>
          <div>
            <div className="text-2xl font-bold">{stats.totalVisits}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Total visits
            </div>
          </div>
        </div>
      </div>

      {stats.recentVisits?.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/5">
          <div className="border-b border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 dark:border-white/10 dark:text-slate-200">
            Recent visitors
          </div>
          <ul className="divide-y divide-slate-200 dark:divide-white/10">
            {stats.recentVisits.map((visit, i) => (
              <li
                key={i}
                className="flex items-center gap-3 px-4 py-3 text-sm"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-teal-500/10 text-lg text-teal-600 dark:text-teal-400">
                  {deviceIcon(visit.device?.type)}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium text-slate-800 dark:text-slate-100">
                    {[visit.device?.brand, visit.device?.model]
                      .filter(Boolean)
                      .join(" ") || "Unknown device"}
                  </div>
                  <div className="truncate text-xs text-slate-500 dark:text-slate-400">
                    {[visit.device?.browser, visit.device?.os]
                      .filter(Boolean)
                      .join(" · ") || "Unknown"}
                    {" · "}
                    {visit.path}
                  </div>
                </div>
                <span className="shrink-0 text-xs text-slate-500 dark:text-slate-400">
                  {formatTime(visit.visitedAt)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default VisitorStats;
