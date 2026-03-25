import { useState } from "react";
import { Copyright, Mail, MessageCircleMore, Phone } from "lucide-react";

const contactItems = [
  {
    title: "Phone",
    href: "tel:9114336976",
    value: "9114336976",
    icon: Phone,
    cardClassName: "border border-emerald-500/20 bg-emerald-500/10 hover:bg-emerald-900",
    iconClassName: "bg-emerald-500/20 text-emerald-300",
    labelClassName: "text-emerald-300",
    linkClassName: "hover:text-emerald-200",
  },
  {
    title: "Email",
    href: "mailto:sahoosomanatha2@gmail.com",
    value: "sahoosomanatha2@gmail.com",
    icon: Mail,
    cardClassName: "border border-red-500/20 bg-red-500/10 hover:bg-pink-950",
    iconClassName: "bg-red-500/20 text-red-300",
    labelClassName: "text-red-300",
    linkClassName: "hover:text-red-200",
  },
  {
    title: "WhatsApp",
    href: "https://wa.me/919114336976",
    value: "9114336976",
    icon: MessageCircleMore,
    cardClassName: "border border-green-500/20 bg-green-500/10 hover:bg-emerald-900",
    iconClassName: "bg-green-500/20 text-green-300",
    labelClassName: "text-green-300",
    linkClassName: "hover:text-green-200",
  },
];

function ContactPage() {
  const [cardTransforms, setCardTransforms] = useState({});

  const handleCardMove = (key) => (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 12;
    const rotateX = ((centerY - y) / centerY) * 10;

    setCardTransforms((current) => ({
      ...current,
      [key]: `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`,
    }));
  };

  const resetCardTransform = (key) => () => {
    setCardTransforms((current) => ({
      ...current,
      [key]: "perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    }));
  };

  return (
    <section className="mx-auto max-w-5xl">
      <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#101010] shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
        <div className="border-b border-white/10 bg-[linear-gradient(135deg,_rgba(185,28,28,0.28),_rgba(10,10,10,0.95))] px-6 py-8 sm:px-10 sm:py-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-red-300">Contact Us</p>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Get in touch with SagaMovies</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-300">
            For support, enquiries, or updates, use the contact details below.
          </p>
        </div>

        <div className="grid gap-4 px-6 py-6 sm:px-10 sm:py-8 lg:grid-cols-3">
          {contactItems.map(({ title, href, value, icon: Icon, cardClassName, iconClassName, labelClassName, linkClassName }) => (
            <div
              key={title}
              className={`rounded-2xl p-5 transition-transform duration-200 ease-out will-change-transform ${cardClassName}`}
              style={{
                transform: cardTransforms[title] ?? "perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
                transformStyle: "preserve-3d",
                boxShadow: "0 18px 40px rgba(0, 0, 0, 0.25)",
              }}
              onMouseMove={handleCardMove(title)}
              onMouseLeave={resetCardTransform(title)}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full ${iconClassName}`}
                style={{ transform: "translateZ(34px)" }}
              >
                <Icon className="h-5 w-5" />
              </div>
              <p
                className={`mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] ${labelClassName}`}
                style={{ transform: "translateZ(24px)" }}
              >
                {title}
              </p>
              <a
                href={href}
                className={`mt-2 block text-lg font-semibold text-white ${title === "Email" ? "break-all" : ""} ${linkClassName}`}
                style={{ transform: "translateZ(42px)" }}
              >
                {value}
              </a>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 px-6 py-5 sm:px-10 sm:py-6">
          <div className="flex flex-col gap-3  text-sm text-stone-400 sm:flex-row sm:items-center sm:justify-between">
            <div className="inline-flex items-center gap-2 ">
              <Copyright className="h-4 w-4 text-red-400 " />
              <span>Copyright SagaMovies. All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
