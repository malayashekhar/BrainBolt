"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ProgressBar from "@/components/ProgessBar";
import ResultCard from "./ResultCard";
import QuizSubmission from "./QuizSubmission";
import { ChevronLeft, X } from "lucide-react"

const questions = [
    {
        questionText: "Question 1",
        answers: [
            { id: 1, answerText: "Option 1", isCorrect: false },
            { id: 2, answerText: "Option 2", isCorrect: true },
            { id: 3, answerText: "Option 3", isCorrect: false },
            { id: 4, answerText: "Option 4", isCorrect: false }
        ]
    },
    {
        questionText: "Question 2",
        answers: [
            { id: 1, answerText: "Option 1", isCorrect: false },
            { id: 2, answerText: "Option 2", isCorrect: false },
            { id: 3, answerText: "Option 3", isCorrect: true },
            { id: 4, answerText: "Option 4", isCorrect: false }
        ]
    },
    {
        questionText: "Question 3",
        answers: [
            { id: 1, answerText: "Option 1", isCorrect: false },
            { id: 2, answerText: "Option 2", isCorrect: false },
            { id: 3, answerText: "Option 3", isCorrect: false },
            { id: 4, answerText: "Option 4", isCorrect: true }
        ]
    }
];

export default function Home() {
    const [started, setStarted] = useState<boolean>(false);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null); 
    const [isSubmit, setIsSubmit] = useState<boolean>(false);

    const handleNext = () => {
        if (!started) {
            setStarted(true);
            return;
        }
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
        else {
            setIsSubmit(true);
            return;
        }
        setSelectedAnswer(null);
        setIsCorrect(null);
    };

    const handleAnswer = (answer: { id: number; answerText: string; isCorrect: boolean }) => {
        setSelectedAnswer(answer.id);
        const isCurrentCorrect = answer.isCorrect;
        if (isCurrentCorrect) {
            setScore((prev) => prev + 1); 
        }
        setIsCorrect(isCurrentCorrect);
    };
 
    if(isSubmit) {
        return (
            <QuizSubmission scorePercentage={parseFloat(((score / questions.length) * 100).toFixed(2))} score={score} totalQuestion={questions.length} />
        )
    }

    return (
        <div className="flex flex-col flex-1">
            <div className="position-sticky top-0 z-10 shadow-md py-4 w-full">
                <header className="flex items-center justify-between gap-4 px-4">
                    <Button size="icon" variant="outline"><ChevronLeft /></Button>
                    <ProgressBar value={(currentQuestion / (questions.length - 1)) * 100} />
                    <Button size="icon" variant="outline"><X /></Button>
                </header>
            </div>
            <main className="flex justify-center flex-1">
                {!started ? (
                    <h1 className="text-3xl font-bold">Hello World👋</h1>
                ) : (
                    <div className="text-3xl font-bold">
                        <h2>{questions[currentQuestion].questionText}</h2>
                        <div className="grid grid-cols-1 gap-6 mt-6">
                           {
                            questions[currentQuestion].answers.map(answer => (
                                <Button key={answer.id} variant={selectedAnswer === answer.id ? (answer.isCorrect ? "neoSuccess" : "neoDanger"): "neoOutline"} size="lg" onClick={() => handleAnswer(answer)}>
                                    <p className="whitespace-normal">{answer.answerText}</p>
                                </Button>
                            ))
                           }
                        </div>
                    </div>
                )}
            </main>

            <footer className="footer pb-9 px-6 relative mb-0">
                <ResultCard isCorrect={isCorrect} correctAnswer={questions[currentQuestion].answers.find(answer => answer.isCorrect)?.answerText || ""} />
                <Button variant="neo" size="lg" onClick={handleNext}>{!started ? "Start" : (currentQuestion === questions.length - 1) ? "Submit" : "Next"}</Button>
            </footer>
        </div>
    );
}
