import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import SectionEditor from "../features/admin/frontend/SectionEditor";
import BlogManager from "../features/admin/frontend/BlogManager";
import Login from "../features/admin/frontend/Login";
import VisitorStats from "../features/visitors/frontend/VisitorStats";
import { API_URL } from "../features/_shared/frontend/api";

const MySwal = withReactContent(Swal);

const sections = [
  { key: "hero", label: "Hero" },
  { key: "about", label: "About" },
  { key: "skills", label: "Skills" },
  { key: "experience", label: "Experience" },
  { key: "certifications", label: "Certifications" },
  { key: "contact", label: "Contact" },
  { key: "site", label: "Site / SEO" },
  { key: "blogs", label: "Blogs" },
  { key: "visitors", label: "Visitors" },
];

export default function AdminPage() {
  const [token, setToken] = useState(null);
  const [content, setContent] = useState(null);
  const [active, setActive] = useState("hero");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("admin_token");
    if (stored) setToken(stored);
  }, []);

  useEffect(() => {
    if (!token) return;
    fetch(`${API_URL}/api/content`)
      .then((res) => {
        if (res.status === 401) {
          localStorage.removeItem("admin_token");
          setToken(null);
          return null;
        }
        return res.json();
      })
      .then(setContent)
      .catch(() => setContent(null));
  }, [token]);

  if (!token) return <Login onLogin={setToken} />;

  if (!content) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-950 text-slate-100">
        Loading content...
      </div>
    );
  }

  const save = async (data) => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch(`${API_URL}/api/admin/content/${active}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data }),
      });
      const json = await res.json();
      if (res.status === 401) {
        localStorage.removeItem("admin_token");
        setToken(null);
        return;
      }
      if (!res.ok) throw new Error(json.error || "Save failed");
      setContent((c) => ({ ...c, [active]: data }));
      setMessage("Saved!");
      setTimeout(() => setMessage(""), 2000);
      MySwal.fire({
        title: "Saved!",
        text: "Your changes were saved successfully.",
        icon: "success",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } catch (err) {
      setMessage(`Error: ${err.message}`);
      MySwal.fire({
        title: "Save Failed",
        text: err.message || "An error occurred while saving your changes.",
        icon: "error",
        confirmButtonColor: "#0d9488",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-slate-950/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="font-burtons text-2xl gradient-text">Megz</span>
            <span className="rounded-full bg-teal-500/15 px-3 py-1 text-xs font-semibold text-teal-600 dark:text-teal-400">
              Admin
            </span>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("admin_token");
              setToken(null);
            }}
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium hover:border-red-400 hover:text-red-500 dark:border-white/15"
          >
            Sign out
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-8 lg:grid-cols-[220px_1fr]">
        <aside className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-1">
          {sections.map((section) => (
            <button
              key={section.key}
              onClick={() => setActive(section.key)}
              className={`shrink-0 rounded-xl px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                active === section.key
                  ? "gradient-bg text-white"
                  : "text-slate-600 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:bg-white/5"
              }`}
            >
              {section.label}
            </button>
          ))}
        </aside>

        <main className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/5 sm:p-8">
          {active === "visitors" ? (
            <VisitorStats />
          ) : (
            <>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-display text-xl font-bold capitalize">
                  {sections.find((s) => s.key === active)?.label}
                </h2>
                {message && (
                  <span className="text-sm font-medium text-teal-600 dark:text-teal-400">
                    {message}
                  </span>
                )}
              </div>
              {active === "blogs" ? (
                <BlogManager token={token} />
              ) : (
                <SectionEditor
                  key={active}
                  sectionKey={active}
                  data={content[active]}
                  onSave={save}
                  saving={saving}
                />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
