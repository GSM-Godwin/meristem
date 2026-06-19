"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  const inputClassName =
    "w-full px-4 py-3.5 sm:py-3 text-base text-[#181D27] border border-[#DEE3EB] rounded-lg outline-none focus:border-yellow placeholder:text-[#A5ADC0]";

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-[#E9EAEB] rounded-xl p-5 sm:p-8 flex flex-col gap-5 sm:gap-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName" className="text-sm font-medium text-[#535862]">
            First name
          </label>
          <input
            id="firstName"
            type="text"
            required
            value={formData.firstName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, firstName: e.target.value }))
            }
            className={inputClassName}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="lastName" className="text-sm font-medium text-[#535862]">
            Last name
          </label>
          <input
            id="lastName"
            type="text"
            required
            value={formData.lastName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, lastName: e.target.value }))
            }
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
          type="email"
          required
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          className={inputClassName}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="phone" className="text-sm font-medium text-[#535862]">
          Phone number
        </label>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 px-4 py-3 border border-[#DEE3EB] rounded-lg text-base text-[#535862] shrink-0">
            NG
          </div>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, phone: e.target.value }))
            }
            className={inputClassName}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium text-[#535862]">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, message: e.target.value }))
          }
          className={`${inputClassName} resize-none`}
        />
      </div>

      <button
        type="submit"
        className="w-full py-3.5 bg-yellow text-white text-base font-semibold rounded-lg hover:opacity-90 transition-opacity"
      >
        Send message
      </button>
    </form>
  );
}
