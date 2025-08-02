import { db } from "@/db";
import { eq } from "drizzle-orm";
import { quizs } from "@/db/schema";
import { auth } from "@/auth";
import QuizsTable, { Quizs } from "./quizsTable";
import getUserMetrics from "@/app/actions/getUserMetrics";
import MetricCard from "./metricCard";

const page = async () => {
    const session = await auth();
    const userId = session?.user?.id;

    if(!userId) {
        <p>User not found.</p>
        return;
    }

    const userQuizs: Quizs[] = await db.query.quizs.findMany({
        where: eq(quizs.userId, userId),
    });

    const userData = await getUserMetrics();


    return(
        <div>
            <div className="flex gap-8 mb-6">
                {userData!.length > 0 ? userData?.map((metric) => <MetricCard key={metric.label} label={metric.label} value={metric.value} />) : null}
            </div>
            <QuizsTable quizs={userQuizs} />
        </div>
    )
}

export default page;