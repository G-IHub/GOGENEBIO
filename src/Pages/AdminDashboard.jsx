import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

const TABS = [
  { key: "registrations", label: "Registrations" },
  { key: "testimonials", label: "Testimonials" },
];

const sortByCreatedAt = (rows) =>
  [...rows].sort((a, b) => {
    if (!a.created_at || !b.created_at) return 0;
    return new Date(b.created_at) - new Date(a.created_at);
  });

const topEntry = (obj) => {
  const entries = Object.entries(obj);
  if (entries.length === 0) return "-";
  entries.sort((a, b) => b[1] - a[1]);
  return `${entries[0][0]} (${entries[0][1]})`;
};

const formatDate = (value) => {
  if (!value) return "-";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "-";
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const StatCard = ({ label, value }) => (
  <div className="bg-white rounded-lg shadow p-4">
    <p className="text-xs md:text-sm text-gray-500">{label}</p>
    <p className="text-lg md:text-2xl font-bold mt-1">{value ?? "-"}</p>
  </div>
);

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("registrations");
  const [registrations, setRegistrations] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      const [regRes, testRes] = await Promise.all([
        supabase.from("registrations").select("*"),
        supabase.from("testimonials").select("*"),
      ]);

      if (regRes.error) setError(regRes.error.message);
      else setRegistrations(sortByCreatedAt(regRes.data || []));

      if (testRes.error) setError((prev) => prev || testRes.error.message);
      else setTestimonials(sortByCreatedAt(testRes.data || []));

      setLoading(false);
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const filteredRegistrations = useMemo(() => {
    if (!search.trim()) return registrations;
    const q = search.trim().toLowerCase();
    return registrations.filter(
      (r) =>
        r.full_name?.toLowerCase().includes(q) ||
        r.email?.toLowerCase().includes(q) ||
        String(r.phone ?? "").includes(q)
    );
  }, [registrations, search]);

  const stats = useMemo(() => {
    const byExperience = {};
    const bySource = {};
    registrations.forEach((r) => {
      if (r.experience)
        byExperience[r.experience] = (byExperience[r.experience] || 0) + 1;
      if (r.heard_before)
        bySource[r.heard_before] = (bySource[r.heard_before] || 0) + 1;
    });
    return { byExperience, bySource };
  }, [registrations]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-5 md:px-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#511E8C] to-[#9D3CA7]">
          Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="border border-[#9D3CA7] rounded-full px-4 py-2 text-sm cursor-pointer"
        >
          Log Out
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Registrations" value={registrations.length} />
        <StatCard label="Total Testimonials" value={testimonials.length} />
        <StatCard label="Top Source" value={topEntry(stats.bySource)} />
        <StatCard label="Top Audience" value={topEntry(stats.byExperience)} />
      </div>

      <div className="flex gap-2 mb-6 border-b">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm md:text-base font-medium cursor-pointer border-b-2 -mb-px ${
              activeTab === tab.key
                ? "border-[#9D3CA7] text-[#9D3CA7]"
                : "border-transparent text-gray-500"
            }`}
          >
            {tab.label} (
            {tab.key === "registrations"
              ? registrations.length
              : testimonials.length}
            )
          </button>
        ))}
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : activeTab === "registrations" ? (
        <div>
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg p-2 mb-4 w-full max-w-sm focus:outline-none bg-white"
          />
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">Full Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Heard About Us</th>
                  <th className="p-3">Experience</th>
                  <th className="p-3">Registered</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.map((r, idx) => (
                  <tr key={r.id ?? idx} className="border-t">
                    <td className="p-3">{r.full_name}</td>
                    <td className="p-3">{r.email}</td>
                    <td className="p-3">{r.phone}</td>
                    <td className="p-3">{r.heard_before}</td>
                    <td className="p-3">{r.experience}</td>
                    <td className="p-3 whitespace-nowrap">
                      {formatDate(r.created_at)}
                    </td>
                  </tr>
                ))}
                {filteredRegistrations.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-3 text-center text-gray-500">
                      No registrations found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Testimonial</th>
                <th className="p-3">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((t, idx) => (
                <tr key={t.id ?? idx} className="border-t align-top">
                  <td className="p-3">{t.testimonial}</td>
                  <td className="p-3 whitespace-nowrap">
                    {formatDate(t.created_at)}
                  </td>
                </tr>
              ))}
              {testimonials.length === 0 && (
                <tr>
                  <td colSpan={2} className="p-3 text-center text-gray-500">
                    No testimonials found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
