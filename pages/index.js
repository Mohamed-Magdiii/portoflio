import Head from "next/head";
import { useEffect, useState } from "react";

import TopNavComponent from "../components/Layouts/TopNavComponent";
import Intro from "../components/Intro/Intro";
import About from "./About";
import Skills from "./Skills";
import Experience from "../components/Experience/Experience";
import ContactMe from "../components/Layouts/ContactMe";
import Footer from "../components/Layouts/Footer";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const handleClick = () => setDarkMode((d) => !d);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-slate-50 text-slate-800 transition-colors duration-500 dark:bg-slate-950 dark:text-slate-100">
      <Head>
        <title>Mohamed Magdy — Full Stack & OutSystems Developer</title>
        <meta
          name="description"
          content="Portfolio of Mohamed Magdy — Full Stack & OutSystems Developer building fast, reliable web applications with the MERN stack and low-code platforms."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f172a" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Mohamed Magdy — Full Stack & OutSystems Developer" />
        <meta
          property="og:description"
          content="Portfolio of Mohamed Magdy — Full Stack & OutSystems Developer building fast, reliable web applications."
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_SITE_URL || ""}/mohamed.png`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mohamed Magdy — Full Stack & OutSystems Developer" />
        <meta
          name="twitter:description"
          content="Portfolio of Mohamed Magdy — Full Stack & OutSystems Developer."
        />
        <meta
          name="twitter:image"
          content={`${process.env.NEXT_PUBLIC_SITE_URL || ""}/mohamed.png`}
        />
      </Head>

      <div className="blob blob-teal left-[-10%] top-[-5%] h-96 w-96" />
      <div className="blob blob-indigo right-[-12%] top-[35%] h-[28rem] w-[28rem]" />
      <div className="blob blob-teal bottom-[5%] left-[30%] h-72 w-72 opacity-40" />

      <TopNavComponent handleClick={handleClick} darkMode={darkMode} />

      <main className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <Intro />
        <About />
        <Skills />
        <Experience />
        <ContactMe />
      </main>

      <Footer />
    </div>
  );
}
