import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { Link } from "react-router-dom";

const Testimonial = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    country: "",
    region: "",
    testimonial: "",
  });
  const [regions, setRegions] = useState([]);
  const [promos, setPromos] = useState([]);
  const [openPromo, setOpenPromo] = useState(null);
  const [redirectUrl, setRedirectUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      const [regRes, promoRes, settingRes] = await Promise.all([
        supabase.from("regions").select("name").eq("active", true).order("name"),
        supabase
          .from("promos")
          .select("*")
          .eq("active", true)
          .order("sort_order")
          .order("created_at"),
        supabase
          .from("app_settings")
          .select("value")
          .eq("key", "testimonial_redirect_url")
          .maybeSingle(),
      ]);

      if (!regRes.error && regRes.data) setRegions(regRes.data);
      if (!promoRes.error && promoRes.data) setPromos(promoRes.data);
      if (!settingRes.error && settingRes.data?.value)
        setRedirectUrl(settingRes.data.value);
    };
    load();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: insErr } = await supabase.from("testimonials").insert([
      {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        country: form.country.trim(),
        region: form.region || null,
        testimonial: form.testimonial.trim(),
      },
    ]);

    if (insErr) {
      setLoading(false);
      setError("Something went wrong: " + insErr.message);
      return;
    }

    if (redirectUrl) {
      window.location.href = redirectUrl;
      return;
    }

    setLoading(false);
    setDone(true);
  };

  const Promos = () =>
    promos.length === 0 ? null : (
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">While you're here…</h3>
        <p className="text-sm text-gray-500">
          Other programs and offers you might be interested in.
        </p>
        <div className="grid gap-4">
          {promos.map((p) => {
            const hasDetails =
              (p.description && p.description.trim()) ||
              (p.benefits && p.benefits.length > 0);
            return (
              <div
                key={p.id}
                className="flex flex-col bg-white rounded-xl shadow overflow-hidden"
              >
                {p.image_url && (
                  <img
                    src={p.image_url}
                    alt={p.caption}
                    className="w-full h-auto object-contain bg-gray-50"
                  />
                )}
                <div className="p-3 flex flex-col gap-2 flex-1">
                  <p className="text-sm font-medium">{p.caption}</p>
                  <div className="mt-auto flex flex-col gap-2 pt-1">
                    {hasDetails && (
                      <button
                        type="button"
                        onClick={() => setOpenPromo(p)}
                        className="text-center border border-[#9D3CA7] text-[#9D3CA7] rounded-lg py-2 text-sm font-medium"
                      >
                        See details
                      </button>
                    )}
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-center bg-gradient-to-r from-[#511E8C] to-[#9D3CA7] text-white rounded-lg py-2 text-sm font-medium"
                    >
                      Register Now
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );

  const toParagraphs = (text) =>
    (text || "")
      .replace(/\r\n/g, "\n")
      .split(/\n{2,}/)
      .map((block) =>
        block
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
          .join(" ")
          .replace(/\s{2,}/g, " ")
      )
      .filter(Boolean);

  const PromoModal = () => {
    if (!openPromo) return null;
    const p = openPromo;
    const paragraphs = toParagraphs(p.description);
    return (
      <div
        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
        onClick={() => setOpenPromo(null)}
      >
        <div
          className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {p.image_url && (
            <img
              src={p.image_url}
              alt={p.caption}
              className="w-full h-auto object-contain rounded-t-2xl bg-gray-50"
            />
          )}
          <div className="p-5">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-bold leading-snug">{p.caption}</h3>
              <button
                type="button"
                onClick={() => setOpenPromo(null)}
                className="text-gray-400 text-2xl leading-none shrink-0"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {paragraphs.length > 0 && (
              <>
                <hr className="my-4 border-gray-200" />
                <div className="space-y-3">
                  {paragraphs.map((para, i) => (
                    <p
                      key={i}
                      className="text-sm text-gray-700 leading-relaxed"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </>
            )}

            {p.benefits && p.benefits.length > 0 && (
              <>
                <hr className="my-4 border-gray-200" />
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
                  What you'll get
                </p>
                <ul className="list-disc pl-5 space-y-1.5 marker:text-[#9D3CA7]">
                  {p.benefits.map((b, i) => (
                    <li key={i} className="text-sm text-gray-700 leading-relaxed">
                      {b}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <hr className="my-4 border-gray-200" />
            <a
              href={p.link}
              target="_blank"
              rel="noreferrer"
              className="block text-center bg-gradient-to-r from-[#511E8C] to-[#9D3CA7] text-white rounded-lg py-2.5 text-sm font-medium"
            >
              Register Now
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="md:h-screen md:overflow-hidden px-5 py-6 md:py-10">
      <div className="w-full max-w-5xl mx-auto grid gap-8 md:grid-cols-[minmax(0,1fr)_320px] md:h-full md:min-h-0">
        <div className="md:overflow-y-auto md:min-h-0 md:pr-1">
        <div className="bg-white rounded-2xl space-y-4 shadow-lg p-6">
          {done ? (
            <div className="space-y-3 text-center">
              <h2 className="text-2xl font-bold">Thank you!</h2>
              <p className="text-sm text-gray-600">
                Your testimonial has been received.
              </p>
              <Link
                to="/"
                className="inline-block mt-2 text-sm text-[#9D3CA7] underline"
              >
                Back to Home
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-2 text-center">
                <h2 className="text-2xl font-bold">Share Your Testimonial</h2>
                <p className="text-sm text-gray-500">
                  Tell us about your experience with GoGeneBio
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <label className="flex flex-col gap-2">
                  <span className="font-medium text-sm">
                    Your Name <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="text"
                    name="name"
                    className="w-full border rounded-lg p-3 focus:outline-none"
                    placeholder="Full name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="font-medium text-sm">
                    Email <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="email"
                    name="email"
                    className="w-full border rounded-lg p-3 focus:outline-none"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="font-medium text-sm">
                    Country <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="text"
                    name="country"
                    className="w-full border rounded-lg p-3 focus:outline-none"
                    placeholder="Country"
                    value={form.country}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="font-medium text-sm">Region</span>
                  <select
                    name="region"
                    className="w-full border rounded-lg p-3 focus:outline-none"
                    value={form.region}
                    onChange={handleChange}
                  >
                    <option value="">Select region (optional)</option>
                    {regions.map((r) => (
                      <option key={r.name} value={r.name}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-2">
                  <span className="font-medium text-sm">
                    Testimonial <span className="text-red-500">*</span>
                  </span>
                  <textarea
                    name="testimonial"
                    className="w-full border rounded-lg p-3 h-32 focus:outline-none"
                    placeholder="Share your experience..."
                    value={form.testimonial}
                    onChange={handleChange}
                    required
                  />
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#511E8C] to-[#9D3CA7] rounded-lg text-white p-3 cursor-pointer"
                >
                  {loading ? "Submitting..." : "Submit Testimonial"}
                </button>
              </form>

              {error && (
                <p className="text-red-500 text-center text-sm">{error}</p>
              )}
            </>
          )}
        </div>
        </div>

        <div className="md:overflow-y-auto md:min-h-0 md:pt-2">
          <Promos />
        </div>
      </div>
      <PromoModal />
    </div>
  );
};

export default Testimonial;
