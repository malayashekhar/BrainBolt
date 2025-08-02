"use server"
import { db } from "@/db";
import { quizSubmissions } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

type Submission = InferSelectModel<typeof quizSubmissions>

export async function saveSubmission(score: number, quizId: number) {

    const newSubmission = await db
    .insert(quizSubmissions)
    .values({
        score,
        quizId
    }).returning({insertedId: quizSubmissions.id});

    const submissionId = newSubmission[0].insertedId;
    return submissionId;
}