import { useEffect, useState } from "react";
import { BsPeopleFill, BsEyeFill } from "react-icons/bs";
import { API_URL } from "../../_shared/frontend/api";

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
    <div className="mb-6 grid gap-4 sm:grid-cols-2">
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
  );
};

export default VisitorStats;
