import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import BlogLayout, { useContent } from "../../components/Blog/BlogLayout";
import { API_URL } from "../../lib/api";
import { defaultContent } from "../../lib/defaultContent";
import { BsArrowRight, BsCalendar3 } from "react-icons/bs";

const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

export default function BlogIndex() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const content = useContent() || defaultContent;
  const section = content.blog || defaultContent.blog;

  useEffect(() => {
    let active = true;
    fetch(`${API_URL}/api/blogs`)
      .then((res) => res.json())
      .then((data) => {
        if (active) setBlogs(Array.isArray(data) ? data : []);
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <BlogLayout>
      <Head>
        <title>{section.heading || "Blog"} | Mohamed Magdy</title>
        <meta name="description" content={section.description} />
      </Head>

      <section className="py-16">
        <p className="section-title">Blog</p>
        <h3 className="section-heading">
          <span className="gradient-text">{section.heading}</span>
        </h3>
        <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
          {section.description}
        </p>

        {loading ? (
          <p className="mt-10 text-slate-500">Loading posts...</p>
        ) : blogs.length === 0 ? (
          <p className="mt-10 text-slate-500">No posts yet. Check back soon!</p>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {blogs.map((blog) => (
              <Link
                key={blog._id}
                href={`/blog/${blog.slug}`}
                className="glass group block p-8 transition-transform duration-300 hover:-translate-y-2"
              >
                {blog.cover && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={blog.cover}
                    alt={blog.title}
                    className="mb-6 h-44 w-full rounded-2xl object-cover"
                  />
                )}
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <BsCalendar3 />
                  {formatDate(blog.createdAt)}
                </div>
                <h4 className="mt-3 font-display text-xl font-bold transition-colors group-hover:text-teal-600 dark:group-hover:text-teal-400">
                  {blog.title}
                </h4>
                {blog.excerpt && (
                  <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                    {blog.excerpt}
                  </p>
                )}
                <div className="mt-5 flex flex-wrap gap-2">
                  {(blog.tags || []).map((tag) => (
                    <span
                      key={tag}
                      className="chip text-xs text-teal-600 dark:text-teal-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-teal-600 dark:text-teal-400">
                  Read more
                  <BsArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </BlogLayout>
  );
}
