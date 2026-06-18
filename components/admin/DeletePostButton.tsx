"use client";

import { useTransition } from "react";
import { deletePostAction } from "@/app/admin/(dashboard)/posts/actions";

export default function DeletePostButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();

  function handleClick() {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    const fd = new FormData();
    fd.set("id", id);
    startTransition(() => deletePostAction(fd));
  }

  return (
    <button
      onClick={handleClick}
      disabled={pending}
      className="text-sm text-red-600 hover:text-red-700 disabled:opacity-50 transition-colors"
    >
      {pending ? "Deleting…" : "Delete"}
    </button>
  );
}
