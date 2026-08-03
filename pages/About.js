/* eslint-disable react/no-unescaped-entities */

const About = ({ content }) => {
  const stats = content?.stats || [];
  const paragraphs = content?.paragraphs || [];

  return (
    <section id="about" className="scroll-mt-24 py-16">
      <p className="section-title">About</p>
      <div className="glass grid gap-8 p-8 md:grid-cols-3 md:p-10">
        <div className="md:col-span-2">
          <h3 className="section-heading">
            <span className="gradient-text">{content?.heading || "About me"}</span>
          </h3>
          {paragraphs.map((para, i) => (
            <p
              key={i}
              className="mt-5 leading-8 text-slate-600 dark:text-slate-300"
            >
              {para}
            </p>
          ))}
        </div>
        <div className="grid grid-cols-3 content-center gap-6 md:grid-cols-1">
          {stats.map((stat, i) => (
            <div key={i} className="text-center md:text-left">
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
