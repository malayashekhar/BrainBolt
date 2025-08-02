"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ProgressBar from "@/components/ProgessBar";
import ResultCard from "./ResultCard";
import QuizSubmission from "./QuizSubmission";
import { ChevronLeft, X } from "lucide-react"
import { InferSelectModel } from "drizzle-orm";
import { questionAnswers, questions as dbQuestions, quizs } from "@/db/schema";
import { useRouter } from "next/navigation";
import { saveSubmission } from "../actions/saveSubmission";

type Answer = InferSelectModel<typeof questionAnswers>;
type Question = InferSelectModel<typeof dbQuestions> & { answers ?: Answer[] };
type Quizs = InferSelectModel<typeof quizs> & { questions ?: Question[] };

type Props = {
    quizs: Quizs;
}

export default function QuizQuestions(props: Props) {

    const { questions = []} = props.quizs;

    const [started, setStarted] = useState<boolean>(false);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [isSubmit, setIsSubmit] = useState<boolean>(false);

    const [userAnswers, setUserAnswers] = useState<{questionId: number, answerId: number}[]>([]);

    const router = useRouter();

    if (!questions || questions.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>No questions available</p>
            </div>
        );
    }

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
    };

    const handleAnswer = (answer: Answer, questionId: number) => {
        const isCurrentCorrect = answer.isCorrect;
        const newUserAnswerArr = [...userAnswers, {
            answerId: answer.id,
            questionId
        }]
        setUserAnswers(newUserAnswerArr);
        if (isCurrentCorrect) {
            setScore((prev) => prev + 1); 
        }
    };

    const handlePressPrev = () => {
        if (currentQuestion !== 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    }

    const handleExit = () => {
        router.push(`/dashboard`);
    }

    const handleSubmit = async () => {
        try {
            const subId = await saveSubmission(score, props.quizs.id);
        }
        catch (error) {
            console.log(error);
        }
        setIsSubmit(true);
    }

    const currentQuestionData = questions[currentQuestion];
    const selectedAnswer: number | null | undefined = userAnswers.find((item) => item.questionId === currentQuestionData?.id)?.answerId;
    
    const isCorrect: boolean | null = (() => {
        if (!currentQuestionData?.answers || selectedAnswer === undefined) {
            return null;
        }
        const selectedAnswerData = currentQuestionData.answers.find((answer) => answer.id === selectedAnswer);
        return selectedAnswerData ? selectedAnswerData.isCorrect : null;
    })();
 
    if(isSubmit) {
        return (
            <QuizSubmission scorePercentage={parseFloat(((score / questions.length) * 100).toFixed(2))} score={score} totalQuestion={questions.length} />
        )
    }

    return (
        <div className="flex flex-col flex-1">
            <div className="position-sticky top-0 z-10 shadow-md py-4 w-full">
                <header className="flex items-center justify-between gap-4 px-4">
                    <Button size="icon" onClick={handlePressPrev} variant="outline"><ChevronLeft /></Button>
                    <ProgressBar value={(currentQuestion / (questions.length - 1)) * 100} />
                    <Button size="icon" variant="outline" onClick={handleExit}><X /></Button>
                </header>
            </div>
            <main className="flex justify-center flex-1">
                {!started ? (
                    <h1 className="mt-10 text-3xl font-bold">Welcome to the Quiz!</h1>
                ) : (
                    <div className="w-full max-w-4xl mx-auto px-4">
                        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-left">{currentQuestionData?.questionText}</h2>
                        <div className="grid grid-cols-1 gap-4 mt-6">
                           {
                            currentQuestionData?.answers?.map(answer => (
                                <Button 
                                    key={answer.id} 
                                    disabled={!!selectedAnswer} 
                                    className="disabled:opacity-100 h-auto min-h-[60px] p-6 text-left justify-start" 
                                    variant={selectedAnswer === answer.id ? (answer.isCorrect ? "neoSuccess" : "neoDanger"): "neoOutline"} 
                                    size="lg" 
                                    onClick={() => handleAnswer(answer, currentQuestionData.id)}
                                >
                                    <span className="whitespace-normal break-words text-sm md:text-base leading-relaxed">{answer.answerText}</span>
                                </Button>
                            ))
                           }
                        </div>
                    </div>
                )}
            </main>

            <footer className="footer pb-9 px-6 relative mb-0">
                <ResultCard isCorrect={isCorrect} correctAnswer={currentQuestionData?.answers?.find(answer => answer.isCorrect)?.answerText || ""} />
                {
                    (currentQuestion === questions.length - 1) ? <Button className="mt-8" variant="neo" size="lg" onClick={handleSubmit}>Submit</Button> : <Button variant="neo" size="lg" className="mt-8" onClick={handleNext}>{!started ? "Start" : "Next"}</Button>
                }
            </footer>
        </div>
    );
}