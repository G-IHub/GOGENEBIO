import React, { useState } from "react";
import { supabase } from "../../supabaseClient";
import { Link } from "react-router-dom";

const PROGRAMS = [
  "GoGeneBio",
  "Innovation Tour Outreach",
  "School Host-Based Outreach",
  "Not sure yet / any",
];

const Field = ({ label, required, children }) => (
  <label className="flex flex-col gap-2">
    <span className="font-landing font-medium text-sm">
      {label} {required && <span className="text-red-500">*</span>}
    </span>
    {children}
  </label>
);

const inputCls = "w-full border border-[#e6e1ef] rounded-lg p-3 focus:outline-none";

const Host = () => {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    organisation: "",
    country: "",
    city: "",
    role: "",
    program: "",
    cohort_size: "",
    motivation: "",
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const change = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: insErr } = await supabase.from("host_applications").insert([
      {
        full_name: form.full_name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim() || null,
        organisation: form.organisation.trim() || null,
        country: form.country.trim(),
        city: form.city.trim() || null,
        role: form.role.trim() || null,
        program: form.program || null,
        cohort_size: form.cohort_size.trim() || null,
        motivation: form.motivation.trim() || null,
      },
    ]);

    setLoading(false);
    if (insErr) {
      setError("Something went wrong: " + insErr.message);
      return;
    }
    setDone(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] py-10 px-5">
      <div className="max-w-xl mx-auto">
        <Link
          to="/"
          className="font-landing text-sm text-[#8a8598] hover:text-[#b241b7]"
        >
          &larr; Global Outreach
        </Link>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mt-4">
          {done ? (
            <div className="text-center space-y-3 py-6">
              <h1 className="font-display text-2xl font-bold">
                Application received
              </h1>
              <p className="font-landing text-sm text-[#55506b]">
                Thank you for your interest in hosting. The Global Outreach team
                will be in touch by email.
              </p>
              <Link
                to="/"
                className="inline-block mt-2 font-landing text-sm text-[#b241b7] underline"
              >
                Back to Global Outreach
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center space-y-2">
                <h1 className="font-display text-2xl font-bold">
                  Apply to Host a Program
                </h1>
                <p className="font-landing text-sm text-[#8a8598]">
                  For universities, schools, labs and community organisations
                </p>
              </div>

              <form onSubmit={submit} className="space-y-4 mt-6">
                <Field label="Your full name" required>
                  <input
                    className={inputCls}
                    name="full_name"
                    value={form.full_name}
                    onChange={change}
                    required
                  />
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Email" required>
                    <input
                      type="email"
                      className={inputCls}
                      name="email"
                      value={form.email}
                      onChange={change}
                      required
                    />
                  </Field>
                  <Field label="Phone / WhatsApp">
                    <input
                      className={inputCls}
                      name="phone"
                      value={form.phone}
                      onChange={change}
                    />
                  </Field>
                </div>

                <Field label="Organisation / institution">
                  <input
                    className={inputCls}
                    name="organisation"
                    value={form.organisation}
                    onChange={change}
                    placeholder="University, school, lab, community group…"
                  />
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Country" required>
                    <input
                      className={inputCls}
                      name="country"
                      value={form.country}
                      onChange={change}
                      required
                    />
                  </Field>
                  <Field label="City / region">
                    <input
                      className={inputCls}
                      name="city"
                      value={form.city}
                      onChange={change}
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Your role">
                    <input
                      className={inputCls}
                      name="role"
                      value={form.role}
                      onChange={change}
                      placeholder="Lecturer, student lead, coordinator…"
                    />
                  </Field>
                  <Field label="Program you'd host">
                    <select
                      className={inputCls}
                      name="program"
                      value={form.program}
                      onChange={change}
                    >
                      <option value="">Choose</option>
                      {PROGRAMS.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="Roughly how many participants could you host?">
                  <input
                    className={inputCls}
                    name="cohort_size"
                    value={form.cohort_size}
                    onChange={change}
                    placeholder="e.g. 20–30"
                  />
                </Field>

                <Field label="Why do you want to host, and what's your reach?">
                  <textarea
                    className={`${inputCls} h-28`}
                    name="motivation"
                    value={form.motivation}
                    onChange={change}
                  />
                </Field>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full font-landing font-semibold bg-linear-to-r from-[#b241b7] to-[#3d168b] text-white rounded-lg p-3 cursor-pointer disabled:opacity-50"
                >
                  {loading ? "Submitting…" : "Submit Application"}
                </button>

                {error && (
                  <p className="text-red-500 text-center text-sm">{error}</p>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Host;
