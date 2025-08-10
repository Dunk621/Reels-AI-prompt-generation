import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { topic: string } }
) {
  const { topic } = params;
  const quiz = {
    question: `What is one fact about ${topic}?`,
    choices: ['Option A', 'Option B', 'Option C'],
    answer: 1,
  };
  return NextResponse.json(quiz);
}
