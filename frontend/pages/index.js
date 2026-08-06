import Head from "next/head";
import { useEffect, useState } from "react";

import TopNavComponent from "../features/layout/frontend/TopNavComponent";
import Intro from "../features/profile/frontend/Intro";
import About from "../features/about/frontend/AboutSection";
import Skills from "../features/skills/frontend/SkillsSection";
import Experience from "../features/experience/frontend/Experience";
import ServicesSection from "../features/services/frontend/ServicesSection";
import Certifications from "../features/certifications/frontend/Certifications";
import ContactMe from "../features/contact/frontend/ContactMe";
import Footer from "../features/layout/frontend/Footer";
import { defaultContent } from "../features/_shared/frontend/defaultContent";
import { API_URL } from "../features/_shared/frontend/api";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [content, setContent] = useState(defaultContent);

  const handleClick = () => setDarkMode((d) => !d);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    let active = true;
    fetch(`${API_URL}/api/content`)
      .then((res) => res.json())
      .then((data) => {
        if (active) setContent({ ...defaultContent, ...data });
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const site = content.site || defaultContent.site;

  return (
    <div className="relative min-h-screen overflow-x-clip bg-slate-50 text-slate-800 transition-colors duration-500 dark:bg-slate-950 dark:text-slate-100">
      <Head>
        <title>{site.title || "Mohamed Magdy — OutSystems & Full Stack Developer"}</title>
        <meta name="description" content={site.description} />
        <meta
          name="keywords"
          content={
            Array.isArray(site.keywords) ? site.keywords.join(", ") : site.keywords || ""
          }
        />
        <meta name="author" content={site.author || "Mohamed Magdy"} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f172a" />

        <link rel="canonical" href={`${site.url || ""}/`} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={site.title} />
        <meta property="og:title" content={site.title} />
        <meta property="og:description" content={site.description} />
        <meta property="og:url" content={`${site.url || ""}/`} />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_SITE_URL || site.url || ""}/mohamed.png`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={site.title} />
        <meta name="twitter:description" content={site.description} />
        <meta
          name="twitter:image"
          content={`${process.env.NEXT_PUBLIC_SITE_URL || site.url || ""}/mohamed.png`}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Mohamed Magdy",
              jobTitle: "Senior OutSystems & Full Stack Developer",
              url: `${site.url || ""}/`,
              email: "mohamed.magdy.imosa@gmail.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Cairo",
                addressCountry: "EG",
              },
              knowsAbout: [
                "OutSystems",
                "Low-code Development",
                "React",
                "Next.js",
                "Node.js",
                "Express",
                "MongoDB",
                "OracleDB",
                "JavaScript",
                "TypeScript",
                "REST APIs",
                "Web Development",
              ],
              sameAs: [
                "https://www.linkedin.com/in/mohamed-magdy-outsystems/",
                "https://github.com/Mohamed-Magdiii",
              ],
            }),
          }}
        />
      </Head>

      <div className="blob blob-teal left-[-10%] top-[-5%] h-96 w-96" />
      <div className="blob blob-indigo right-[-12%] top-[35%] h-[28rem] w-[28rem]" />
      <div className="blob blob-teal bottom-[5%] left-[30%] h-72 w-72 opacity-40" />

      <TopNavComponent
        handleClick={handleClick}
        darkMode={darkMode}
        content={content.hero || defaultContent.hero}
        site={site}
      />

      <main className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <Intro
          content={content.hero || defaultContent.hero}
          contact={content.contact || defaultContent.contact}
        />
        <About content={content.about || defaultContent.about} />
        <Skills content={content.skills || defaultContent.skills} />
        <Experience content={content.experience || defaultContent.experience} />
        <ServicesSection
          content={content.services || defaultContent.services}
          contact={content.contact || defaultContent.contact}
        />
        <Certifications
          content={content.certifications || defaultContent.certifications}
        />
        <ContactMe content={content.contact || defaultContent.contact} />
      </main>

      <Footer site={site} />
    </div>
  );
}
