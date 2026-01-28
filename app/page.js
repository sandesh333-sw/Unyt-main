import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import NavBar from "./(main)/navbar/page";
import HeroPage from "./(main)/hero/page";
import Featured from "./(main)/featured/page";
import Footer from "./(main)/footer/page";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1">
        <HeroPage />
        <Featured />
      </main>
      <Footer />
    </div>
  );
}