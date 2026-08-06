import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  BsInboxFill,
  BsTrashFill,
  BsPersonFill,
  BsEnvelopeFill,
  BsTelephoneFill,
} from "react-icons/bs";
import { API_URL } from "../../_shared/frontend/api";

const MySwal = withReactContent(Swal);

const formatTime = (date) =>
  date
    ? new Date(date).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

const LeadsManager = ({ token }) => {
  const [leads, setLeads] = useState(null);

  const load = () => {
    fetch(`${API_URL}/api/leads`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => Array.isArray(data) && setLeads(data))
      .catch(() => setLeads([]));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const remove = (id) => {
    MySwal.fire({
      title: "Delete this lead?",
      text: "This cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (!result.isConfirmed) return;
      fetch(`${API_URL}/api/leads/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.ok) setLeads((l) => l.filter((lead) => lead._id !== id));
        })
        .catch(() => {});
    });
  };

  if (leads === null) {
    return <p className="py-8 text-center text-sm text-slate-500">Loading leads...</p>;
  }

  if (leads.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-12 text-center">
        <BsInboxFill className="text-4xl text-slate-300 dark:text-slate-600" />
        <p className="text-sm text-slate-500 dark:text-slate-400">
          No leads yet. Inquiries from your contact form will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        {leads.length} lead{leads.length === 1 ? "" : "s"} from your contact form
      </p>
      {leads.map((lead) => (
        <div
          key={lead._id}
          className="rounded-2xl border border-slate-200 p-4 dark:border-white/10"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-800 dark:text-slate-100">
                  <BsPersonFill className="text-teal-500" />
                  {lead.name}
                </span>
                <a
                  href={`mailto:${lead.email}`}
                  className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 dark:text-slate-400"
                >
                  <BsEnvelopeFill />
                  {lead.email}
                </a>
                {lead.phone && (
                  <a
                    href={`tel:${lead.phone.replace(/[^+\d]/g, "")}`}
                    className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 dark:text-slate-400"
                  >
                    <BsTelephoneFill />
                    {lead.phone}
                  </a>
                )}
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {lead.projectType && (
                  <span className="rounded-full bg-teal-500/10 px-2.5 py-0.5 text-xs font-medium text-teal-600 dark:text-teal-400">
                    {lead.projectType}
                  </span>
                )}
                {lead.budget && (
                  <span className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-xs font-medium text-indigo-600 dark:text-indigo-400">
                    {lead.budget}
                  </span>
                )}
              </div>
              {lead.subject && (
                <p className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                  {lead.subject}
                </p>
              )}
              <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-slate-600 dark:text-slate-300">
                {lead.message}
              </p>
              <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                {formatTime(lead.createdAt)}
              </p>
            </div>
            <button
              onClick={() => remove(lead._id)}
              title="Delete lead"
              aria-label="Delete lead"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-red-300 text-red-500 hover:bg-red-50 dark:border-red-500/30 dark:hover:bg-red-500/10"
            >
              <BsTrashFill />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeadsManager;
