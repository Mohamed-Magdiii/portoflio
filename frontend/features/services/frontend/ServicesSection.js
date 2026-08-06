/* eslint-disable react/no-unescaped-entities */

import Image from "next/image";
import { BsArrowRight, BsPatchCheckFill } from "react-icons/bs";
import code from "/public/code.png";
import design from "/public/design.png";
import browser from "/public/browser.png";

const icons = { design, code, browser };

const ServicesSection = ({ content, contact }) => {
  const items = content?.items || [];
  const bookingUrl = contact?.bookingUrl;

  return (
    <section id="services" className="scroll-mt-24 py-16">
      <p className="section-title">Services</p>
      <h3 className="section-heading">
        <span className="gradient-text">
          {content?.heading || "Services"}
        </span>
      </h3>
      <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
        {content?.description}
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="glass flex flex-col p-6 transition-transform duration-300 hover:-translate-y-2"
          >
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-teal-500/15 to-indigo-500/15">
              {icons[item.icon] ? (
                <Image
                  src={icons[item.icon]}
                  width={40}
                  height={40}
                  alt={item.title}
                  className="h-10 w-10 object-contain"
                />
              ) : (
                <BsPatchCheckFill className="text-2xl text-teal-500" />
              )}
            </div>
            <h4 className="mt-5 font-display text-lg font-bold">{item.title}</h4>
            <p className="mt-2 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {item.description}
            </p>
            {item.price && (
              <span className="mt-4 text-sm font-semibold text-teal-600 dark:text-teal-400">
                {item.price}
              </span>
            )}
            {bookingUrl && (
              <a
                href={bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-teal-600 transition-colors hover:text-teal-500 dark:text-teal-400"
              >
                {content?.ctaLabel || "Book a free consultation"}
                <BsArrowRight />
              </a>
            )}
          </div>
        ))}
      </div>

      {bookingUrl && (
        <div className="mt-12 text-center">
          <a
            href={bookingUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            {content?.ctaLabel || "Book a free consultation"}
          </a>
        </div>
      )}
    </section>
  );
};

export default ServicesSection;
