import React, { useState } from "react";
import { supabase } from "../../supabaseClient";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [testimonial, setTestimonial] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Existence check only — does not expose other registrants' data
      const { data: found, error } = await supabase.rpc(
        "registration_exists",
        { check_email: email.trim().toLowerCase() }
      );

      if (error) {
        setMessage("Database error: " + error.message);
        return;
      }

      if (!found) {
        setMessage("Email not found. Please check and try again.");
        return;
      }

      if (testimonial.trim()) {
        const { error: testimonialError } = await supabase
          .from("testimonials")
          .insert([{ testimonial: testimonial.trim() }]);

        if (testimonialError) {
          console.log("Testimonial error:", testimonialError);
        }
      }

      window.location.href = "https://genomac-certificate-generator.vercel.app/certificate/U2FsdGVkX1%2F5E10bkyBZYP68XUiKaoklAWLSPa%2BoLdXke309STnmUpILZfA2goc3Kf4BVnUICq6fTyKSJBKEurtltM%2BUaIRql1%2BJzcQi1eebHIeG%2BJc6MNxMgKD1SmtEJ3l2DxZxMLkzS%2Bejpfj998mTk7xTzfkEsPALRupt5AWnu0myFCDQgjt7Av7%2FEOvXcQX%2BD%2BJ3hnmMLY29xr2RiPSzdEu8o%2FGUVqHF7W%2BHFHXXRTSWrxeJEIX0CCEv4Y4zQms0BVxgG1YNndjnL%2B5ApIIWv3w3ZV9BIkpLtnFO8mo%3D";
    } catch (err) {
      console.log("Error:", err);
      setMessage("Error checking email: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl space-y-4 shadow-lg p-6">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold">Verify Email</h2>
          <p className="text-sm">Please verify your email to access your certificate</p>
        </div>

        <form onSubmit={handleVerify} className="space-y-4 mt-4">
          <label className="flex flex-col gap-2">
            <span className="font-medium text-sm">
              Email Address <span className="text-red-500">*</span>
            </span>
            <input
              type="email"
              className="w-full border rounded-lg p-3 focus:outline-none"
              placeholder="Registered email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="font-medium text-sm">Testimonial</span>
            <textarea
              className="w-full border rounded-lg p-3 h-28 focus:outline-none"
              placeholder="Share your experience..."
              value={testimonial}
              onChange={(e) => setTestimonial(e.target.value)}
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#511E8C] to-[#9D3CA7] rounded-lg text-white p-2 cursor-pointer"
          >
            {loading ? "Checking..." : "Verify"}
          </button>
        </form>

        {message && <p className="mt-4 text-red-500 text-center text-sm">{message}</p>}
      </div>
    </div>
  );
};

export default Auth;
