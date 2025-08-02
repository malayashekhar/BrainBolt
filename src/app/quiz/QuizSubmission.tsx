import React from 'react'
import { Button } from  '@/components/ui/button'
import { ChevronLeft,  X } from 'lucide-react'    
import { useRouter } from 'next/navigation'

type Props = {
    scorePercentage: number,
    score: number,
    totalQuestion: number,
}

const QuizSubmission = (props: Props) => {
    const { scorePercentage, score, totalQuestion } = props
    const router = useRouter();

    const handleBtn = () => {
        router.push(`/dashboard`);
    }

    return (
        <div className='flex flex-col flex-1'>
            <main className='py-11 flex flex-col gap-4 items-center flex-1 mt-24'>
                <h1 className='text-4xl font-bold'>Quiz Complete!</h1>
                <p className='mt-4'>You scored {scorePercentage}%</p>
                <p>Correct: {score}</p>
                <p>Incorrect: {totalQuestion - score}</p>
                <Button onClick={handleBtn} size="lg" className="text-black mt-8" variant={"neo"}><p>Dashboard</p></Button>
            </main>

        </div>
    )
}

export default QuizSubmission