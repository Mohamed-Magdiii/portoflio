import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";

const Footer = ({ site }) => {
  return (
    <footer className="relative border-t border-slate-200/60 bg-white/40 py-8 backdrop-blur dark:border-white/10 dark:bg-slate-950/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row lg:px-8">
        <a href="#" className="font-burtons text-2xl gradient-text">
          {site?.logo || "Megz"}
        </a>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} Mohamed Magdy. Built with React &amp; Next.js.
        </p>
        <div className="flex gap-4 text-2xl text-slate-600 dark:text-slate-300">
          <a
            href="https://www.linkedin.com/in/mohamed-magdy-outsystems"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-teal-600"
          >
            <AiFillLinkedin />
          </a>
          <a
            href="https://github.com/Mohamed-Magdiii"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-teal-600"
          >
            <AiFillGithub />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
