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
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRegions = async () => {
      const { data, error: regErr } = await supabase
        .from("regions")
        .select("name")
        .eq("active", true)
        .order("name");
      if (!regErr && data) setRegions(data);
    };
    fetchRegions();
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

    setLoading(false);

    if (insErr) {
      setError("Something went wrong: " + insErr.message);
      return;
    }

    setDone(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl space-y-4 shadow-lg p-6">
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
  );
};

export default Testimonial;
