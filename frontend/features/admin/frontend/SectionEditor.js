import { useState } from "react";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";

const fields = {
  hero: [
    { name: "greeting", label: "Greeting", type: "text" },
    { name: "name", label: "Name", type: "text" },
    { name: "intro", label: "Intro paragraph", type: "textarea" },
    { name: "avatar", label: "Avatar image path", type: "text" },
    { name: "resume", label: "Resume file path", type: "text" },
    { name: "email", label: "Email", type: "text" },
    { name: "linkedin", label: "LinkedIn URL", type: "text" },
    { name: "github", label: "GitHub URL", type: "text" },
    { name: "roles", label: "Rotating roles", type: "list" },
  ],
  about: [
    { name: "heading", label: "Heading", type: "text" },
    { name: "paragraphs", label: "Paragraphs", type: "list" },
    { name: "stats", label: "Stats (value / label)", type: "stats" },
  ],
  skills: [
    { name: "heading", label: "Heading", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "skills", label: "Skills", type: "list" },
  ],
  experience: [
    { name: "heading", label: "Heading", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "cards", label: "Cards", type: "cards" },
  ],
  contact: [
    { name: "heading", label: "Heading", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "location", label: "Location", type: "text" },
    { name: "phone", label: "Phone", type: "text" },
    { name: "email", label: "Email", type: "text" },
    { name: "linkedin", label: "LinkedIn URL", type: "text" },
    { name: "github", label: "GitHub URL", type: "text" },
    { name: "bookingUrl", label: "Booking URL (Calendly)", type: "text" },
  ],
  services: [
    { name: "heading", label: "Heading", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "ctaLabel", label: "CTA button label", type: "text" },
    { name: "items", label: "Services", type: "services" },
  ],
  blog: [
    { name: "heading", label: "Heading", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
  ],
  certifications: [
    { name: "heading", label: "Heading", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "items", label: "Certifications", type: "certs" },
  ],
  site: [
    { name: "logo", label: "Logo text", type: "text" },
    { name: "title", label: "Site title (SEO)", type: "text" },
    { name: "description", label: "Site description (SEO)", type: "textarea" },
  ],
};

const inputCls =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100";

const moveItem = (items, index, dir) => {
  const target = index + dir;
  if (target < 0 || target >= items.length) return items;
  const next = [...items];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
};

function MoveButtons({ items, index, onChange, compact }) {
  const cls = compact
    ? "grid h-6 w-6 place-items-center rounded-md border border-slate-300 text-slate-500 hover:border-teal-500 hover:text-teal-600 disabled:cursor-not-allowed disabled:opacity-30 dark:border-white/15 dark:text-slate-400"
    : "grid h-8 w-8 shrink-0 place-items-center rounded-xl border border-slate-300 text-slate-500 hover:border-teal-500 hover:text-teal-600 disabled:cursor-not-allowed disabled:opacity-30 dark:border-white/15 dark:text-slate-400";
  return (
    <div className="flex gap-1">
      <button
        type="button"
        title="Move up"
        aria-label="Move up"
        disabled={index === 0}
        onClick={() => onChange(moveItem(items, index, -1))}
        className={cls}
      >
        <BsArrowUp />
      </button>
      <button
        type="button"
        title="Move down"
        aria-label="Move down"
        disabled={index === items.length - 1}
        onClick={() => onChange(moveItem(items, index, 1))}
        className={cls}
      >
        <BsArrowDown />
      </button>
    </div>
  );
}

function StringList({ items, onChange }) {
  const update = (index, value) => {
    const next = [...items];
    next[index] = value;
    onChange(next);
  };
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <input
            className={inputCls}
            value={item}
            onChange={(e) => update(i, e.target.value)}
          />
          <MoveButtons items={items} index={i} onChange={onChange} />
          <button
            type="button"
            onClick={() => onChange(items.filter((_, j) => j !== i))}
            className="shrink-0 rounded-xl border border-red-300 px-3 text-red-500 hover:bg-red-50 dark:border-red-500/30 dark:hover:bg-red-500/10"
          >
            ×
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, ""])}
        className="rounded-xl border border-teal-500/40 px-4 py-1.5 text-sm font-medium text-teal-600 hover:bg-teal-500/10 dark:text-teal-400"
      >
        + Add
      </button>
    </div>
  );
}

