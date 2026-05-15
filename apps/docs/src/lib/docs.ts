import type { CollectionEntry } from "astro:content";

export function sortDocs(
  entries: CollectionEntry<"docs">[],
): CollectionEntry<"docs">[] {
  return [...entries].sort((left, right) => left.data.order - right.data.order);
}
