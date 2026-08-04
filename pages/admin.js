import { useEffect, useState } from "react";
import { BsEye, BsEyeSlash, BsExclamationCircleFill } from "react-icons/bs";
import SectionEditor from "../components/admin/SectionEditor";
import BlogManager from "../components/admin/BlogManager";
import { API_URL } from "../lib/api";

const sections = [
  { key: "hero", label: "Hero" },
  { key: "about", label: "About" },
  { key: "skills", label: "Skills" },
  { key: "experience", label: "Experience" },
  { key: "certifications", label: "Certifications" },
  { key: "contact", label: "Contact" },
  { key: "site", label: "Site / SEO" },
  { key: "blogs", label: "Blogs" },
];

function Login({ onLogin }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Login failed");
      localStorage.setItem("admin_token", json.token);
      onLogin(json.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-slate-950 px-4 text-slate-100">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur"
      >
        <h1 className="font-display text-2xl font-bold">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-slate-400">Sign in to edit your portfolio.</p>
        <div className="relative mt-6">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-sm text-slate-100 outline-none focus:border-teal-500"
            autoFocus
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-slate-400 hover:text-teal-400"
          >
            {showPassword ? <BsEyeSlash /> : <BsEye />}
          </button>
        </div>
        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-400">
            <BsExclamationCircleFill className="shrink-0 text-lg" />
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full rounded-full gradient-bg py-3 text-sm font-semibold text-white disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}

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
      .then((res) => res.json())
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
      if (!res.ok) throw new Error(json.error || "Save failed");
      setContent((c) => ({ ...c, [active]: data }));
      setMessage("Saved!");
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      setMessage(`Error: ${err.message}`);
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
        </main>
      </div>
    </div>
  );
}
