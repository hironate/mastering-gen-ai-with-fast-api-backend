import { NextResponse } from 'next/server';
import graph from '@/agent/graph';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    const response = await graph.invoke({ question: message });

    return NextResponse.json({ response: response.answer }, { status: 200 });
  } catch (error) {
    console.error('Error processing chat request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
