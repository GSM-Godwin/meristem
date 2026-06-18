"use client";

import { useTransition } from "react";
import { updateInquiryStatusAction } from "@/app/admin/(dashboard)/inquiries/actions";
import type { InquiryStatus } from "@prisma/client";

const STATUS_OPTIONS: { value: InquiryStatus; label: string }[] = [
  { value: "NEW", label: "New" },
  { value: "CONTACTED", label: "Contacted" },
  { value: "RESOLVED", label: "Resolved" },
];

const STATUS_STYLES: Record<InquiryStatus, string> = {
  NEW: "bg-yellow/10 text-yellow border-yellow/30",
  CONTACTED: "bg-blue-50 text-blue-700 border-blue-200",
  RESOLVED: "bg-light2 text-neutral border-light2",
};

interface Props {
  id: string;
  current: InquiryStatus;
}

export default function InquiryStatusSelect({ id, current }: Props) {
  const [pending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value as InquiryStatus;
    startTransition(() => updateInquiryStatusAction(id, next));
  }

  return (
    <select
      value={current}
      onChange={handleChange}
      disabled={pending}
      className={`text-xs font-medium px-2.5 py-1 rounded-full border cursor-pointer disabled:opacity-60 transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${STATUS_STYLES[current]}`}
    >
      {STATUS_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
