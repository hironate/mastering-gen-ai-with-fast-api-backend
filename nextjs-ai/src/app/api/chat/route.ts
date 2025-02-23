import { NextResponse } from 'next/server';

// Simulate some delay to make it feel more realistic
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(request: Request) {
  const { message } = await request.json();

  // Simulate processing time
  await delay(1000);

  // Simulate different responses based on the question
  let response = '';
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('show') && lowerMessage.includes('data')) {
    response =
      "Based on the database, here's a summary of the data you requested...";
  } else if (lowerMessage.includes('how many')) {
    response =
      'According to the database analysis, there are 42 records matching your criteria.';
  } else if (lowerMessage.includes('when') || lowerMessage.includes('date')) {
    response =
      'The most recent entry in the database was from January 15th, 2024.';
  } else {
    response =
      "I've analyzed your question. Could you please be more specific about what data you'd like to query from the database?";
  }

  return NextResponse.json({
    id: Date.now().toString(),
    content: response,
    role: 'assistant',
    timestamp: new Date(),
  });
}
