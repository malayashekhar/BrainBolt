"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  const handleGetStarted = () => {
    router.push(`/quiz/new`);
  }

  return (
    <div className="flex flex-col flex-1">
      <main className="flex justify-center flex-1 mx-auto py-5 w-full">
        <div>
          <div className="flex items-center flex-row gap-20">
            <Image src="/images/amadeus.png" width="600" height="600" alt="Brain Bolt" />
          </div>
          <div className="text-center mt-3">
            <h1 className="text-3xl font-bold">Welcome to Brain Bolt!</h1>
            <h3 className="mt-2">Upload the document and generate a quiz with AI for free!</h3>
            <Button onClick={handleGetStarted} className="mt-6 h-14 text-white" variant="neo">Get Started</Button>
          </div>
        </div>
      </main>
    </div>
  )
}
