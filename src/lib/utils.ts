import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function estimateReadingTime(content: string): number {
  // Japanese: ~400 chars/min, English: ~200 words/min
  const japaneseChars = content.replace(/[a-zA-Z0-9\s\n`#*\-\[\](){}|>/=:;,.!?'"]/g, "").length;
  const englishWords = content.replace(/[^\x20-\x7E\n]/g, "").split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(japaneseChars / 400 + englishWords / 200);
  return Math.max(1, minutes);
}
