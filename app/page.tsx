import Navbar from "@/components/Navbar";
import Image from "next/image";
import herobg from "@/assets/herobg.png";

export default function Home() {
  return (
    <>
      <Navbar />
      <Image src={herobg} alt="Hero" className="w-full h-full object-cover" />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Welcome to our website</h1>
        <p className="text-lg">This is a test website</p>
      </div>
    </>
  );
}
