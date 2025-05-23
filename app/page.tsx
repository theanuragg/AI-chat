"use client"; // if you are using Next.js 13+ (with app directory)

import Hero from "@/Components/landing/hero";


export default function AskAnything() {

  return (
    <>
    <main className="flex flex-col items-center justify-center min-h-screen ">
      <Hero/>
    </main>
    </>
  );
}
