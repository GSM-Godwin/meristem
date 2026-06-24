"use client";

import { useState, useTransition } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { recordPublicationDownload } from "@/app/publications/actions";
import { isValidEmail, isValidPhone } from "@/lib/contact-validation";
import { pdfDownloadFilename } from "@/lib/media";

interface PublicationDownloadGateProps {
  publicationId: string;
  title: string;
  downloadUrl: string;
}

export default function PublicationDownloadGate({
  publicationId,
  title,
  downloadUrl,
}: PublicationDownloadGateProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState<string | undefined>();
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [pending, startTransition] = useTransition();

  const inputClassName =
    "w-full px-4 py-3.5 sm:py-3 text-base text-[#181D27] border border-[#DEE3EB] rounded-lg outline-none focus:border-yellow placeholder:text-[#A5ADC0]";

  function resetErrors() {
    setEmailError("");
    setPhoneError("");
    setSubmitError("");
  }

  function closeModal() {
    setOpen(false);
    resetErrors();
  }

  function triggerDownload() {
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = pdfDownloadFilename(title);
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function validate(): boolean {
    resetErrors();
    let valid = true;

    if (!email.trim() || !isValidEmail(email.trim())) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }

    if (!phone || !isValidPhone(phone)) {
      setPhoneError("Please enter a valid phone number.");
      valid = false;
    }

    return valid;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    startTransition(async () => {
      const result = await recordPublicationDownload(
        publicationId,
        email.trim(),
        phone ?? ""
      );

      if ("error" in result) {
        setSubmitError(result.error);
        return;
      }

      closeModal();
      triggerDownload();
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-base font-semibold bg-yellow text-white hover:opacity-90 transition-opacity"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 3v12m0 0 4-4m-4 4-4-4M5 17v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Download
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          role="presentation"
          onClick={closeModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="download-gate-title"
            className="relative w-full max-w-md bg-white rounded-xl shadow-xl p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close"
              className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral hover:text-dark1 hover:bg-light1 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <h2
              id="download-gate-title"
              className="text-xl font-semibold text-[#181D27] pr-8 mb-3"
            >
              Just one quick step
            </h2>

            <p className="text-sm text-[#535862] leading-relaxed mb-6">
              Put in your email and phone number below and your download will
              start right away. 
            </p>
            
            <p className="text-xs italic text-[#535862] leading-relaxed mb-6">
              We'll only use your details to send this resource and relevant updates. Your information will never be shared.
            </p>


            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                  {submitError}
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label htmlFor="gate-email" className="text-sm font-medium text-[#535862]">
                  Email
                </label>
                <input
                  id="gate-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className={`${inputClassName}${emailError ? " border-red-400" : ""}`}
                />
                {emailError && (
                  <p className="text-xs text-red-600">{emailError}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="gate-phone" className="text-sm font-medium text-[#535862]">
                  Phone number
                </label>
                <PhoneInput
                  id="gate-phone"
                  className="text-neutral"
                  defaultCountry="NG"
                  value={phone}
                  onChange={setPhone}
                  numberInputProps={{ className: inputClassName }}
                />
                {phoneError && (
                  <p className="text-xs text-red-600">{phoneError}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={pending}
                className="w-full py-3.5 bg-yellow text-white text-base font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {pending ? "Starting download…" : "Download Now"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
