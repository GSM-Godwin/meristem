"use client";

import { useState } from "react";
import Link from "next/link";
import PostCard from "@/components/shared/PostCard";
import { insights } from "@/lib/data/insights";
import { perspectives } from "@/lib/data/perspectives";
import { publications } from "@/lib/data/publications";

// ─── Subscribe form ──────────────────────────────────────────────────────────

function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus("ok");
        setMessage("You're subscribed!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-lg mx-auto flex-col sm:flex-row gap-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        disabled={status === "loading" || status === "ok"}
        className="flex-1 px-4 py-3 text-sm border border-light2 rounded-lg outline-none focus:border-yellow placeholder:text-light3 disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={status === "loading" || status === "ok"}
        className="px-6 py-3 bg-yellow text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60 whitespace-nowrap"
      >
        {status === "loading" ? "Subscribing…" : "Subscribe"}
      </button>
      {(status === "ok" || status === "error") && (
        <p
          className={`text-sm mt-1 sm:col-span-2 ${
            status === "ok" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}

// ─── Section header row ───────────────────────────────────────────────────────

function SectionHeader({
  title,
  seeMoreHref,
}: {
  title: string;
  seeMoreHref: string;
}) {
  return (
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-xl font-semibold text-dark1">{title}</h2>
      <Link
        href={seeMoreHref}
        className="text-sm font-medium text-yellow hover:opacity-80 transition-opacity whitespace-nowrap"
      >
        See more
      </Link>
    </div>
  );
}

// ─── Slices of placeholder data ───────────────────────────────────────────────

const hubPublications = publications.slice(0, 3);
const hubInsights = insights.slice(0, 6);
const hubPerspectives = perspectives.slice(0, 6);

// ─── Main component ───────────────────────────────────────────────────────────

export default function InsightsContent() {
  return (
    <div className="bg-white">
      {/* ── Hero / header ─────────────────────────────────────────────── */}
      <section className="px-5 md:px-10 lg:px-20 pt-14 pb-12">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-semibold text-dark1 mb-5">
            Insights
          </h1>
          <p className="text-base md:text-lg text-neutral leading-relaxed max-w-2xl mb-10">
            A curated collection of articles, videos, reports, conversations,
            and thought leadership exploring the realities of wealth,
            continuity, family enterprise, and legacy.
          </p>
          <SubscribeForm />
        </div>
      </section>

      {/* ── Publications section ───────────────────────────────────────── */}
      <section className="px-5 md:px-10 lg:px-20 py-10 border-t border-light2">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="Publications" seeMoreHref="/publications" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {hubPublications.map((pub) => (
              <PostCard
                key={pub.id}
                href={`/publications/${pub.slug}`}
                variant="publication"
                coverColor={pub.coverColor}
                title={pub.title}
                author={pub.author}
                date={pub.date}
                excerpt={pub.excerpt}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Thought Leadership section ─────────────────────────────────── */}
      <section className="px-5 md:px-10 lg:px-20 py-10 border-t border-light2">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Thought Leadership"
            seeMoreHref="/insights/all"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
            {hubInsights.map((insight) => (
              <PostCard
                key={insight.id}
                href={`/insights/${insight.slug}`}
                variant="insight"
                title={insight.title}
                author={insight.author}
                date={insight.date}
                excerpt={insight.excerpt}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Perspectives section ───────────────────────────────────────── */}
      <section className="px-5 md:px-10 lg:px-20 py-10 border-t border-light2">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="Perspectives" seeMoreHref="/perspectives" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
            {hubPerspectives.map((p) => (
              <PostCard
                key={p.id}
                href={`/perspectives/${p.slug}`}
                variant="perspective"
                title={p.title}
                author={p.author}
                date={p.date}
                duration={p.duration}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
