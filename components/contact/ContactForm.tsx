"use client";

import { useActionState, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { createInquiryAction, type ContactState } from "@/app/contact/actions";

export default function ContactForm() {
  const [state, formAction, pending] = useActionState<ContactState, FormData>(
    createInquiryAction,
    null
  );
  const [phone, setPhone] = useState<string | undefined>();

  const inputClassName =
    "w-full px-4 py-3.5 sm:py-3 text-base text-[#181D27] border border-[#DEE3EB] rounded-lg outline-none focus:border-yellow placeholder:text-[#A5ADC0]";

  if (state && "ok" in state) {
    return (
      <div className="border border-[#E9EAEB] rounded-xl p-8 flex flex-col items-center justify-center text-center gap-4 min-h-100">
        <div className="w-14 h-14 rounded-full bg-yellow/10 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E2A93B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-[#181D27]">Message sent</h3>
        <p className="text-base text-[#535862] max-w-sm">
          Thank you for reaching out. A member of our team will be in touch with
          you shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="border border-[#E9EAEB] rounded-xl p-5 sm:p-8 flex flex-col gap-5 sm:gap-6"
    >
      {state && "error" in state && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName" className="text-sm font-medium text-[#535862]">
            First name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            className={inputClassName}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="lastName" className="text-sm font-medium text-[#535862]">
            Last name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            className={inputClassName}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-[#535862]">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={inputClassName}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="phone" className="text-sm font-medium text-[#535862]">
          Phone number
        </label>
        <PhoneInput
          id="phone"
          className="text-neutral"
          defaultCountry="NG"
          value={phone}
          onChange={setPhone}
          numberInputProps={{ className: inputClassName }}
        />
        <input type="hidden" name="phone" value={phone ?? ""} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium text-[#535862]">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`${inputClassName} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full py-3.5 bg-yellow text-white text-base font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
