import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // Get user preferences from the request body
    const { preferences } = await req.json();

    // Call OpenAI API to get recommendations
    const openAiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`, // Use your OpenAI API key
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a movie recommendation engine.' },
          { role: 'user', content: `Recommend movies based on these preferences: ${preferences}` }
        ],
        max_tokens: 100,
      }),
    });

    // Check if the OpenAI API responded with an error
    if (!openAiResponse.ok) {
      const error = await openAiResponse.json(); // Parse the error response
      console.error('Error from OpenAI API:', error); // Log the error
      throw new Error(`OpenAI API error: ${error.message}`); // Throw the error
    }

    const data = await openAiResponse.json(); // Parse the successful response
    return NextResponse.json({ recommendations: data.choices[0].message.content });
  } catch (error) {
    console.error('Error in API route:', error.message); // Log any API route errors
    return NextResponse.json({ error: 'Failed to get recommendations from OpenAI' }, { status: 500 });
  }
}
