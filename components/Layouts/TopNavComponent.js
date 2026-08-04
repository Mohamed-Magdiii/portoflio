import { useState } from "react";
import Link from "next/link";
import {
  BsFillMoonStarsFill,
  BsFillSunFill,
  BsDownload,
} from "react-icons/bs";

const links = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Experience", href: "/#experience" },
  { label: "Certifications", href: "/#certifications" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

const TopNavComponent = ({ handleClick, darkMode, content, site }) => {
  const [downloading, setDownloading] = useState(false);
  const resume = content?.resume || "Mohamed_Magdy_Senior_Outsystems.pdf";

  const onButtonClick = () => {
    setDownloading(true);
    fetch(resume)
      .then((response) => response.blob())
      .then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        const alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = resume;
        alink.click();
      })
      .finally(() => setDownloading(false));
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/60 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="font-burtons text-3xl gradient-text">
          {site?.logo || "Megz"}
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-teal-600 dark:text-slate-300 dark:hover:text-teal-400"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleClick}
            aria-label="Toggle dark mode"
            className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 transition-all duration-300 hover:border-teal-500 hover:text-teal-600 dark:border-white/10 dark:bg-white/5 dark:text-amber-300"
          >
            {darkMode ? (
              <BsFillSunFill className="text-xl" />
            ) : (
              <BsFillMoonStarsFill className="text-xl" />
            )}
          </button>
          <button
            className="btn-primary"
            onClick={onButtonClick}
            disabled={downloading}
          >
            <BsDownload />
            {downloading ? "Preparing..." : "Resume"}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default TopNavComponent;
