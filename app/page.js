import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-center h-screen'>
        <button className="bg-amber-800">Click me</button>
        <UserButton />
    </main>
  );
}
