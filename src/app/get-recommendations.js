// File: src/pages/api/get-recommendations.js

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { preferences } = req.body;

    try {
      // Call OpenAI API to get recommendations
      const openAiResponse = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          prompt: `Recommend movies based on these preferences: ${preferences}`,
          max_tokens: 100,
        }),
      });

      const data = await openAiResponse.json();

      // Send the OpenAI response back to the client
      res.status(200).json({ recommendations: data.choices[0].text });
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      res.status(500).json({ error: 'Failed to get recommendations from OpenAI' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
