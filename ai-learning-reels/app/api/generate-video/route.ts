import { NextResponse } from 'next/server';

async function callSora(prompt: string): Promise<string> {
  if (!process.env.SORA_API_KEY) {
    return 'https://example.com/mock-video.mp4';
  }

  // TODO: integrate with Azure Sora API using the provided key
  return 'https://example.com/mock-video.mp4';
}

export async function POST(req: Request) {
  const { prompt } = await req.json();
  const url = await callSora(prompt);
  return NextResponse.json({ url });
}
