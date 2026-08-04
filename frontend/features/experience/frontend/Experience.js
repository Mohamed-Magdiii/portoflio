/* eslint-disable react/no-unescaped-entities */

import Image from "next/image";
import { BsPatchCheckFill } from "react-icons/bs";
import code from "/public/code.png";
import design from "/public/design.png";
import browser from "/public/browser.png";

const icons = { design, code, browser };

const Experience = ({ content }) => {
  const cards = content?.cards || [];

  return (
    <section id="experience" className="scroll-mt-24 py-16">
      <p className="section-title">Experience</p>
      <h3 className="section-heading">
        <span className="gradient-text">
          {content?.heading || "What I bring to the table"}
        </span>
      </h3>
      <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
        {content?.description}
      </p>

      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {cards.map((card, index) => (
          <div
            key={index}
            className="glass flex flex-col items-center p-8 text-center transition-transform duration-300 hover:-translate-y-2"
          >
            <div className="grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-teal-500/15 to-indigo-500/15">
              {icons[card.icon] && (
                <Image
                  src={icons[card.icon]}
                  width={64}
                  height={64}
                  alt={card.title}
                  className="h-16 w-16 object-contain"
                />
              )}
            </div>
            <h4 className="mt-6 font-display text-xl font-bold">{card.title}</h4>
            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
              {card.description}
            </p>
            <h5 className="mt-6 w-full text-sm font-semibold uppercase tracking-widest text-teal-600 dark:text-teal-400">
              Technologies I Use
            </h5>
            <ul className="mt-4 grid w-full grid-cols-2 gap-3">
              {(card.techs || []).map((tech, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200"
                >
                  <BsPatchCheckFill className="shrink-0 text-teal-500" />
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
