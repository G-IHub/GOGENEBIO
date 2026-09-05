import React, { useState } from "react";
import { supabase } from "../../supabaseClient";
import { Link } from "react-router-dom";

const Testimonial = () => {
  const [name, setName] = useState("");
  const [testimonial, setTestimonial] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: insErr } = await supabase.from("testimonials").insert([
      { name: name.trim(), testimonial: testimonial.trim() },
    ]);

    setLoading(false);

    if (insErr) {
      setError("Something went wrong: " + insErr.message);
      return;
    }

    setDone(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5">
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
                  className="w-full border rounded-lg p-3 focus:outline-none"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="font-medium text-sm">
                  Testimonial <span className="text-red-500">*</span>
                </span>
                <textarea
                  className="w-full border rounded-lg p-3 h-32 focus:outline-none"
                  placeholder="Share your experience..."
                  value={testimonial}
                  onChange={(e) => setTestimonial(e.target.value)}
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
