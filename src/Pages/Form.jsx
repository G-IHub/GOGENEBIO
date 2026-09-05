import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { Link } from "react-router-dom";

const Form = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: "",
    region: "",
    heard_before: "",
    experience: "",
  });

  const [regions, setRegions] = useState([]);
  const [regionsLoading, setRegionsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchRegions = async () => {
      const { data, error } = await supabase
        .from("regions")
        .select("name, wa_link")
        .eq("active", true)
        .order("name");

      if (!error && data) {
        // Only offer regions that actually have a redirect link set.
        setRegions(data.filter((r) => r.wa_link && r.wa_link.trim()));
      }
      setRegionsLoading(false);
    };

    fetchRegions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const selectedRegion = regions.find((r) => r.name === formData.region);
    if (!selectedRegion) {
      setMessage("Please choose a valid region.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("registrations").insert([formData]);

    if (error) {
      if (error.code === "23505") {
        setMessage(
          "You've already registered using this email or phone number."
        );
      } else {
        setMessage("Something went wrong: " + error.message);
      }
      setLoading(false);
      return;
    }

    window.location.href = selectedRegion.wa_link;
  };

  return (
    <div className="py-10 px-5 md:px-24">
      <h2 className="font-semibold text-2xl md:text-4xl text-center mb-10">
        Application Form
      </h2>

      {message && (
        <p className="mb-5 text-center text-red-500 text-xl font-bold">
          {message}
        </p>
      )}

      <form className="flex flex-col gap-10 md:gap-15" onSubmit={handleSubmit}>
        <div className="grid gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm md:text-lg">
            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <label className="font-medium">Full Name</label>
              <input
                className="border border-[#DFDFDFDF] p-2 rounded-lg placeholder:text-xs md:placeholder:text-sm focus:outline-none"
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
                placeholder="Type your full name"
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-2">
              <label className="font-medium">Phone Number</label>
              <input
                className="border border-[#DFDFDFDF] p-2 rounded-lg placeholder:text-xs md:placeholder:text-sm focus:outline-none"
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Preferably WhatsApp number"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="font-medium">Email</label>
              <input
                className="border border-[#DFDFDFDF] p-2 rounded-lg placeholder:text-xs md:placeholder:text-sm focus:outline-none"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Type your mail"
              />
            </div>

            {/* Region */}
            <div className="flex flex-col gap-2">
              <label className="font-medium">Which region are you registering from?</label>
              <select
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="border border-[#DFDFDFDF] p-2 rounded-lg"
                required
                disabled={regionsLoading}
              >
                <option value="">
                  {regionsLoading ? "Loading regions..." : "Choose your region"}
                </option>
                {regions.map((r) => (
                  <option key={r.name} value={r.name}>
                    {r.name}
                  </option>
                ))}
              </select>
              {!regionsLoading && regions.length === 0 && (
                <span className="text-xs text-red-500">
                  No regions are available right now. Please try again later.
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 text-sm md:text-lg">
            {/* Heard Before */}
            <div className="flex flex-col gap-2">
              <label className="font-medium">
                How did you find out about GoGeneBio?
              </label>
              <select
                name="heard_before"
                value={formData.heard_before}
                onChange={handleChange}
                className="border border-[#DFDFDFDF] p-2 rounded-lg"
                required
              >
                <option value="">Choose</option>
                <option value="linkedin">LinkedIn</option>
                <option value="whatsapp">WhatsApp/WhatsApp Group</option>
                <option value="email">Email</option>
                <option value="friend">Recommended by someone</option>
                <option value="event">
                  Other socials(Instagram,X,Facebook,etc)
                </option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Experience */}
            <div className="flex flex-col gap-2">
              <label className="font-medium">What best describes you?</label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="border border-[#DFDFDFDF] p-2 rounded-lg"
                required
              >
                <option value="">Choose</option>
                <option value="Undergraduate/Fresh Graduate">
                  Undergraduate/Fresh Graduate
                </option>
                <option value="MSc/PhD student">MSc/PhD student</option>
                <option value="Lecturer">Lecturer</option>
                <option value="Industry Professional">Professional in the Industry</option>
                <option value="Researcher">Freelance Researcher</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Link to="/">
            <button className="border border-[#9D3CA7] rounded-full p-2 px-2.5 md:p-2.5 md:px-4 text-[14px] md:text-[16px] cursor-pointer">
              Back to Home
            </button>
          </Link>
          <button
            className="bg-gradient-to-r from-[#511E8C] to-[#9D3CA7] rounded-full p-2 px-2.5 md:p-2.5 md:px-4 text-[14px] md:text-[16px] text-white cursor-pointer"
            type="submit"
            disabled={loading || regionsLoading || regions.length === 0}
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
