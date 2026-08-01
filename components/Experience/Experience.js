/* eslint-disable react/no-unescaped-entities */

import Image from "next/image";
import { BsPatchCheckFill } from "react-icons/bs";
import code from "/public/code.png";
import design from "/public/design.png";
import browser from "/public/browser.png";

const cards = [
  {
    title: "Front End Development",
    icon: design,
    alt: "Frontend development",
    description:
      "Creating elegant, responsive interfaces suited to your needs while following core design theory.",
    techs: ["HTML5", "CSS3", "JavaScript", "React JS", "Next.js"],
  },
  {
    title: "Back End Development",
    icon: code,
    alt: "Backend development",
    description:
      "Bringing your next great website to life with dynamic data and everything safely stored in a database.",
    techs: ["NodeJS", "MongoDB", "OracleDB", "Express", "Java"],
  },
  {
    title: "Low Code Development",
    icon: browser,
    alt: "Low code development",
    description:
      "Delivering dynamic business applications faster and at lower cost using OutSystems.",
    techs: ["OutSystems", "SQL Database", "JavaScript", "Architecture Canvas"],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="scroll-mt-24 py-16">
      <p className="section-title">Experience</p>
      <h3 className="section-heading">
        What I <span className="gradient-text">bring to the table</span>
      </h3>
      <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
        As a web developer I've collaborated with talented people and consulted
        for startups to create digital products that meet business and consumer
        needs.
      </p>

      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="glass flex flex-col items-center p-8 text-center transition-transform duration-300 hover:-translate-y-2"
          >
            <div className="grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-teal-500/15 to-indigo-500/15">
              <Image
                src={card.icon}
                width={64}
                height={64}
                alt={card.alt}
                className="h-16 w-16 object-contain"
              />
            </div>
            <h4 className="mt-6 font-display text-xl font-bold">{card.title}</h4>
            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
              {card.description}
            </p>
            <h5 className="mt-6 w-full text-sm font-semibold uppercase tracking-widest text-teal-600 dark:text-teal-400">
              Technologies I Use
            </h5>
            <ul className="mt-4 grid w-full grid-cols-2 gap-3">
              {card.techs.map((tech) => (
                <li
                  key={tech}
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
