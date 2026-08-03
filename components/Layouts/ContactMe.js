/* eslint-disable react/no-unescaped-entities */

import { AiOutlineMail, AiFillPhone, AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import { ImLocation } from "react-icons/im";
import { BsArrowRepeat } from "react-icons/bs";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const alertContent = () => {
  MySwal.fire({
    title: "Thanks For Contacting Me!",
    text: "Your message was successfully sent.",
    icon: "success",
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false,
  });
};

const ContactMe = ({ content }) => {
  const form = useRef();
  const [isDisabled, setIsDisabled] = useState(true);
  const [isSending, setIsSending] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);
    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        e.target,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          alertContent();
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
        }
      )
      .finally(() => setIsSending(false));
  };

  const handleChange = () => {
    const data = new FormData(form.current);
    const filled = ["from_name", "email", "subject", "message"].every((name) =>
      data.get(name).toString().trim()
    );
    setIsDisabled(!filled);
  };

  const contactItems = [
    {
      icon: <ImLocation className="text-2xl" />,
      label: "Location",
      value: content?.location,
    },
    {
      icon: <AiFillPhone className="text-2xl" />,
      label: "Call Me",
      value: content?.phone,
      href: content?.phone ? `tel:${content.phone.replace(/[^+\d]/g, "")}` : undefined,
    },
    {
      icon: <AiOutlineMail className="text-2xl" />,
      label: "Email Me",
      value: content?.email,
      href: content?.email ? `mailto:${content.email}` : undefined,
    },
  ];

  return (
    <section id="contact" className="scroll-mt-24 py-16">
      <p className="section-title">Contact</p>
      <h3 className="section-heading">
        <span className="gradient-text">{content?.heading || "Let's build something great"}</span>
      </h3>
      <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
        {content?.description}
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-5">
        <div className="glass flex flex-col gap-6 p-8 lg:col-span-2">
          <h4 className="font-display text-xl font-bold">Contact Info</h4>
          <ul className="space-y-5">
            {contactItems.map((item) => (
              <li key={item.label} className="flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-teal-500 to-indigo-500 text-white">
                  {item.icon}
                </span>
                <div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {item.label}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="font-medium text-slate-800 hover:text-teal-600 dark:text-slate-200 dark:hover:text-teal-400"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <div className="font-medium text-slate-800 dark:text-slate-200">
                      {item.value}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex gap-4 pt-4 text-3xl text-slate-600 dark:text-slate-300">
            <a
              href={content?.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="transition-colors hover:text-teal-600"
            >
              <AiFillLinkedin />
            </a>
            <a
              href={content?.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="transition-colors hover:text-teal-600"
            >
              <AiFillGithub />
            </a>
          </div>
        </div>

        <form
          ref={form}
          onSubmit={sendEmail}
          name="myForm"
          className="glass p-8 lg:col-span-3"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="from_name" className="mb-1.5 block text-sm font-medium">
                Name *
              </label>
              <input
                id="from_name"
                type="text"
                name="from_name"
                placeholder="Your name"
                className="field"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                Email *
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                className="field"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="number" className="mb-1.5 block text-sm font-medium">
                Phone number
              </label>
              <input
                id="number"
                type="text"
                name="number"
                placeholder="+20 100 000 0000"
                className="field"
              />
            </div>
            <div>
              <label htmlFor="subject" className="mb-1.5 block text-sm font-medium">
                Subject *
              </label>
              <input
                id="subject"
                type="text"
                name="subject"
                placeholder="Project inquiry"
                className="field"
                onChange={handleChange}
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                placeholder="Tell me about your project..."
                className="field resize-none"
                onChange={handleChange}
                required
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="btn-primary w-full sm:w-auto"
                disabled={isDisabled || isSending}
              >
                {isSending ? (
                  <>
                    <BsArrowRepeat className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactMe;