function StatsEditor({ items, onChange }) {
  const update = (index, patch) => {
    const next = items.map((item, j) => (j === index ? { ...item, ...patch } : item));
    onChange(next);
  };
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <input
            className={inputCls}
            placeholder="Value"
            value={item.value}
            onChange={(e) => update(i, { value: e.target.value })}
          />
          <input
            className={inputCls}
            placeholder="Label"
            value={item.label}
            onChange={(e) => update(i, { label: e.target.value })}
          />
          <MoveButtons items={items} index={i} onChange={onChange} />
          <button
            type="button"
            onClick={() => onChange(items.filter((_, j) => j !== i))}
            className="shrink-0 rounded-xl border border-red-300 px-3 text-red-500 hover:bg-red-50 dark:border-red-500/30 dark:hover:bg-red-500/10"
          >
            ×
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, { value: "", label: "" }])}
        className="rounded-xl border border-teal-500/40 px-4 py-1.5 text-sm font-medium text-teal-600 hover:bg-teal-500/10 dark:text-teal-400"
      >
        + Add
      </button>
    </div>
  );
}

function CardsEditor({ items, onChange }) {
  const update = (index, patch) => {
    const next = items.map((item, j) => (j === index ? { ...item, ...patch } : item));
    onChange(next);
  };
  return (
    <div className="space-y-4">
      {items.map((card, i) => (
        <div key={i} className="rounded-2xl border border-slate-200 p-4 dark:border-white/10">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Card {i + 1}
            </span>
            <div className="flex items-center gap-2">
              <MoveButtons
                items={items}
                index={i}
                onChange={onChange}
                compact
              />
              <button
                type="button"
                onClick={() => onChange(items.filter((_, j) => j !== i))}
                className="rounded-lg border border-red-300 px-2 py-0.5 text-xs text-red-500 hover:bg-red-50 dark:border-red-500/30 dark:hover:bg-red-500/10"
              >
                Remove
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <input
              className={inputCls}
              placeholder="Title"
              value={card.title || ""}
              onChange={(e) => update(i, { title: e.target.value })}
            />
            <textarea
              className={inputCls}
              placeholder="Description"
              rows={2}
              value={card.description || ""}
              onChange={(e) => update(i, { description: e.target.value })}
            />
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 dark:text-slate-400">Icon key:</span>
              <input
                className={inputCls}
                placeholder="design / code / browser"
                value={card.icon || ""}
                onChange={(e) => update(i, { icon: e.target.value })}
              />
            </div>
            <div>
              <span className="mb-1 block text-xs text-slate-500 dark:text-slate-400">
                Technologies
              </span>
              <StringList
                items={card.techs || []}
                onChange={(techs) => update(i, { techs })}
              />
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          onChange([...items, { title: "", description: "", icon: "", techs: [] }])
        }
        className="rounded-xl border border-teal-500/40 px-4 py-1.5 text-sm font-medium text-teal-600 hover:bg-teal-500/10 dark:text-teal-400"
      >
        + Add card
      </button>
    </div>
  );
}

function ServicesEditor({ items, onChange }) {
  const update = (index, patch) => {
    const next = items.map((item, j) => (j === index ? { ...item, ...patch } : item));
    onChange(next);
  };
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="rounded-2xl border border-slate-200 p-4 dark:border-white/10">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Service {i + 1}
            </span>
            <div className="flex items-center gap-2">
              <MoveButtons
                items={items}
                index={i}
                onChange={onChange}
                compact
              />
              <button
                type="button"
                onClick={() => onChange(items.filter((_, j) => j !== i))}
                className="rounded-lg border border-red-300 px-2 py-0.5 text-xs text-red-500 hover:bg-red-50 dark:border-red-500/30 dark:hover:bg-red-500/10"
              >
                Remove
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <input
              className={inputCls}
              placeholder="Title"
              value={item.title || ""}
              onChange={(e) => update(i, { title: e.target.value })}
            />
            <textarea
              className={inputCls}
              placeholder="Description"
              rows={2}
              value={item.description || ""}
              onChange={(e) => update(i, { description: e.target.value })}
            />
            <input
              className={inputCls}
              placeholder="Price (e.g. 'from $100/hr') — optional"
              value={item.price || ""}
              onChange={(e) => update(i, { price: e.target.value })}
            />
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 dark:text-slate-400">Icon key:</span>
              <input
                className={inputCls}
                placeholder="design / code / browser"
                value={item.icon || ""}
                onChange={(e) => update(i, { icon: e.target.value })}
              />
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          onChange([...items, { title: "", description: "", price: "", icon: "" }])
        }
        className="rounded-xl border border-teal-500/40 px-4 py-1.5 text-sm font-medium text-teal-600 hover:bg-teal-500/10 dark:text-teal-400"
      >
        + Add service
      </button>
    </div>
  );
}

