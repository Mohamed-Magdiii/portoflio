/* eslint-disable react/no-unescaped-entities */

import {
  AiFillLinkedin,
  AiFillGithub,
  AiOutlineMail,
} from "react-icons/ai";
import { BsDownload } from "react-icons/bs";
import Image from "next/image";
import deved from "../../public/mohamed.png";
import { useState, useEffect } from "react";

const toRotate = [
  "Web Developer",
  "Full Stack Developer",
  "Backend Developer",
  "Frontend Developer",
  "OutSystems Developer",
];

const Intro = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const period = 500;

  useEffect(() => {
    const i = loopNum % toRotate.length;
    const fullText = toRotate[i];
    const updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    const timer = setTimeout(() => {
      setText(updatedText);
      if (isDeleting) {
        setDelta((prev) => prev / 2);
      }
      if (!isDeleting && updatedText === fullText) {
        setIsDeleting(true);
        setDelta(period);
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setLoopNum((num) => num + 1);
        setDelta(700);
      }
    }, delta);

    return () => clearTimeout(timer);
  }, [text, delta, isDeleting, loopNum]);

  return (
    <section className="grid items-center gap-12 py-16 md:grid-cols-2 lg:py-24">
      <div className="text-center md:text-left">
        <span className="chip mb-6 text-teal-600 dark:text-teal-400">
          <span className="h-2 w-2 animate-pulse rounded-full bg-teal-500" />
          Available for work
        </span>
        <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
          Hi, I'm{" "}
          <span className="gradient-text">Mohamed Magdy</span>
        </h1>
        <h2 className="mt-3 font-display text-2xl font-semibold text-slate-700 dark:text-slate-200 md:text-3xl">
          {text}
          <span className="caret" />
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300 md:mx-0">
          Full Stack &amp; OutSystems developer building fast, reliable web
          applications with the MERN stack and low-code platforms. Let's get
          cracking together.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
          <a
            href="Mohamed_Magdy_Senior_Outsystems.pdf"
            download
            className="btn-primary"
          >
            <BsDownload />
            Download CV
          </a>
          <a href="mailto:mohamed.magdy.imosa@gmail.com" className="btn-ghost">
            <AiOutlineMail />
            Email me
          </a>
        </div>
        <div className="mt-8 flex justify-center gap-5 text-4xl text-slate-600 dark:text-slate-300 md:justify-start">
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

      <div className="relative mx-auto">
        <div className="animate-float">
          <div className="rounded-full bg-gradient-to-br from-teal-400 via-cyan-400 to-indigo-500 p-2 shadow-2xl shadow-teal-500/30">
            <div className="relative h-56 w-56 overflow-hidden rounded-full md:h-80 md:w-80 lg:h-96 lg:w-96">
              <Image
                src={deved}
                alt="Mohamed Magdy"
                fill
                sizes="(max-width: 768px) 14rem, 24rem"
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
