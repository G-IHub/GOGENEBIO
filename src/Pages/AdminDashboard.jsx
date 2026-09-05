import React, { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

const ImageDrop = ({ file, imageUrl, onFile }) => {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const preview = useMemo(
    () => (file ? URL.createObjectURL(file) : imageUrl || null),
    [file, imageUrl]
  );
  useEffect(() => {
    return () => {
      if (file && preview) URL.revokeObjectURL(preview);
    };
  }, [file, preview]);

  const pick = (f) => {
    if (f && f.type?.startsWith("image/")) onFile(f);
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        pick(e.dataTransfer.files?.[0]);
      }}
      className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition ${
        dragOver ? "border-[#9D3CA7] bg-purple-50" : "border-gray-300"
      }`}
    >
      {preview ? (
        <img
          src={preview}
          alt=""
          className="mx-auto max-h-32 rounded object-contain"
        />
      ) : (
        <p className="text-sm text-gray-500">
          Drag &amp; drop an image here, or click to browse
        </p>
      )}
      {file && (
        <p className="text-xs text-gray-500 mt-2 break-all">
          {file.name} — click or drop to replace
        </p>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => pick(e.target.files?.[0])}
      />
    </div>
  );
};

const TABS = [
  { key: "registrations", label: "Registrations" },
  { key: "testimonials", label: "Testimonials" },
  { key: "regions", label: "Regions" },
  { key: "testimonial_page", label: "Testimonial Page" },
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

const csvCell = (value) => {
  const s = value == null ? "" : String(value);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

const downloadCsv = (filename, columns, rows) => {
  const header = columns.map((c) => csvCell(c.label)).join(",");
  const body = rows
    .map((r) => columns.map((c) => csvCell(r[c.key])).join(","))
    .join("\n");
  const csv = header + "\n" + body;
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const REGISTRATION_COLUMNS = [
  { key: "full_name", label: "Full Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "region", label: "Region" },
  { key: "heard_before", label: "Heard About Us" },
  { key: "experience", label: "Experience" },
  { key: "created_at", label: "Registered At" },
];

const TESTIMONIAL_COLUMNS = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "country", label: "Country" },
  { key: "region", label: "Region" },
  { key: "testimonial", label: "Testimonial" },
  { key: "created_at", label: "Submitted At" },
];

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

  // Testimonial Page tab UI state
  const [promos, setPromos] = useState([]);
  const [redirectUrl, setRedirectUrl] = useState("");
  const [redirectSaved, setRedirectSaved] = useState(true);
  const [newPromo, setNewPromo] = useState({
    caption: "",
    description: "",
    benefits: "",
    link: "",
    file: null,
  });
  const [promoEdits, setPromoEdits] = useState({});
  const [promoBusy, setPromoBusy] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError("");

    const [regRes, testRes, regionRes, promoRes, settingRes] = await Promise.all(
      [
        supabase.from("registrations").select("*"),
        supabase.from("testimonials").select("*"),
        supabase.from("regions").select("*"),
        supabase.from("promos").select("*"),
        supabase
          .from("app_settings")
          .select("value")
          .eq("key", "testimonial_redirect_url")
          .maybeSingle(),
      ]
    );

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

    if (promoRes.error) setError((prev) => prev || promoRes.error.message);
    else
      setPromos(
        [...(promoRes.data || [])].sort(
          (a, b) =>
            (a.sort_order ?? 0) - (b.sort_order ?? 0) ||
            new Date(a.created_at) - new Date(b.created_at)
        )
      );

    if (!settingRes.error && settingRes.data) {
      setRedirectUrl(settingRes.data.value || "");
      setRedirectSaved(true);
    }

    setLoading(false);
  };

  const saveRedirectUrl = async () => {
    setPromoBusy(true);
    setError("");
    const { error: upErr } = await supabase
      .from("app_settings")
      .upsert(
        {
          key: "testimonial_redirect_url",
          value: redirectUrl.trim(),
          updated_at: new Date().toISOString(),
        },
        { onConflict: "key" }
      );
    if (upErr) setError(upErr.message);
    else setRedirectSaved(true);
    setPromoBusy(false);
  };

  const uploadPromoImage = async (file) => {
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error: upErr } = await supabase.storage
      .from("promos")
      .upload(path, file, { upsert: false });
    if (upErr) throw upErr;
    return supabase.storage.from("promos").getPublicUrl(path).data.publicUrl;
  };

  const linesToArray = (s) =>
    (s || "")
      .split("\n")
      .map((x) => x.trim())
      .filter(Boolean);

  const addPromo = async (e) => {
    e.preventDefault();
    if (!newPromo.caption.trim() || !newPromo.link.trim()) return;
    setPromoBusy(true);
    setError("");
    try {
      let image_url = null;
      if (newPromo.file) image_url = await uploadPromoImage(newPromo.file);
      const { error: insErr } = await supabase.from("promos").insert([
        {
          caption: newPromo.caption.trim(),
          description: newPromo.description.trim() || null,
          benefits: linesToArray(newPromo.benefits),
          link: newPromo.link.trim(),
          image_url,
          sort_order: promos.length,
        },
      ]);
      if (insErr) throw insErr;
      setNewPromo({
        caption: "",
        description: "",
        benefits: "",
        link: "",
        file: null,
      });
      await fetchData();
    } catch (err) {
      setError(err.message || String(err));
    }
    setPromoBusy(false);
  };

  const savePromo = async (id) => {
    const edit = promoEdits[id];
    if (!edit) return;
    setPromoBusy(true);
    setError("");
    try {
      const patch = {
        caption: edit.caption.trim(),
        description: edit.description.trim() || null,
        benefits: linesToArray(edit.benefits),
        link: edit.link.trim(),
      };
      if (edit.file) patch.image_url = await uploadPromoImage(edit.file);
      const { error: upErr } = await supabase
        .from("promos")
        .update(patch)
        .eq("id", id);
      if (upErr) throw upErr;
      setPromoEdits((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      await fetchData();
    } catch (err) {
      setError(err.message || String(err));
    }
    setPromoBusy(false);
  };

  const togglePromoActive = async (promo) => {
    setPromoBusy(true);
    setError("");
    const { error: upErr } = await supabase
      .from("promos")
      .update({ active: !promo.active })
      .eq("id", promo.id);
    if (upErr) setError(upErr.message);
    await fetchData();
    setPromoBusy(false);
  };

  const deletePromo = async (promo) => {
    if (!window.confirm("Delete this promo card?")) return;
    setPromoBusy(true);
    setError("");
    const { error: delErr } = await supabase
      .from("promos")
      .delete()
      .eq("id", promo.id);
    if (delErr) setError(delErr.message);
    await fetchData();
    setPromoBusy(false);
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

  const startRegionEdit = (region) => {
    setRegionEdits((prev) => ({
      ...prev,
      [region.id]: { name: region.name || "", wa_link: region.wa_link || "" },
    }));
  };

  const cancelRegionEdit = (id) => {
    setRegionEdits((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const saveRegion = async (id) => {
    const edit = regionEdits[id];
    if (!edit) return;
    const name = edit.name.trim();
    const wa_link = edit.wa_link.trim();
    if (!name || !wa_link) {
      setError("Region name and link are both required.");
      return;
    }
    setRegionBusy(true);
    setError("");
    const { error: updErr } = await supabase
      .from("regions")
      .update({ name, wa_link })
      .eq("id", id);
    if (updErr) setError(updErr.message);
    else cancelRegionEdit(id);
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
            {tab.label}
            {tab.key === "registrations"
              ? ` (${registrations.length})`
              : tab.key === "testimonials"
              ? ` (${testimonials.length})`
              : tab.key === "regions"
              ? ` (${regions.length})`
              : ""}
          </button>
        ))}
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : activeTab === "registrations" ? (
        <div>
          <div className="flex flex-wrap gap-3 mb-4 items-center">
            <input
              type="text"
              placeholder="Search by name, email, phone, or region..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-lg p-2 w-full max-w-sm focus:outline-none bg-white"
            />
            <button
              onClick={() =>
                downloadCsv(
                  `registrations-${new Date().toISOString().slice(0, 10)}.csv`,
                  REGISTRATION_COLUMNS,
                  filteredRegistrations
                )
              }
              disabled={filteredRegistrations.length === 0}
              className="border border-[#9D3CA7] text-[#9D3CA7] rounded-full px-4 py-2 text-sm cursor-pointer disabled:opacity-40"
            >
              Export CSV{search.trim() ? " (filtered)" : ""}
            </button>
          </div>
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
        <div>
          <div className="mb-4">
            <button
              onClick={() =>
                downloadCsv(
                  `testimonials-${new Date().toISOString().slice(0, 10)}.csv`,
                  TESTIMONIAL_COLUMNS,
                  testimonials
                )
              }
              disabled={testimonials.length === 0}
              className="border border-[#9D3CA7] text-[#9D3CA7] rounded-full px-4 py-2 text-sm cursor-pointer disabled:opacity-40"
            >
              Export CSV
            </button>
          </div>
          <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Country</th>
                <th className="p-3">Region</th>
                <th className="p-3">Testimonial</th>
                <th className="p-3">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((t, idx) => (
                <tr key={t.id ?? idx} className="border-t align-top">
                  <td className="p-3 whitespace-nowrap">{t.name || "-"}</td>
                  <td className="p-3 whitespace-nowrap">{t.email || "-"}</td>
                  <td className="p-3 whitespace-nowrap">{t.country || "-"}</td>
                  <td className="p-3 whitespace-nowrap">{t.region || "-"}</td>
                  <td className="p-3">{t.testimonial}</td>
                  <td className="p-3 whitespace-nowrap">
                    {formatDate(t.created_at)}
                  </td>
                </tr>
              ))}
              {testimonials.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-3 text-center text-gray-500">
                    No testimonials found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
        </div>
      ) : activeTab === "regions" ? (
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
                  const edit = regionEdits[region.id];
                  const editing = edit !== undefined;
                  return (
                    <tr key={region.id} className="border-t align-top">
                      <td className="p-3 whitespace-nowrap">
                        {editing ? (
                          <input
                            type="text"
                            value={edit.name}
                            onChange={(e) =>
                              setRegionEdits((prev) => ({
                                ...prev,
                                [region.id]: {
                                  ...prev[region.id],
                                  name: e.target.value,
                                },
                              }))
                            }
                            className="border rounded-lg p-2 focus:outline-none w-40"
                          />
                        ) : (
                          <span className="font-medium">{region.name}</span>
                        )}
                      </td>
                      <td className="p-3">
                        {editing ? (
                          <input
                            type="url"
                            value={edit.wa_link}
                            onChange={(e) =>
                              setRegionEdits((prev) => ({
                                ...prev,
                                [region.id]: {
                                  ...prev[region.id],
                                  wa_link: e.target.value,
                                },
                              }))
                            }
                            className="border rounded-lg p-2 focus:outline-none w-full md:w-96"
                          />
                        ) : (
                          <span className="break-all text-gray-600">
                            {region.wa_link}
                          </span>
                        )}
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
                          {editing ? (
                            <>
                              <button
                                onClick={() => saveRegion(region.id)}
                                disabled={regionBusy}
                                className="text-xs text-[#9D3CA7] underline cursor-pointer"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => cancelRegionEdit(region.id)}
                                disabled={regionBusy}
                                className="text-xs underline cursor-pointer"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => startRegionEdit(region)}
                                disabled={regionBusy}
                                className="text-xs underline cursor-pointer"
                              >
                                Edit
                              </button>
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
                            </>
                          )}
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
      ) : (
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold mb-1">After-submit redirect link</h3>
            <p className="text-xs text-gray-500 mb-3">
              Where people are sent right after submitting a testimonial (e.g.
              their certificate page). Leave blank to just show a thank-you
              message.
            </p>
            <div className="flex flex-col md:flex-row gap-3 md:items-center">
              <input
                type="url"
                value={redirectUrl}
                onChange={(e) => {
                  setRedirectUrl(e.target.value);
                  setRedirectSaved(false);
                }}
                placeholder="https://genomac-certificate-generator.vercel.app/..."
                className="border rounded-lg p-2 focus:outline-none w-full md:max-w-xl"
              />
              <button
                onClick={saveRedirectUrl}
                disabled={promoBusy || redirectSaved}
                className="bg-gradient-to-r from-[#511E8C] to-[#9D3CA7] rounded-lg text-white px-4 py-2 cursor-pointer disabled:opacity-40 whitespace-nowrap"
              >
                {redirectSaved ? "Saved" : "Save link"}
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-1">Program / offer cards</h3>
            <p className="text-xs text-gray-500 mb-4">
              Shown next to the testimonial form. Only <strong>Active</strong>{" "}
              cards appear.
            </p>

            <form
              onSubmit={addPromo}
              className="bg-white rounded-lg shadow p-4 mb-6 grid gap-3 md:grid-cols-2"
            >
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">Caption</label>
                <input
                  type="text"
                  value={newPromo.caption}
                  onChange={(e) =>
                    setNewPromo((p) => ({ ...p, caption: e.target.value }))
                  }
                  placeholder="Premium Bioinformatics Program"
                  className="border rounded-lg p-2 focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">Link</label>
                <input
                  type="url"
                  value={newPromo.link}
                  onChange={(e) =>
                    setNewPromo((p) => ({ ...p, link: e.target.value }))
                  }
                  placeholder="https://..."
                  className="border rounded-lg p-2 focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-xs text-gray-500">
                  Description (optional)
                </label>
                <textarea
                  value={newPromo.description}
                  onChange={(e) =>
                    setNewPromo((p) => ({ ...p, description: e.target.value }))
                  }
                  placeholder="A short paragraph about the program"
                  className="border rounded-lg p-2 h-20 focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-xs text-gray-500">
                  Benefits (one per line, optional)
                </label>
                <textarea
                  value={newPromo.benefits}
                  onChange={(e) =>
                    setNewPromo((p) => ({ ...p, benefits: e.target.value }))
                  }
                  placeholder={"Certificate of completion\nHands-on projects\n1:1 mentorship"}
                  className="border rounded-lg p-2 h-24 focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-xs text-gray-500">Image (optional)</label>
                <ImageDrop
                  file={newPromo.file}
                  onFile={(f) => setNewPromo((p) => ({ ...p, file: f }))}
                />
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={promoBusy}
                  className="bg-gradient-to-r from-[#511E8C] to-[#9D3CA7] rounded-lg text-white px-4 py-2 cursor-pointer disabled:opacity-40"
                >
                  {promoBusy ? "Working..." : "Add card"}
                </button>
              </div>
            </form>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {promos.map((promo) => {
                const edit = promoEdits[promo.id];
                const editing = edit !== undefined;
                return (
                  <div
                    key={promo.id}
                    className="bg-white rounded-lg shadow p-3 space-y-2"
                  >
                    {!editing && promo.image_url && (
                      <img
                        src={promo.image_url}
                        alt={promo.caption}
                        className="w-full h-auto object-contain rounded bg-gray-50"
                      />
                    )}
                    {editing ? (
                      <>
                        <input
                          type="text"
                          value={edit.caption}
                          onChange={(e) =>
                            setPromoEdits((prev) => ({
                              ...prev,
                              [promo.id]: {
                                ...prev[promo.id],
                                caption: e.target.value,
                              },
                            }))
                          }
                          className="border rounded p-2 w-full text-sm focus:outline-none"
                        />
                        <input
                          type="url"
                          value={edit.link}
                          onChange={(e) =>
                            setPromoEdits((prev) => ({
                              ...prev,
                              [promo.id]: {
                                ...prev[promo.id],
                                link: e.target.value,
                              },
                            }))
                          }
                          className="border rounded p-2 w-full text-sm focus:outline-none"
                        />
                        <textarea
                          value={edit.description}
                          placeholder="Description"
                          onChange={(e) =>
                            setPromoEdits((prev) => ({
                              ...prev,
                              [promo.id]: {
                                ...prev[promo.id],
                                description: e.target.value,
                              },
                            }))
                          }
                          className="border rounded p-2 w-full text-sm h-16 focus:outline-none"
                        />
                        <textarea
                          value={edit.benefits}
                          placeholder="Benefits (one per line)"
                          onChange={(e) =>
                            setPromoEdits((prev) => ({
                              ...prev,
                              [promo.id]: {
                                ...prev[promo.id],
                                benefits: e.target.value,
                              },
                            }))
                          }
                          className="border rounded p-2 w-full text-sm h-20 focus:outline-none"
                        />
                        <ImageDrop
                          file={edit.file}
                          imageUrl={promo.image_url}
                          onFile={(f) =>
                            setPromoEdits((prev) => ({
                              ...prev,
                              [promo.id]: { ...prev[promo.id], file: f },
                            }))
                          }
                        />
                        <div className="flex gap-3 text-xs">
                          <button
                            onClick={() => savePromo(promo.id)}
                            disabled={promoBusy}
                            className="text-[#9D3CA7] underline cursor-pointer"
                          >
                            Save
                          </button>
                          <button
                            onClick={() =>
                              setPromoEdits((prev) => {
                                const n = { ...prev };
                                delete n[promo.id];
                                return n;
                              })
                            }
                            className="underline cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="text-sm font-medium">{promo.caption}</p>
                        <a
                          href={promo.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-[#9D3CA7] underline break-all"
                        >
                          {promo.link}
                        </a>
                        <div className="flex gap-3 text-xs pt-1">
                          <button
                            onClick={() =>
                              setPromoEdits((prev) => ({
                                ...prev,
                                [promo.id]: {
                                  caption: promo.caption || "",
                                  link: promo.link || "",
                                  description: promo.description || "",
                                  benefits: (promo.benefits || []).join("\n"),
                                  file: null,
                                },
                              }))
                            }
                            className="underline cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => togglePromoActive(promo)}
                            disabled={promoBusy}
                            className="underline cursor-pointer"
                          >
                            {promo.active ? "Hide" : "Show"}
                          </button>
                          <button
                            onClick={() => deletePromo(promo)}
                            disabled={promoBusy}
                            className="text-red-500 underline cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                        {!promo.active && (
                          <span className="text-[10px] text-gray-400">
                            Hidden
                          </span>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
              {promos.length === 0 && (
                <p className="text-sm text-gray-500">No cards yet.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
