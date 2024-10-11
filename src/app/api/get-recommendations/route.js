import { NextResponse } from 'next/server';

// Handle POST request for OpenAI-based movie recommendations
export async function POST(req) {
  try {
    // Get user preferences from the request body
    const { preferences } = await req.json();

    // Call OpenAI API to get recommendations
    const openAiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // Secure server-side OpenAI API key
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a movie recommendation engine.' },
          { role: 'user', content: `Recommend movies based on these preferences: ${preferences}` }
        ],
        max_tokens: 1000,
      }),
    });

    // Check if the OpenAI API responded with an error
    if (!openAiResponse.ok) {
      const error = await openAiResponse.json();
      console.error('Error from OpenAI API:', error);
      throw new Error(`OpenAI API error: ${error.message}`);
    }

    const data = await openAiResponse.json(); // Parse the successful response
    return NextResponse.json({ recommendations: data.choices[0].message.content });
  } catch (error) {
    console.error('Error in API route:', error.message);
    return NextResponse.json({ error: 'Failed to get recommendations from OpenAI' }, { status: 500 });
  }
}

// Handle GET request for TMDb movie data
export async function GET() {
  try {
    const tmdbApiKey = process.env.TMDB_API_KEY; // Secure server-side TMDb API key

    // Fetch popular movies from TMDb
    const tmdbResponse = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${tmdbApiKey}`);

    if (!tmdbResponse.ok) {
      throw new Error('Failed to fetch data from TMDb');
    }

    const data = await tmdbResponse.json(); // Parse the successful response
    return NextResponse.json({ movies: data.results });
  } catch (error) {
    console.error('Error fetching movies:', error.message);
    return NextResponse.json({ error: 'Failed to fetch movies from TMDb' }, { status: 500 });
  }
}