function CertsEditor({ items, onChange }) {
  const update = (index, patch) => {
    const next = items.map((item, j) => (j === index ? { ...item, ...patch } : item));
    onChange(next);
  };
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="rounded-2xl border border-slate-200 p-4 dark:border-white/10">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Certification {i + 1}
            </span>
            <div className="flex items-center gap-2">
              <MoveButtons
                items={items}
                index={i}
                onChange={onChange}
                compact
              />
              <button
                type="button"
                onClick={() => onChange(items.filter((_, j) => j !== i))}
                className="rounded-lg border border-red-300 px-2 py-0.5 text-xs text-red-500 hover:bg-red-50 dark:border-red-500/30 dark:hover:bg-red-500/10"
              >
                Remove
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <input
              className={inputCls}
              placeholder="Title"
              value={item.title || ""}
              onChange={(e) => update(i, { title: e.target.value })}
            />
            <input
              className={inputCls}
              placeholder="Issuer"
              value={item.issuer || ""}
              onChange={(e) => update(i, { issuer: e.target.value })}
            />
            <input
              className={inputCls}
              placeholder="Date"
              value={item.date || ""}
              onChange={(e) => update(i, { date: e.target.value })}
            />
            <input
              className={inputCls}
              placeholder="Certificate link (optional)"
              value={item.link || ""}
              onChange={(e) => update(i, { link: e.target.value })}
            />
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 dark:text-slate-400">Badge key:</span>
              <input
                className={inputCls}
                placeholder="o11 / odc / empty"
                value={item.badge || ""}
                onChange={(e) => update(i, { badge: e.target.value })}
              />
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          onChange([...items, { title: "", issuer: "", date: "", link: "", badge: "" }])
        }
        className="rounded-xl border border-teal-500/40 px-4 py-1.5 text-sm font-medium text-teal-600 hover:bg-teal-500/10 dark:text-teal-400"
      >
        + Add certification
      </button>
    </div>
  );
}

function Field({ field, value, onChange }) {
  switch (field.type) {
    case "list":
      return <StringList items={value || []} onChange={onChange} />;
    case "stats":
      return <StatsEditor items={value || []} onChange={onChange} />;
    case "cards":
      return <CardsEditor items={value || []} onChange={onChange} />;
    case "certs":
      return <CertsEditor items={value || []} onChange={onChange} />;
    case "services":
      return <ServicesEditor items={value || []} onChange={onChange} />;
    case "textarea":
      return (
        <textarea
          className={inputCls}
          rows={3}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    default:
      return (
        <input
          className={inputCls}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      );
  }
}

export default function SectionEditor({ sectionKey, data, onSave, saving }) {
  const [draft, setDraft] = useState(data);

  const setField = (name, value) => setDraft((d) => ({ ...d, [name]: value }));

  const sectionFields = fields[sectionKey];
  if (!sectionFields) return <p className="text-sm text-red-400">Unknown section</p>;

  return (
    <div className="space-y-5">
      {sectionFields.map((field) => (
        <div key={field.name}>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
            {field.label}
          </label>
          <Field
            field={field}
            value={draft[field.name]}
            onChange={(v) => setField(field.name, v)}
          />
        </div>
      ))}
      <button
        onClick={() => onSave(draft)}
        disabled={saving}
        className="btn-primary disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save section"}
      </button>
    </div>
  );
}
