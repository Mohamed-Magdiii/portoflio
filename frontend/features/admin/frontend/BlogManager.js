import { useEffect, useState } from "react";
import { API_URL } from "../../_shared/frontend/api";

const emptyForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  tags: "",
  cover: "",
  published: true,
};

const inputCls =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100";

const labelCls =
  "mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200";

export default function BlogManager({ token }) {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const load = () => {
    fetch(`${API_URL}/api/admin/blogs`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setBlogs(Array.isArray(data) ? data : []))
      .catch(() => setBlogs([]));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const setField = (name, value) => setForm((f) => ({ ...f, [name]: value }));

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    const payload = {
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt,
      cover: form.cover,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      content: form.content
        .split("\n")
        .map((p) => p.trim())
        .filter(Boolean),
      published: form.published,
    };
    try {
      const res = await fetch(
        editingId
          ? `${API_URL}/api/admin/blogs/${editingId}`
          : `${API_URL}/api/admin/blogs`,
        {
          method: editingId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Save failed");
      setMessage("Saved!");
      setForm(emptyForm);
      setEditingId(null);
      load();
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const edit = (blog) => {
    setEditingId(blog._id);
    setForm({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt || "",
      cover: blog.cover || "",
      content: (blog.content || []).join("\n"),
      tags: (blog.tags || []).join(", "),
      published: !!blog.published,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    try {
      const res = await fetch(`${API_URL}/api/admin/blogs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Delete failed");
      if (editingId === id) cancelEdit();
      load();
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={save}
        className="space-y-4 rounded-2xl border border-slate-200 p-4 dark:border-white/10"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            {editingId ? `Editing: ${form.title || "Untitled"}` : "New post"}
          </span>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="rounded-lg border border-slate-300 px-3 py-1 text-xs text-slate-500 hover:text-red-500 dark:border-white/15"
            >
              Cancel edit
            </button>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Title *</label>
            <input
              className={inputCls}
              value={form.title}
              onChange={(e) => setField("title", e.target.value)}
              placeholder="Post title"
              required
            />
          </div>
          <div>
            <label className={labelCls}>Slug (leave empty to auto-generate)</label>
            <input
              className={inputCls}
              value={form.slug}
              onChange={(e) => setField("slug", e.target.value)}
              placeholder="my-first-post"
            />
          </div>
        </div>

        <div>
          <label className={labelCls}>Excerpt</label>
          <textarea
            className={inputCls}
            rows={2}
            value={form.excerpt}
            onChange={(e) => setField("excerpt", e.target.value)}
            placeholder="Short summary shown on the blog list"
          />
        </div>

        <div>
          <label className={labelCls}>Content (one paragraph per line)</label>
          <textarea
            className={inputCls}
            rows={8}
            value={form.content}
            onChange={(e) => setField("content", e.target.value)}
            placeholder={"First paragraph\n\nSecond paragraph\n\n...each newline becomes a paragraph."}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Tags (comma separated)</label>
            <input
              className={inputCls}
              value={form.tags}
              onChange={(e) => setField("tags", e.target.value)}
              placeholder="OutSystems, React, Node.js"
            />
          </div>
          <div>
            <label className={labelCls}>Cover image URL (optional)</label>
            <input
              className={inputCls}
              value={form.cover}
              onChange={(e) => setField("cover", e.target.value)}
              placeholder="https://example.com/image.png"
            />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setField("published", e.target.checked)}
            className="h-4 w-4 accent-teal-500"
          />
          Published
        </label>

        <button
          type="submit"
          disabled={saving}
          className="btn-primary disabled:opacity-50"
        >
          {saving ? "Saving..." : editingId ? "Update post" : "Publish post"}
        </button>
      </form>

      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          Posts ({blogs.length})
        </h4>
        {blogs.length === 0 && (
          <p className="text-sm text-slate-500">No posts yet.</p>
        )}
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 p-4 dark:border-white/10"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="truncate font-medium text-slate-800 dark:text-slate-100">
                  {blog.title}
                </span>
                {!blog.published && (
                  <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
                    Draft
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                /blog/{blog.slug} ·{" "}
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <a
                href={`/blog/${blog.slug}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-teal-500 hover:text-teal-600 dark:border-white/15 dark:text-slate-300"
              >
                View
              </a>
              <button
                onClick={() => edit(blog)}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-teal-500 hover:text-teal-600 dark:border-white/15 dark:text-slate-300"
              >
                Edit
              </button>
              <button
                onClick={() => remove(blog._id)}
                className="rounded-lg border border-red-300 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 dark:border-red-500/30 dark:hover:bg-red-500/10"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {message && (
        <p className="text-sm font-medium text-teal-600 dark:text-teal-400">
          {message}
        </p>
      )}
    </div>
  );
}
