import { db } from "@/db";
import { quizs } from "@/db/schema";
import { eq } from "drizzle-orm";
import QuizQuestions from "../quizQuestions";

const Page = async ({ params }: {
    params: {
        quizId: string 
    }
}) => {
    const { quizId } = await params; 
    
    if (!quizId || isNaN(Number(quizId))) {
        return (
            <div>Invalid Quiz ID</div>
        );
    }

    const quiz = await db.query.quizs.findFirst({
        where: eq(quizs.id, parseInt(quizId)),
        with: {
            questions: {
                with: {
                    answers: true
                }
            }
        }
    });

    if (!quiz) {
        return (
            <div>Quiz Not Found</div>
        );
    }

    return (
        <QuizQuestions quizs={quiz} />
    );
}

export default Page;