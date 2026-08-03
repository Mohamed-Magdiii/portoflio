/* eslint-disable react/no-unescaped-entities */

const Skills = ({ content }) => {
  const skills = content?.skills || [];
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
        <span className="gradient-text">
          {content?.heading || "Technologies I work with"}
        </span>
      </h3>
      <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
        {content?.description}
      </p>
      <div className="mt-10 space-y-4">
        {firstHalf.length > 0 && <Row items={firstHalf} />}
        {secondHalf.length > 0 && <Row items={secondHalf} reverse />}
      </div>
    </section>
  );
};

export default Skills;
