"use client";
import { useUser } from "@clerk/nextjs";
import MainPage from "@/app/main/page";

import SidenavBar from "./main/SidenavBar";
export default function Home() {
  const { user } = useUser();
  return (
    <div className="flex min-h-screen">
      <SidenavBar />
      <div className="flex flex-1 justify-center pt-12 bg-zinc-50 font-sans">
        {user ? (
          <MainPage />
        ) : (
          <div className="mt-24 text-center">
            <h1 className="text-2xl font-semibold text-zinc-800">
              Log in or register to keep going
            </h1>
            <p className="mt-2 text-sm text-zinc-500">
              Sign up or log in to build your quiz.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
