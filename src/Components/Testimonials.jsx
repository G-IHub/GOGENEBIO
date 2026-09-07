import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

const QuoteIcon = () => (
  <svg width="30" height="22" viewBox="0 0 30 22" fill="none">
    <path
      d="M0 22V13.5C0 6 4.5 1 12 0L13 3.5C8 5 6 8 6 12H12V22H0ZM17 22V13.5C17 6 21.5 1 29 0L30 3.5C25 5 23 8 23 12H29V22H17Z"
      fill="#b241b7"
      opacity="0.5"
    />
  </svg>
);

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from("public_testimonials")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(6);

      if (!error && data) setTestimonials(data);
      setLoading(false);
    };
    load();
  }, []);

  if (!loading && testimonials.length === 0) return null;

  return (
    <div id="testimonials" className="px-5 md:px-10 lg:px-16 py-16 md:py-20 scroll-mt-20">
      <div className="flex flex-col items-center text-center max-w-xl mx-auto mb-10 md:mb-14">
        <div className="bg-[#b241b71a] rounded-full px-4 py-1.5">
          <span className="font-data text-[11px] font-semibold tracking-widest uppercase text-[#3d168b]">
            From Our Community
          </span>
        </div>
        <h2 className="font-display font-bold text-xl md:text-3xl mt-4">
          What Past Participants Say
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white border border-[#e6e1ef] rounded-2xl p-7 flex flex-col gap-5 hover:shadow-lg hover:-translate-y-1 transition duration-300"
          >
            <QuoteIcon />
            <p className="font-landing text-[13px] text-[#3f3a52] leading-relaxed flex-1">
              {t.testimonial}
            </p>
            <div className="flex items-center gap-3 pt-1.5 border-t border-[#e6e1ef]">
              <div className="w-9 h-9 rounded-full bg-linear-to-br from-[#b241b7] to-[#3d168b] flex items-center justify-center text-white font-display font-semibold text-sm">
                {(t.name || "?").charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-landing text-[13.5px] font-semibold text-[#0f0f0f]">
                  {t.name || "Anonymous"}
                </span>
                {t.country && (
                  <span className="font-landing text-xs text-[#8a8598]">{t.country}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
