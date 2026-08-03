import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import BlogLayout from "../../components/Blog/BlogLayout";
import { API_URL } from "../../lib/api";
import { BsArrowLeft, BsCalendar3 } from "react-icons/bs";

const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;
  const [blog, setBlog] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!slug) return;
    let active = true;
    setStatus("loading");
    fetch(`${API_URL}/api/blogs/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("notfound");
        return res.json();
      })
      .then((data) => {
        if (active) {
          setBlog(data);
          setStatus("found");
        }
      })
      .catch(() => {
        if (active) setStatus("notfound");
      });
    return () => {
      active = false;
    };
  }, [slug]);

  return (
    <BlogLayout>
      <Head>
        <title>{blog ? `${blog.title} | Mohamed Magdy` : "Blog | Mohamed Magdy"}</title>
        {blog && <meta name="description" content={blog.excerpt} />}
      </Head>

      <section className="py-16">
        {status === "loading" && <p className="text-slate-500">Loading post...</p>}

        {status === "notfound" && (
          <div className="max-w-2xl">
            <h1 className="section-heading">
              <span className="gradient-text">Post not found</span>
            </h1>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              The article you&apos;re looking for doesn&apos;t exist or was removed.
            </p>
            <Link href="/blog" className="btn-primary mt-8">
              <BsArrowLeft />
              Back to blog
            </Link>
          </div>
        )}

        {status === "found" && blog && (
          <article className="mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-teal-600 hover:text-teal-500 dark:text-teal-400"
            >
              <BsArrowLeft />
              Back to blog
            </Link>

            <h1 className="mt-6 font-display text-3xl font-bold leading-tight md:text-4xl">
              {blog.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-2">
                <BsCalendar3 />
                {formatDate(blog.createdAt)}
              </span>
              {(blog.tags || []).map((tag) => (
                <span key={tag} className="chip text-xs text-teal-600 dark:text-teal-400">
                  #{tag}
                </span>
              ))}
            </div>

            {blog.cover && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={blog.cover}
                alt={blog.title}
                className="mt-8 h-72 w-full rounded-3xl object-cover"
              />
            )}

            <div className="mt-8 space-y-6">
              {(blog.content || []).map((paragraph, i) => (
                <p
                  key={i}
                  className="leading-8 text-slate-700 dark:text-slate-200"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        )}
      </section>
    </BlogLayout>
  );
}
