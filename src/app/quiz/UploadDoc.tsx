"use client"

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button' 
import { useRouter } from "next/navigation";

const UploadDoc = () => {   
  const [document, setDocument] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!document) {
      setError("Please upload a file");
      return;
    }

    setError(""); 
    setLoading(true);

    const formData = new FormData();
    formData.append("pdf", document);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        const quizId = data.message;
        router.push(`/quiz/${quizId}`);
      } 
      else {
        const data = await res.json();
        setError(data.error || "An error occurred");
      }
    } 
    catch (err) {
      console.error("Error occurred", err);
      setError("Failed to upload document");
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full'>
      <form className="w-full" onSubmit={handleSubmit}>
        <label htmlFor='document' className='mt-4 bg-secondary w-full flex h-20 rounded-md border-4 border-dashed border-blue-900 relative'>
          <div className='absolute inset-0 m-auto flex justify-center items-center'>
            {document?.name || "Drag and drop your file here..."}
          </div>
          <Input
            type="file"
            id="document"
            accept="application/pdf"
            className='relative block w-full h-full z-50 opacity-0'
            onChange={(e) => setDocument(e.target.files?.[0] || null)}
          />
        </label>
        {error && <p className='text-red-500 mt-1'>{error}</p>}
        <Button
          type='submit'
          variant="neo"
          size="lg"
          className='mt-8'
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Quiz"}
        </Button>
      </form>
    </div>
  )
};

export default UploadDoc;
