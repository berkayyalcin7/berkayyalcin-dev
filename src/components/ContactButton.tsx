"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { HiEnvelope, HiXMark, HiArrowDownTray } from "react-icons/hi2";
import { FaLinkedin } from "react-icons/fa6";
import { siteConfig } from "@/lib/site-config";

export type ContactModalDict = {
  title: string;
  subtitle: string;
  close: string;
  emailLabel: string;
  linkedinLabel: string;
  viewProfile: string;
  resumeLabel: string;
  downloadCv: string;
};

type ContactButtonProps = {
  className: string;
  children: ReactNode;
  dict: ContactModalDict;
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function ContactButton({
  className,
  children,
  dict,
}: ContactButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Cleanup'ta ref.current değişmiş olabilir; açan buton şimdi yakalanır.
    const trigger = triggerRef.current;
    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    // aria-modal tek başına Tab'ı hapsetmez; odak döngüsü elle kapatılır.
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter((element) => element.offsetParent !== null);
      if (focusable.length === 0) return;

      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      // Modal kapanınca odak, açan butona döner.
      trigger?.focus();
    };
  }, [isOpen]);

  return (
    <>
      <button ref={triggerRef} type="button" onClick={() => setIsOpen(true)} className={className}>
        {children}
      </button>

      {isOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            className="fixed inset-0 z-[100] flex items-center justify-center px-6"
          >
            <button
              type="button"
              aria-label={dict.close}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            <div className="relative w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-zinc-950 transition-colors duration-300">
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label={dict.close}
                className="absolute right-4 top-4 rounded-full p-1 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <HiXMark className="h-5 w-5" />
              </button>

              <h3
                id="contact-modal-title"
                className="text-lg font-semibold text-zinc-900 dark:text-white"
              >
                {dict.title}
              </h3>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {dict.subtitle}
              </p>

              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={siteConfig.social.email}
                  className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 transition hover:border-emerald-400/40 hover:bg-zinc-100/50 dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.06]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                    <HiEnvelope className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      {dict.emailLabel}
                    </span>
                    <span className="block text-sm font-semibold text-zinc-900 dark:text-white">
                      {siteConfig.social.emailAddress}
                    </span>
                  </span>
                </a>

                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 transition hover:border-blue-400/40 hover:bg-zinc-100/50 dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.06]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <FaLinkedin className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      {dict.linkedinLabel}
                    </span>
                    <span className="block text-sm font-semibold text-zinc-900 dark:text-white">
                      {dict.viewProfile}
                    </span>
                  </span>
                </a>

                <a
                  href={siteConfig.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 transition hover:border-emerald-500/40 hover:bg-zinc-100/50 dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.06]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                    <HiArrowDownTray className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      {dict.resumeLabel}
                    </span>
                    <span className="block text-sm font-semibold text-zinc-900 dark:text-white">
                      {dict.downloadCv}
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
