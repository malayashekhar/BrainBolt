import { NextRequest, NextResponse } from 'next/server';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { JsonOutputParser } from '@langchain/core/output_parsers';
import saveQuiz from './saveToDb';

interface Schema {
    quiz: {
        name: string;
        description: string;
        questions: {
            questionText: string;
            answers: {
                answerText: string;
                isCorrect: boolean;
            };
        };
    };
}

export async function POST(req: NextRequest) {
    const body = await req.formData();
    const document = body.get('pdf');

    try {
        if (!(document instanceof Blob)) {
            return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
        }

        const pdfLoader = new PDFLoader(document, {
            parsedItemSeparator: ' ',
        });

        const docs = await pdfLoader.load();
        const selectedDocuments = docs.filter((doc) => doc.pageContent.length !== undefined);
        const texts = selectedDocuments.map((doc) => doc.pageContent);


        if (!process.env.GOOGLE_API_KEY) {
            return NextResponse.json({ error: 'GOOGLE_API_KEY is not defined' }, { status: 500 });
        }

        const model = new ChatGoogleGenerativeAI({
            apiKey: process.env.GOOGLE_API_KEY,
            model: 'gemini-2.0-flash',
            temperature: 0,
        });

        const parser = new JsonOutputParser<Schema>();

        const prompt = ChatPromptTemplate.fromTemplate(
            `You are a JSON-only API. You must return a quiz strictly in this format:

{{
  "quiz": {{
    "name": string,
    "description": string,
    "questions": [
      {{
        "questionText": string,
        "answers": [
          {{
            "answerText": string,
            "isCorrect": boolean
          }},
          ...
        ]
      }},
      ...
    ]
  }}
}}
- Generate a minimum of 10 questions. 
- Each question must have exactly 4 answers.
- Only one answer in each question should have isCorrect: true.
- Do not include extra text outside the JSON.
- Do not use keys like "question" or "options".

Text:
{query}`
        );


        const chain = prompt.pipe(model).pipe(parser);

        const result = await chain.invoke({
            query: texts.join('\n'),
        });

        console.log(result);

        

        const { quizId } = await saveQuiz(result.quiz);

        return NextResponse.json({ message: quizId, result }, { status: 200 });
    }
    catch (e: unknown) {
        if (e instanceof Error) {
            return NextResponse.json({ error: e.message }, { status: 500 });
        }
        else {
            return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
        }
    }
}
