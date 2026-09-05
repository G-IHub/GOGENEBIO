import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

const TABS = [
  { key: "registrations", label: "Registrations" },
  { key: "testimonials", label: "Testimonials" },
  { key: "regions", label: "Regions" },
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
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Regions tab UI state
  const [newRegion, setNewRegion] = useState({ name: "", wa_link: "" });
  const [regionEdits, setRegionEdits] = useState({});
  const [regionBusy, setRegionBusy] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError("");

    const [regRes, testRes, regionRes] = await Promise.all([
      supabase.from("registrations").select("*"),
      supabase.from("testimonials").select("*"),
      supabase.from("regions").select("*"),
    ]);

    if (regRes.error) setError(regRes.error.message);
    else setRegistrations(sortByCreatedAt(regRes.data || []));

    if (testRes.error) setError((prev) => prev || testRes.error.message);
    else setTestimonials(sortByCreatedAt(testRes.data || []));

    if (regionRes.error) setError((prev) => prev || regionRes.error.message);
    else
      setRegions(
        [...(regionRes.data || [])].sort((a, b) =>
          (a.name || "").localeCompare(b.name || "")
        )
      );

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const addRegion = async (e) => {
    e.preventDefault();
    if (!newRegion.name.trim() || !newRegion.wa_link.trim()) return;
    setRegionBusy(true);
    setError("");
    const { error: insErr } = await supabase.from("regions").insert([
      { name: newRegion.name.trim(), wa_link: newRegion.wa_link.trim() },
    ]);
    if (insErr) setError(insErr.message);
    else setNewRegion({ name: "", wa_link: "" });
    await fetchData();
    setRegionBusy(false);
  };

  const saveRegionLink = async (id) => {
    const link = (regionEdits[id] ?? "").trim();
    if (!link) return;
    setRegionBusy(true);
    setError("");
    const { error: updErr } = await supabase
      .from("regions")
      .update({ wa_link: link })
      .eq("id", id);
    if (updErr) setError(updErr.message);
    setRegionEdits((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    await fetchData();
    setRegionBusy(false);
  };

  const toggleRegionActive = async (region) => {
    setRegionBusy(true);
    setError("");
    const { error: updErr } = await supabase
      .from("regions")
      .update({ active: !region.active })
      .eq("id", region.id);
    if (updErr) setError(updErr.message);
    await fetchData();
    setRegionBusy(false);
  };

  const deleteRegion = async (region) => {
    if (!window.confirm(`Delete region "${region.name}"?`)) return;
    setRegionBusy(true);
    setError("");
    const { error: delErr } = await supabase
      .from("regions")
      .delete()
      .eq("id", region.id);
    if (delErr) setError(delErr.message);
    await fetchData();
    setRegionBusy(false);
  };

  const filteredRegistrations = useMemo(() => {
    if (!search.trim()) return registrations;
    const q = search.trim().toLowerCase();
    return registrations.filter(
      (r) =>
        r.full_name?.toLowerCase().includes(q) ||
        r.email?.toLowerCase().includes(q) ||
        r.region?.toLowerCase().includes(q) ||
        String(r.phone ?? "").includes(q)
    );
  }, [registrations, search]);

  const stats = useMemo(() => {
    const byExperience = {};
    const bySource = {};
    const byRegion = {};
    registrations.forEach((r) => {
      if (r.experience)
        byExperience[r.experience] = (byExperience[r.experience] || 0) + 1;
      if (r.heard_before)
        bySource[r.heard_before] = (bySource[r.heard_before] || 0) + 1;
      if (r.region) byRegion[r.region] = (byRegion[r.region] || 0) + 1;
    });
    return { byExperience, bySource, byRegion };
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

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <StatCard label="Total Registrations" value={registrations.length} />
        <StatCard label="Total Testimonials" value={testimonials.length} />
        <StatCard label="Top Region" value={topEntry(stats.byRegion)} />
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
              : tab.key === "testimonials"
              ? testimonials.length
              : regions.length}
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
            placeholder="Search by name, email, phone, or region..."
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
                  <th className="p-3">Region</th>
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
                    <td className="p-3">{r.region || "-"}</td>
                    <td className="p-3">{r.heard_before}</td>
                    <td className="p-3">{r.experience}</td>
                    <td className="p-3 whitespace-nowrap">
                      {formatDate(r.created_at)}
                    </td>
                  </tr>
                ))}
                {filteredRegistrations.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-3 text-center text-gray-500">
                      No registrations found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : activeTab === "testimonials" ? (
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
      ) : (
        <div>
          <form
            onSubmit={addRegion}
            className="bg-white rounded-lg shadow p-4 mb-6 flex flex-col md:flex-row gap-3 md:items-end"
          >
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-xs text-gray-500">Region name</label>
              <input
                type="text"
                value={newRegion.name}
                onChange={(e) =>
                  setNewRegion((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="e.g. Abuja"
                className="border rounded-lg p-2 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1 flex-[2]">
              <label className="text-xs text-gray-500">
                WhatsApp inbound link
              </label>
              <input
                type="url"
                value={newRegion.wa_link}
                onChange={(e) =>
                  setNewRegion((p) => ({ ...p, wa_link: e.target.value }))
                }
                placeholder="https://app.zikorail.com/go/XXXXXX"
                className="border rounded-lg p-2 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={regionBusy}
              className="bg-gradient-to-r from-[#511E8C] to-[#9D3CA7] rounded-lg text-white px-4 py-2 cursor-pointer whitespace-nowrap"
            >
              Add Region
            </button>
          </form>

          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">Region</th>
                  <th className="p-3">WhatsApp Inbound Link</th>
                  <th className="p-3">Registrations</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {regions.map((region) => {
                  const editing = regionEdits[region.id] !== undefined;
                  return (
                    <tr key={region.id} className="border-t align-top">
                      <td className="p-3 font-medium whitespace-nowrap">
                        {region.name}
                      </td>
                      <td className="p-3">
                        <div className="flex flex-col md:flex-row gap-2 md:items-center">
                          <input
                            type="url"
                            value={
                              editing
                                ? regionEdits[region.id]
                                : region.wa_link || ""
                            }
                            onChange={(e) =>
                              setRegionEdits((prev) => ({
                                ...prev,
                                [region.id]: e.target.value,
                              }))
                            }
                            className="border rounded-lg p-2 focus:outline-none w-full md:w-96"
                          />
                          {editing && (
                            <button
                              onClick={() => saveRegionLink(region.id)}
                              disabled={regionBusy}
                              className="text-[#9D3CA7] border border-[#9D3CA7] rounded-lg px-3 py-1 text-xs cursor-pointer whitespace-nowrap"
                            >
                              Save link
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="p-3">
                        {stats.byRegion[region.name] || 0}
                      </td>
                      <td className="p-3">
                        <span
                          className={
                            region.active
                              ? "text-green-600"
                              : "text-gray-400"
                          }
                        >
                          {region.active ? "Active" : "Hidden"}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-3 whitespace-nowrap">
                          <button
                            onClick={() => toggleRegionActive(region)}
                            disabled={regionBusy}
                            className="text-xs underline cursor-pointer"
                          >
                            {region.active ? "Hide" : "Show"}
                          </button>
                          <button
                            onClick={() => deleteRegion(region)}
                            disabled={regionBusy}
                            className="text-xs text-red-500 underline cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {regions.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-3 text-center text-gray-500">
                      No regions yet. Add one above.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            The registration form only shows <strong>Active</strong> regions that
            have a link. Applicants who pick a region are redirected to its link
            after registering.
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
