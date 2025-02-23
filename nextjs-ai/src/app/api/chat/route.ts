import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock response - you can replace this with actual AI integration later
    const mockResponses = [
      "That's an interesting question! Let me think about it...",
      'Based on my analysis, I would suggest...',
      "Here's what I think about that...",
      "That's a great point! Here's my perspective...",
    ];

    const response =
      mockResponses[Math.floor(Math.random() * mockResponses.length)] +
      ' [In response to: ' +
      message +
      ']';

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    console.error('Error processing chat request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
