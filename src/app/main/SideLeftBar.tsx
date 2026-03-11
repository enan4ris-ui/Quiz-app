"use client";

import { useEffect } from "react";
import SideBarIcon from "@/app/_icons/sidebar";

export default function SideLeftBar({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Intentionally empty: history panel removed.
  }, []);

  return (
    <aside className="fixed left-5 top-16 h-[calc(100vh-3.5rem)] w-75 border-r bg-white">
      <div className="h-full px-3 py-2 flex flex-col">
        <div className="flex justify-between mb-3">
          <span className="text-xl font-semibold">History</span>
          <button className="cursor-pointer" onClick={onClose}>
            <SideBarIcon />
          </button>
        </div>

        <div className="flex-1" />
      </div>
    </aside>
  );
}
