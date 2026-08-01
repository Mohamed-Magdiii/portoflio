/* eslint-disable react/no-unescaped-entities */

const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "MongoDB",
  "OracleDB",
  "SQL",
  "OutSystems",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "Bootstrap",
  "Java",
  "REST APIs",
  "Git",
  "Responsive Design",
];

const Skills = () => {
  const firstHalf = skills.slice(0, Math.ceil(skills.length / 2));
  const secondHalf = skills.slice(Math.ceil(skills.length / 2));

  const Row = ({ items, reverse }) => (
    <div className="relative flex overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className={`marquee-track gap-4 pr-4 ${
          reverse ? "marquee-track-reverse" : ""
        }`}
      >
        {[...items, ...items, ...items, ...items].map((skill, index) => (
          <span
            key={`${skill}-${index}`}
            className="chip shrink-0 whitespace-nowrap"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <section id="skills" className="scroll-mt-24 py-16">
      <p className="section-title">Skills</p>
      <h3 className="section-heading">
        Technologies I <span className="gradient-text">work with</span>
      </h3>
      <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
        A blend of full stack, database and low-code skills I've sharpened
        across real products and learning projects.
      </p>
      <div className="mt-10 space-y-4">
        <Row items={firstHalf} />
        <Row items={secondHalf} reverse />
      </div>
    </section>
  );
};

export default Skills;
