"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { HiEnvelope, HiXMark } from "react-icons/hi2";
import { FaLinkedin } from "react-icons/fa6";
import { siteConfig } from "@/lib/site-config";

type ContactButtonProps = {
  className: string;
  children: ReactNode;
};

export default function ContactButton({
  className,
  children,
}: ContactButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)} className={className}>
        {children}
      </button>

      {isOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            className="fixed inset-0 z-[100] flex items-center justify-center px-6"
          >
            <button
              type="button"
              aria-label="Kapat"
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            <div className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-zinc-950 p-6 shadow-2xl">
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Kapat"
                className="absolute right-4 top-4 rounded-full p-1 text-zinc-400 transition hover:bg-white/10 hover:text-white"
              >
                <HiXMark className="h-5 w-5" />
              </button>

              <h3
                id="contact-modal-title"
                className="text-lg font-semibold text-white"
              >
                İletişime Geç
              </h3>
              <p className="mt-1 text-sm text-zinc-400">
                Aşağıdaki kanallardan bana ulaşabilirsin.
              </p>

              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={siteConfig.social.email}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-emerald-400/40 hover:bg-white/[0.06]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                    <HiEnvelope className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-medium uppercase tracking-wider text-zinc-400">
                      E-posta
                    </span>
                    <span className="block text-sm font-semibold text-white">
                      {siteConfig.social.emailAddress}
                    </span>
                  </span>
                </a>

                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-blue-400/40 hover:bg-white/[0.06]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                    <FaLinkedin className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-medium uppercase tracking-wider text-zinc-400">
                      LinkedIn
                    </span>
                    <span className="block text-sm font-semibold text-white">
                      Profilimi Görüntüle
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
