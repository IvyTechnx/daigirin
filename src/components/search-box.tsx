"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchBox({ onClose }: { onClose?: () => void }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      onClose?.();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
      <Input
        type="search"
        placeholder="記事を検索..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border-white/20 bg-white/10 pl-10 text-white placeholder:text-white/40 focus:border-white/40 focus:ring-white/20"
      />
    </form>
  );
}
