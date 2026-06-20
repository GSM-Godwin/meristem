"use client";

import { useState, useRef } from "react";

interface FileUploadProps {
  value: string;
  onChange: (url: string) => void;
  kind: "pdf" | "video";
}

const KIND_META = {
  pdf: {
    accept: "application/pdf",
    cta: "Click to upload a PDF",
    uploadLabel: "PDF",
  },
  video: {
    accept: "video/*",
    cta: "Click to upload a video",
    uploadLabel: "video",
  },
} as const;

export default function FileUpload({ value, onChange, kind }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const meta = KIND_META[kind];

  async function handleFile(file: File) {
    setError(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.set("file", file);
      fd.set("kind", kind);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div className="space-y-2">
      {value ? (
        <div>
          {kind === "video" ? (
            <video
              src={value}
              controls
              className="h-44 w-full rounded-lg border border-light2 bg-black object-contain max-w-sm"
            />
          ) : (
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg border border-light2 bg-light1 px-4 py-3 w-full max-w-sm hover:border-primary transition-colors"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow shrink-0">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <span className="text-sm text-dark1 truncate">View uploaded PDF</span>
            </a>
          )}
          <div className="mt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="text-xs text-primary hover:text-yellow transition-colors"
              disabled={uploading}
            >
              {uploading ? "Uploading…" : "Replace"}
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-xs text-red-600 hover:text-red-700 transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-light2 bg-light1 text-neutral hover:border-primary hover:text-primary transition-colors disabled:opacity-60 h-44 w-full max-w-sm min-h-22"
        >
          {uploading ? (
            <span className="text-sm">Uploading {meta.uploadLabel}…</span>
          ) : (
            <>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <span className="text-sm">{meta.cta}</span>
            </>
          )}
        </button>
      )}

      {error && <p className="text-xs text-red-600">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept={meta.accept}
        onChange={onInputChange}
        className="hidden"
      />
    </div>
  );
}
