/* eslint-disable react/no-unescaped-entities */

const stats = [
  { value: "4+", label: "Years of experience" },
  { value: "15+", label: "Projects delivered" },
  { value: "10+", label: "Technologies" },
];

const About = () => {
  return (
    <section id="about" className="scroll-mt-24 py-16">
      <p className="section-title">About</p>
      <div className="glass grid gap-8 p-8 md:grid-cols-3 md:p-10">
        <div className="md:col-span-2">
          <h3 className="section-heading">
            A developer who cares about <span className="gradient-text">quality</span> and detail.
          </h3>
          <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
            I'm a Computer and Artificial Intelligence graduate and Full Stack
            developer specializing in the MERN stack, React, Node.js and
            OutSystems. I love turning ideas into polished, scalable web
            applications — from clean UI to solid backends and databases.
          </p>
          <p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">
            When I'm not writing code, I'm exploring new technologies,
            improving my workflows, and building products that solve real
            problems.
          </p>
        </div>
        <div className="grid grid-cols-3 content-center gap-6 md:grid-cols-1">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <div className="font-display text-4xl font-bold gradient-text">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
