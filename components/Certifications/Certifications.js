/* eslint-disable react/no-unescaped-entities */

import Image from "next/image";
import { BsPatchCheckFill } from "react-icons/bs";
import o11Badge from "/public/Associate Developer - O11.png";
import odcBadge from "/public/Associate Developer - ODC.png";

const badgeIcons = { o11: o11Badge, odc: odcBadge };

const Certifications = ({ content }) => {
  const items = content?.items || [];

  return (
    <section id="certifications" className="scroll-mt-24 py-16">
      <p className="section-title">Certifications</p>
      <h3 className="section-heading">
        <span className="gradient-text">
          {content?.heading || "Certifications"}
        </span>
      </h3>
      <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
        {content?.description}
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="glass flex items-start gap-4 p-6 transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-teal-500/15 to-indigo-500/15">
              {badgeIcons[item.badge] ? (
                <Image
                  src={badgeIcons[item.badge]}
                  alt={item.title}
                  width={48}
                  height={48}
                  className="h-10 w-10 object-contain"
                />
              ) : (
                <BsPatchCheckFill className="text-2xl text-teal-500" />
              )}
            </div>
            <div className="min-w-0">
              <h4 className="font-display text-base font-bold leading-snug">
                {item.title}
              </h4>
              <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">
                {item.issuer}
              </p>
              {item.date && (
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  {item.date}
                </p>
              )}
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block text-sm font-semibold text-teal-600 hover:text-teal-500 dark:text-teal-400"
                >
                  View certificate →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
