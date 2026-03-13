"use client";

import { useEffect, useState } from "react";
import SideBarIcon from "@/app/_icons/sidebar";

type HistoryItem = {
  id: string;
  title: string;
  summary?: string;
  questions?: unknown[];
  score?: number;
  total?: number;
};

export default function SideLeftBar({ onClose }: { onClose: () => void }) {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadHistory = () => {
      try {
        const raw = localStorage.getItem("history");
        const parsed = raw ? JSON.parse(raw) : [];
        setHistory(Array.isArray(parsed) ? parsed : []);
      } catch (error) {
        console.error("Failed to load history", error);
        setHistory([]);
      }
    };

    loadHistory();
    window.addEventListener("history-update", loadHistory);

    return () => {
      window.removeEventListener("history-update", loadHistory);
    };
  }, []);

  const handleSelect = (item: HistoryItem) => {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem("selectedHistory", JSON.stringify(item));
      window.dispatchEvent(new CustomEvent("history-select"));
      onClose();
    } catch (error) {
      console.error("Failed to select history item", error);
    }
  };

  const handleDelete = (id: string) => {
    if (typeof window === "undefined") return;

    try {
      const next = history.filter((item) => item.id !== id);
      setHistory(next);
      localStorage.setItem("history", JSON.stringify(next));
      window.dispatchEvent(new CustomEvent("history-update"));
    } catch (error) {
      console.error("Failed to delete history item", error);
    }
  };

  return (
    <aside className="fixed left-5 top-16 h-[calc(100vh-3.5rem)] w-75 border-r bg-white">
      <div className="flex h-full flex-col px-3 py-2">
        <div className="mb-3 flex justify-between">
          <span className="text-xl font-semibold">History</span>
          <button className="cursor-pointer" onClick={onClose}>
            <SideBarIcon />
          </button>
        </div>

        <div className="flex-1 space-y-2 overflow-y-auto">
          {history.length === 0 ? (
            <div className="rounded-lg border border-dashed px-3 py-4 text-sm text-zinc-500">
              No saved quizzes yet.
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                className="w-full rounded-lg border px-3 py-3 text-left"
              >
                <button
                  type="button"
                  onClick={() => handleSelect(item)}
                  className="w-full text-left transition hover:underline"
                >
                  <div className="font-medium text-zinc-800 line-clamp-2">
                    {item.title || "Untitled quiz"}
                  </div>
                  <div className="mt-1 text-xs text-zinc-500">
                    {Array.isArray(item.questions) ? item.questions.length : 0}{" "}
                    questions
                  </div>
                  {(item.score ?? item.total) && (
                    <div className="mt-1 text-xs text-zinc-500">
                      Score: {item.score ?? 0} / {item.total ?? 0}
                    </div>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="mt-2 text-xs font-medium text-red-600 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </aside>
  );
}
