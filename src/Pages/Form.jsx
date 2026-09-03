import React, { useState } from "react";
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

  const regions = [
    {
      name: "Abuja - GWAGWALADA (Emmauel Ogechi)",
      link: "https://chat.whatsapp.com/Gz7H9PstDKdLcYxN3yw4Zu",
    },
    {
      name: "Abuja (Kolawole Nathaniel)",
      link: "https://chat.whatsapp.com/IpzdTLTVCqYBR0DgmuPDAM",
    },
    {
      name: "Abuja - Veritas University (Okwuchi Flora)",
      link: "https://chat.whatsapp.com/Gafk8D32GrE0P6gEktE0mV",
    },
    {
      name: "Ado-Ekiti - EKSUTH",
      link: "https://chat.whatsapp.com/KmU8oIPkjWXD7fyxhmjkFZ",
    },
    {
      name: "Bode-Saadu (Kwara)",
      link: "https://chat.whatsapp.com/HrrYYIEaHRS0EFbf2yIWyK",
    },
    {
      name: "Calabar (Paul Promise)",
      link: "https://chat.whatsapp.com/HQVXqHxPRbsDvadFON3C6O",
    },
    {
      name: "Delta",
      link: "https://chat.whatsapp.com/GzJI9GS6pgA1d0nehhwAMU",
    },
    {
      name: "Dutse (Ismail Abdulkadir)",
      link: "https://chat.whatsapp.com/Et24mvLQyDGJRDg4dDFOhY",
    },
    {
      name: "Ekiti",
      link: "https://chat.whatsapp.com/Cglpzmmh6pbBTIryN4Ux6L",
    },
    {
      name: "Ekpoma - AAU",
      link: "https://chat.whatsapp.com/KEeoMIl1XMgDQaBBjdGV4U",
    },
    {
      name: "Enugu (Ibrahim Kehinde)",
      link: "https://chat.whatsapp.com/HrrYYIEaHRS0EFbf2yIWyK",
    },
    {
      name: "Ibadan - Univeristy of Ibadan (Abdullahi Babatunde)",
      link: "https://chat.whatsapp.com/CaKIwXXzKgiAMY7H6F9kbk",
    },
    {
      name: "Ibadan (Oyeniyi Blessing)",
      link: "https://chat.whatsapp.com/Jw7SDFw0bnN7qgC4jzhFBl",
    },
    {
      name: "Jos - UNIJOS (Akanni Sherifdeen and Fancy Ishaku)",
      link: "https://chat.whatsapp.com/Jkaz6VufPa2DtjFxrl509G",
    },
    {
      name: "Lagos (Ashimolowo Agape)",
      link: "https://chat.whatsapp.com/H6GOrIL4hY8DdWgRsrosBT",
    },
    {
      name: "Lagos - UNILAG (John Chidozie)",
      link: "https://chat.whatsapp.com/JbtE8Ct3pVgG3eGnGMCjfx",
    },
    {
      name: "Los Baños - UP (Howard Gabriel)",
      link: "https://chat.whatsapp.com/F64M5z1jE7VKCqRoBcCSv0",
    },
    {
      name: "Nairobi (Vickor Masai)",
      link: "https://chat.whatsapp.com/GzAmbYyem4a4eobOz603a6",
    },
    {
      name: "Ndola (Taonga Kapira)",
      link: "https://chat.whatsapp.com/EwoUnczJdHE0zM6vC2406s",
    },
    {
      name: "Ogbomosho (Afolabi Sofiat)",
      link: "https://chat.whatsapp.com/F25rCb10oRJ0CNBsyDwxOh",
    },
    {
      name: "Ogbomosho (AMR Club LAUTECH)",
      link: "https://chat.whatsapp.com/CkLORp3hpY9GpTZqbF8wKF",
    },
    {
      name: "Ogun - FUNAAB (Faniyi Olakunle)",
      link: "https://chat.whatsapp.com/BI8Zq2sTLoJGLOISIJzPJv",
    },
    {
      name: "Ogun (Lugard Damilola)",
      link: "https://chat.whatsapp.com/J0JOxIMtgamGFwDIFoZ7Nw",
    },
    {
      name: "Osogbo - Fountain University (Nurudeen Noor-Al-Hudah)",
      link: "https://chat.whatsapp.com/G4pvLWMxnXuDxZxOlljFrj",
    },
    {
      name: "Pakistan (Dr. Yasir)",
      link: "https://chat.whatsapp.com/LJJprHXAVXnE53VjgXtK0w",
    },
    {
      name: "Port Harcourt (Dr. Blessing Odogwu)",
      link: "https://chat.whatsapp.com/KE7KDrnhIQlGgPIiK9xG84",
    },
    {
      name: "Sokoto - UDUS (Abdulbaki Alfa-Ibrahim)",
      link: "https://chat.whatsapp.com/GAss9ow8IHg43MooW4aXwA",
    },
    {
      name: "Sokoto (Ahmad AbdulKadir)",
      link: "https://chat.whatsapp.com/G11txorkFUb1e9MQheryKx",
    },
    {
      name: "TASUED (Adeyemi Omotayo)",
      link: "https://chat.whatsapp.com/KfE1IOz4svD4xR4hMxEDEI",
    },
    {
      name: "Taraba (Otoh Ene)",
      link: "https://chat.whatsapp.com/Ic8SSFyxdIsGLkjqxaz1P8",
    },
    {
      name: "Tunisia (Yosra Gabsi)",
      link: "https://chat.whatsapp.com/Ef7AXBo1wxlLQNSthWZ3dh",
    },
  ];

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

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

    const selectedRegion = regions.find((r) => r.name === formData.region);

    if (selectedRegion) {
      window.location.href = selectedRegion.link;
    } else {
      setMessage("Saved, but region link not found.");
    }

    setLoading(false);
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
            {/* <div className="flex flex-col gap-2">
              <label className="font-medium">Region</label>
              <select
                name="region"
                className="border border-[#DFDFDFDF] p-2.5 rounded-lg focus:outline-none"
                value={formData.region}
                onChange={handleChange}
                required
              >
                <option value="">Choose your region</option>
                {regions.map((region, index) => (
                  <option key={index} value={region.name}>
                    {region.name}
                  </option>
                ))}
              </select>
            </div> */}
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
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
