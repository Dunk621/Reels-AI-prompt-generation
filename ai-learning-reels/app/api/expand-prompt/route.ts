import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { topic } = await req.json();

  // If no API key is configured, return a simple placeholder prompt
  if (!process.env.OPENAI_API_KEY) {
    const prompt = `Create a detailed, stylized video about ${topic}.`;
    return NextResponse.json({ prompt });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You expand short topics into imaginative, vivid prompts for video generation.',
        },
        {
          role: 'user',
          content: `Expand the following topic into a detailed, stylized video prompt: ${topic}`,
        },
      ],
    });

    const prompt =
      completion.choices[0]?.message?.content?.trim() ||
      `Create a detailed, stylized video about ${topic}.`;
    return NextResponse.json({ prompt });
  } catch (err) {
    console.error('openai error', err);
    const prompt = `Create a detailed, stylized video about ${topic}.`;
    return NextResponse.json({ prompt });
  }
}
