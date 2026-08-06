import { useEffect } from "react";
import { useRouter } from "next/router";
import { API_URL } from "../../_shared/frontend/api";

const VISITOR_KEY = "portfolio_visitor_id";

function getVisitorId() {
  let id = localStorage.getItem(VISITOR_KEY);
  if (!id) {
    id = `v_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(VISITOR_KEY, id);
  }
  return id;
}

const VisitorTracker = () => {
  const router = useRouter();

  useEffect(() => {
    const path = router.pathname || "/";
    if (path.startsWith("/admin")) return;

    try {
      const visitorId = getVisitorId();
      fetch(`${API_URL}/api/visitors`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitorId, path }),
      }).catch(() => {});
    } catch {
      // ignore tracking errors
    }
  }, [router.pathname]);

  return null;
};

export default VisitorTracker;
