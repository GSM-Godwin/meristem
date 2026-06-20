"use client";

import { useState } from "react";
import Link from "next/link";
import PostCard from "@/components/shared/PostCard";
import type { PostCardData } from "@/lib/post-cards";

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
        className="flex-1 px-4 py-3 text-sm md:text-base border border-light2 rounded-lg outline-none focus:border-yellow placeholder:text-neutral disabled:opacity-60 text-neutral"
      />
      <button
        type="submit"
        disabled={status === "loading" || status === "ok"}
        className="px-6 py-3 bg-yellow text-light1 text-sm font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60 whitespace-nowrap border-light2 cursor-pointer"
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

function SectionHeader({
  title,
  seeMoreHref,
}: {
  title: string;
  seeMoreHref: string;
}) {
  return (
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-xl md:text-[20px] lg:text-[24px] font-semibold  text-dark1">{title}</h2>
      <Link
        href={seeMoreHref}
        className="text-sm  md:text-[16px] font-medium text-yellow hover:opacity-80 transition-opacity whitespace-nowrap"
      >
        See more
      </Link>
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="rounded-sm border border-dashed border-light2 bg-primarybg/30 px-6 py-16 text-center">
      <p className="text-sm text-neutral">{label}</p>
    </div>
  );
}

interface InsightsContentProps {
  publications: PostCardData[];
  insights: PostCardData[];
  perspectives: PostCardData[];
}

export default function InsightsContent({
  publications,
  insights,
  perspectives,
}: InsightsContentProps) {
  return (
    <div className="bg-white">
      <section className="px-5 md:px-10 lg:px-20 py-24">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-[58px] font-semibold text-dark2 mb-6">
            Insights
          </h1>
          <p className="text-base md:text-lg lg:text-[20px] text-neutral leading-tight max-w-188.5 mx-auto mb-10">
            A curated collection of articles, videos, reports, conversations,
            and thought leadership exploring the realities of wealth,
            continuity, family enterprise, and legacy.
          </p>
          <SubscribeForm />
        </div>
      </section>

      <section className="px-5 md:px-10 lg:px-20 pb-24">
        <div className="mx-auto">
          <SectionHeader title="Publications" seeMoreHref="/publications" />
          {publications.length === 0 ? (
            <EmptyState label="No publications yet — check back soon." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {publications.map((pub) => (
                <PostCard
                  key={pub.id}
                  href={`/publications/${pub.slug}`}
                  variant="publication"
                  coverSrc={pub.coverSrc}
                  comingSoon={pub.comingSoon}
                  title={pub.title}
                  author={pub.author}
                  date={pub.date}
                  excerpt={pub.excerpt}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="px-5 md:px-10 lg:px-20 py-10">
        <div className="mx-auto">
          <SectionHeader
            title="Thought Leadership"
            seeMoreHref="/insights/all"
          />
          {insights.length === 0 ? (
            <EmptyState label="No insights published yet — check back soon." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
              {insights.map((insight) => (
                <PostCard
                  key={insight.id}
                  href={`/insights/${insight.slug}`}
                  variant="insight"
                  coverSrc={insight.coverSrc}
                  title={insight.title}
                  author={insight.author}
                  date={insight.date}
                  excerpt={insight.excerpt}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="px-5 md:px-10 lg:px-20 py-10">
        <div className="mx-auto">
          <SectionHeader title="Perspectives" seeMoreHref="/perspectives" />
          {perspectives.length === 0 ? (
            <EmptyState label="No perspectives yet — check back soon." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
              {perspectives.map((p) => (
                <PostCard
                  key={p.id}
                  href={`/perspectives/${p.slug}`}
                  variant="perspective"
                  coverSrc={p.coverSrc}
                  title={p.title}
                  author={p.author}
                  date={p.date}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
