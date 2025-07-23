"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function FilterControls() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleSortChange(value: string) {
    const params = new URLSearchParams(searchParams as any);
    params.set("sort", value);
    router.push(`${pathname}?${params.toString()}`);
  }

  // Tag filter can be added similarly

  return (
    <div className="flex space-x-4 mb-4">
      <select
        onChange={(e) => handleSortChange(e.target.value)}
        className="p-2 border rounded"
        defaultValue={searchParams.get("sort") || "created_at"}
      >
        <option value="created_at">Newest</option>
        <option value="likes">Most Liked</option>
      </select>
      {/* Add tag filter input similarly */}
    </div>
  );
}
