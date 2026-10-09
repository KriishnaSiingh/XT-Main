import { Star, Quote, CheckCircle2 } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";

const testimonials = [
  {
    name: "Vivek Patil",
    role: "Sr. Network Engineer",
    company: "HCIN Network Private Limited",
    content:
      "We are abundantly happy with Xorvo team service and support from the last one year. Your support is excellent and more accessible. The Implementation of Fortinet and Aruba networks served us to achieve our work more smoothly.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
  {
    name: "IT Operations Team",
    role: "Technology Department",
    company: "Simpolo Vitrified Pvt Ltd.",
    content:
      "The service and support of the Xorvo Team are awesome and we have been engaged with Xorvo for the last 2 years. Always ready to support us anytime with a suitable Solution. Great experience throughout.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
  {
    name: "Sarah Johnson",
    role: "VP of Engineering",
    company: "NexGen Cloud Systems",
    content:
      "This managed IT and cybersecurity services architecture transformed our deployment workflow. Zero downtime migrations and enterprise-grade security are absolutely top-notch!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
  {
    name: "Alex Rodriguez",
    role: "Head of Infrastructure",
    company: "Apex Global Solutions",
    content:
      "Excellent technical acumen and proactive monitoring. Highly professional team who helped us architect a hybrid cloud infrastructure with 99.99% availability.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
  {
    name: "David Chen",
    role: "Chief Technology Officer",
    company: "Krypton Dynamics",
    content:
      "Xorvo’s rapid threat detection and response capability gave us total confidence during our ISO 27001 audit. Truly exceptional engineering and 24/7 responsiveness.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
  {
    name: "Elena Rostova",
    role: "Director of IT Security",
    company: "Vanguard Tech Partners",
    content:
      "Seamless Microsoft 365 and workspace migration with zero disruption to our 500+ employees. Xorvo’s proactive support has saved us countless hours of internal troubleshooting.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
];

export const ClientReviewsMarquee = () => {
  return (
    <div className="w-full overflow-hidden py-3">
      <Marquee pauseOnHover speed="normal" className="[--gap:1.5rem]">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="w-[330px] sm:w-[380px] md:w-[420px] rounded-2xl p-6 bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3.5">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="h-12 w-12 object-cover rounded-full border-2 border-slate-100 shadow-sm"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face";
                    }}
                  />
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm md:text-base leading-tight">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-slate-500 font-normal mt-0.5">
                      {testimonial.role}
                    </p>
                    <p className="text-xs font-semibold text-blue-600 mt-0.5">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 text-slate-400">
                  <Quote className="h-4 w-4 text-slate-300" />
                </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-4 italic min-h-[72px]">
                "{testimonial.content}"
              </p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <div className="flex space-x-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-emerald-100">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                Verified Client
              </span>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default ClientReviewsMarquee;
