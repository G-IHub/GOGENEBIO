import React, { useState } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      <div className="w-full max-w-md bg-white rounded-2xl space-y-4 shadow-lg p-6">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold">Admin Login</h2>
          <p className="text-sm text-gray-500">
            Sign in to view registrations and testimonials
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 mt-4">
          <label className="flex flex-col gap-2">
            <span className="font-medium text-sm">Email</span>
            <input
              type="email"
              className="w-full border rounded-lg p-3 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="font-medium text-sm">Password</span>
            <input
              type="password"
              className="w-full border rounded-lg p-3 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#511E8C] to-[#9D3CA7] rounded-lg text-white p-3 cursor-pointer"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-center text-sm">{error}</p>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
