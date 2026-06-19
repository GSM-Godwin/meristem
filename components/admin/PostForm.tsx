"use client";

import { useState } from "react";
import Link from "next/link";
import ImageUpload from "./ImageUpload";
import { savePostAction } from "@/app/admin/(dashboard)/posts/actions";
import type { PostFormValues } from "@/lib/types/post-form";
import type { PostCategory } from "@prisma/client";

interface PostFormProps {
  initialValues: PostFormValues;
  /** When true the category field is locked (add-new flow from a section page) */
  lockCategory: boolean;
  mode: "create" | "edit";
}

const CATEGORY_LABEL: Record<PostCategory, string> = {
  INSIGHT: "Insight",
  PERSPECTIVE: "Perspective",
  PUBLICATION: "Publication",
};

const inputClass =
  "w-full rounded-lg border border-light2 bg-white px-4 py-2.5 text-sm text-dark1 placeholder:text-light3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition";
const labelClass = "block text-sm font-medium text-dark1 mb-1.5";

export default function PostForm({ initialValues, lockCategory, mode }: PostFormProps) {
  const [values, setValues] = useState<PostFormValues>(initialValues);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function update<K extends keyof PostFormValues>(key: K, value: PostFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function newKey() {
    return crypto.randomUUID();
  }

  // ── Section handlers ──────────────────────────────────────────────────────
  function addContentSection() {
    setValues((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          key: newKey(),
          type: "CONTENT",
          heading: "",
          quoteText: "",
          attribution: "",
          blocks: [],
        },
      ],
    }));
  }

  function removeSection(sectionKey: string) {
    setValues((prev) => ({
      ...prev,
      sections: prev.sections.filter((s) => s.key !== sectionKey),
    }));
  }

  function addQuoteSection() {
    setValues((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          key: newKey(),
          type: "QUOTE",
          heading: "",
          quoteText: "",
          attribution: "",
          blocks: [],
        },
      ],
    }));
  }

  function updateQuoteField(
    sectionKey: string,
    field: "quoteText" | "attribution",
    value: string
  ) {
    setValues((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.key === sectionKey && s.type === "QUOTE" ? { ...s, [field]: value } : s
      ),
    }));
  }

  function updateSectionHeading(sectionKey: string, heading: string) {
    setValues((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.key === sectionKey && s.type === "CONTENT" ? { ...s, heading } : s
      ),
    }));
  }

  // ── Block handlers (within a CONTENT section) ─────────────────────────────
  function addBlock(sectionKey: string, type: "PARAGRAPH" | "IMAGE") {
    setValues((prev) => ({
      ...prev,
      sections: prev.sections.map((s) => {
        if (s.key !== sectionKey || s.type !== "CONTENT") return s;
        const block =
          type === "PARAGRAPH"
            ? ({ key: newKey(), type: "PARAGRAPH", text: "", imageUrl: "" } as const)
            : ({ key: newKey(), type: "IMAGE", text: "", imageUrl: "" } as const);
        return { ...s, blocks: [...s.blocks, block] };
      }),
    }));
  }

  function removeBlock(sectionKey: string, blockKey: string) {
    setValues((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.key === sectionKey && s.type === "CONTENT"
          ? { ...s, blocks: s.blocks.filter((b) => b.key !== blockKey) }
          : s
      ),
    }));
  }

  function updateBlockText(sectionKey: string, blockKey: string, text: string) {
    setValues((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.key === sectionKey && s.type === "CONTENT"
          ? {
              ...s,
              blocks: s.blocks.map((b) =>
                b.key === blockKey && b.type === "PARAGRAPH" ? { ...b, text } : b
              ),
            }
          : s
      ),
    }));
  }

  function updateBlockImage(sectionKey: string, blockKey: string, imageUrl: string) {
    setValues((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.key === sectionKey && s.type === "CONTENT"
          ? {
              ...s,
              blocks: s.blocks.map((b) =>
                b.key === blockKey && b.type === "IMAGE" ? { ...b, imageUrl } : b
              ),
            }
          : s
      ),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // Basic required-field validation (server re-validates authoritatively)
    if (!values.title.trim()) return setError("Title is required.");
    if (!values.shortDescription.trim()) return setError("Short description is required.");
    if (!values.featuredImage) return setError("A featured image is required.");
    if (!values.writtenBy.trim()) return setError("Written by is required.");
    if (!values.longDescription.trim()) return setError("Long description is required.");

    setSaving(true);
    // On success the server action redirects, so this promise won't resolve
    // with a value; only a returned { error } means the save failed.
    const result = await savePostAction(values);
    if (result?.error) {
      setError(result.error);
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6 pb-16">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl border border-light2 p-6 space-y-5">
        {/* Title */}
        <div>
          <label htmlFor="title" className={labelClass}>
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            className={inputClass}
            value={values.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="e.g. Simple vs Comprehensive Will"
          />
        </div>

        {/* Short description */}
        <div>
          <label htmlFor="shortDescription" className={labelClass}>
            Short description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="shortDescription"
            rows={2}
            className={inputClass}
            value={values.shortDescription}
            onChange={(e) => update("shortDescription", e.target.value)}
            placeholder="Shown under the title and on listing cards."
          />
        </div>

        {/* Featured image */}
        <div>
          <label className={labelClass}>
            Featured image <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-neutral mb-2">
            Doubles as the hero image and the listing-card thumbnail.
          </p>
          <ImageUpload
            value={values.featuredImage}
            onChange={(url) => update("featuredImage", url)}
          />
        </div>

        {/* Written by */}
        <div>
          <label htmlFor="writtenBy" className={labelClass}>
            Written by <span className="text-red-500">*</span>
          </label>
          <input
            id="writtenBy"
            type="text"
            className={inputClass}
            value={values.writtenBy}
            onChange={(e) => update("writtenBy", e.target.value)}
            placeholder="Any name"
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className={labelClass}>
            Category
          </label>
          {lockCategory ? (
            <div className="flex items-center gap-2">
              <input
                id="category"
                type="text"
                readOnly
                disabled
                value={CATEGORY_LABEL[values.category]}
                className={`${inputClass} max-w-xs bg-light1 text-neutral cursor-not-allowed`}
              />
              <span className="text-xs text-light3">Locked for this section</span>
            </div>
          ) : (
            <select
              id="category"
              className={`${inputClass} max-w-xs`}
              value={values.category}
              onChange={(e) => update("category", e.target.value as PostCategory)}
            >
              <option value="INSIGHT">Insight</option>
              <option value="PERSPECTIVE">Perspective</option>
              <option value="PUBLICATION">Publication</option>
            </select>
          )}
        </div>

        {/* Status + Publish date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="status" className={labelClass}>
              Status
            </label>
            <select
              id="status"
              className={inputClass}
              value={values.status}
              onChange={(e) => update("status", e.target.value as PostFormValues["status"])}
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
            </select>
          </div>
          <div>
            <label htmlFor="publishDate" className={labelClass}>
              Publish date
            </label>
            <input
              id="publishDate"
              type="date"
              className={inputClass}
              value={values.publishDate}
              onChange={(e) => update("publishDate", e.target.value)}
            />
          </div>
        </div>

        {/* Featured checkbox */}
        <div className="flex items-start gap-3 pt-1">
          <input
            id="featured"
            type="checkbox"
            checked={values.featured}
            onChange={(e) => update("featured", e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-light2 text-yellow focus:ring-primary accent-yellow"
          />
          <label htmlFor="featured" className="text-sm text-dark1">
            Featured on homepage
            <span className="block text-xs text-neutral mt-0.5">
              Controls whether it can appear in home/about page carousels.
            </span>
          </label>
        </div>

        {/* Long description */}
        <div>
          <label htmlFor="longDescription" className={labelClass}>
            Long description <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-neutral mb-2">
            The intro paragraph that sits above the sections, after the byline.
          </p>
          <textarea
            id="longDescription"
            rows={4}
            className={inputClass}
            value={values.longDescription}
            onChange={(e) => update("longDescription", e.target.value)}
          />
        </div>
      </div>

      {/* ── Page sections ──────────────────────────────────────────────── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-dark1">
              Page sections
            </h2>
            <p className="text-xs text-neutral mt-0.5">
              Sections stack top to bottom in the order shown here.
            </p>
          </div>
        </div>

        {values.sections.length === 0 && (
          <div className="bg-white rounded-xl border border-dashed border-light2 px-6 py-10 text-center">
            <p className="text-sm text-neutral">
              No sections yet. Add a content section to start building the post body.
            </p>
          </div>
        )}

        {values.sections.map((section, index) => {
          if (section.type === "QUOTE") {
            return (
              <div
                key={section.key}
                className="rounded-xl border-l-4 border-yellow border-y border-r border-y-light2 border-r-light2 bg-primarybg p-5 space-y-4"
              >
                {/* Quote section header */}
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-yellow">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.17 6A5.001 5.001 0 0 0 4 10.7V18h7v-7H7.5c0-1.93 1.57-3.5 3.5-3.5V6H7.17zM17.17 6A5.001 5.001 0 0 0 14 10.7V18h7v-7h-3.5c0-1.93 1.57-3.5 3.5-3.5V6h-3.83z" />
                    </svg>
                    Section {index + 1} · Quote
                  </span>
                  <button
                    type="button"
                    onClick={() => removeSection(section.key)}
                    className="text-xs text-red-600 hover:text-red-700 transition-colors"
                  >
                    Remove section
                  </button>
                </div>

                {/* Quote text */}
                <div>
                  <label className={labelClass}>
                    Quote text <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    className={inputClass}
                    value={section.quoteText}
                    onChange={(e) =>
                      updateQuoteField(section.key, "quoteText", e.target.value)
                    }
                    placeholder="“A memorable line worth pulling out of the body…”"
                  />
                </div>

                {/* Attribution */}
                <div>
                  <label className={labelClass}>
                    Attribution <span className="text-light3">(optional)</span>
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    value={section.attribution}
                    onChange={(e) =>
                      updateQuoteField(section.key, "attribution", e.target.value)
                    }
                    placeholder="e.g. Olivia Rhye, Product Designer"
                  />
                </div>
              </div>
            );
          }

          return (
            <div
              key={section.key}
              className="bg-white rounded-xl border border-light2 p-5 space-y-4"
            >
              {/* Section header */}
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-medium uppercase tracking-wide text-light3">
                  Section {index + 1} · Content
                </span>
                <button
                  type="button"
                  onClick={() => removeSection(section.key)}
                  className="text-xs text-red-600 hover:text-red-700 transition-colors"
                >
                  Remove section
                </button>
              </div>

              {/* Heading */}
              <div>
                <label className={labelClass}>
                  Heading <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className={inputClass}
                  value={section.heading}
                  onChange={(e) => updateSectionHeading(section.key, e.target.value)}
                  placeholder="e.g. Introduction"
                />
              </div>

              {/* Blocks */}
              {section.blocks.length > 0 && (
                <div className="space-y-3">
                  {section.blocks.map((block) => (
                    <div
                      key={block.key}
                      className="rounded-lg border border-light2 bg-light1 p-3"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-neutral">
                          {block.type === "PARAGRAPH" ? "Paragraph" : "Image"}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeBlock(section.key, block.key)}
                          className="text-xs text-red-600 hover:text-red-700 transition-colors"
                        >
                          Delete
                        </button>
                      </div>

                      {block.type === "PARAGRAPH" ? (
                        <textarea
                          rows={3}
                          className={inputClass}
                          value={block.text}
                          onChange={(e) =>
                            updateBlockText(section.key, block.key, e.target.value)
                          }
                          placeholder="Write a paragraph…"
                        />
                      ) : (
                        <ImageUpload
                          compact
                          value={block.imageUrl}
                          onChange={(url) => updateBlockImage(section.key, block.key, url)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Add block buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => addBlock(section.key, "PARAGRAPH")}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-primary border border-light2 rounded-lg px-3 py-1.5 hover:border-primary hover:bg-light1 transition-colors"
                >
                  + Add paragraph
                </button>
                <button
                  type="button"
                  onClick={() => addBlock(section.key, "IMAGE")}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-primary border border-light2 rounded-lg px-3 py-1.5 hover:border-primary hover:bg-light1 transition-colors"
                >
                  + Add image
                </button>
              </div>
            </div>
          );
        })}

        {/* Add section / quote buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={addContentSection}
            className="inline-flex items-center gap-2 text-sm font-medium text-dark1 border border-light2 bg-white rounded-lg px-4 py-2.5 hover:border-primary transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add section
          </button>
          <button
            type="button"
            onClick={addQuoteSection}
            className="inline-flex items-center gap-2 text-sm font-medium text-yellow border border-yellow/40 bg-primarybg rounded-lg px-4 py-2.5 hover:border-yellow transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.17 6A5.001 5.001 0 0 0 4 10.7V18h7v-7H7.5c0-1.93 1.57-3.5 3.5-3.5V6H7.17zM17.17 6A5.001 5.001 0 0 0 14 10.7V18h7v-7h-3.5c0-1.93 1.57-3.5 3.5-3.5V6h-3.83z" />
            </svg>
            Add quote
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3">
        <Link
          href={`/admin/${
            values.category === "INSIGHT"
              ? "insights"
              : values.category === "PERSPECTIVE"
              ? "perspectives"
              : "publications"
          }`}
          className="text-sm font-medium text-neutral hover:text-dark1 px-4 py-2.5 transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={saving}
          className="bg-yellow text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {saving ? "Saving…" : mode === "create" ? "Create post" : "Save changes"}
        </button>
      </div>
    </form>
  );
}
