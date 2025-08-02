import React from 'react'
import UploadDoc from '../UploadDoc'
import { auth } from "@/auth";
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect('/api/auth/signin'); 
  }
  
  return (
    <div className='flex flex-col flex-1'>
        <main className='py-11 flex flex-col'>
            <h2 className='text-3xl font-bold mb-4'>
                What do you want to be quizzed about ?
            </h2>
            <UploadDoc />
        </main>
    </div>
  )
}

export default page