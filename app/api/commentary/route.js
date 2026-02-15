import OpenAI from 'openai';
import { NextResponse } from 'next/server';

export async function POST(request) {
    let match;
    try {
        const body = await request.json();
        match = body.match;

        if (!match) {
            return NextResponse.json({ error: 'Match data is required' }, { status: 400 });
        }

        // Initialize OpenAI inside the handler to prevent build-time errors if env var is missing
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY || 'dummy_key_for_build',
        });

        const prompt = `
      You are an energetic cricket commentator.
      Generate a short, exciting 2-sentence commentary update for the following match situation:
      
      Teams: ${match.team1} vs ${match.team2}
      Current Score: ${match.team1} (${match.score1}) vs ${match.team2} (${match.score2})
      Match Status: ${match.statusText}
      Series: ${match.series}
      
      Make it sound like a live broadcast update. Focus on the current state of play.
    `;

        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "gpt-3.5-turbo",
            max_tokens: 100,
        });

        const commentary = completion.choices[0].message.content.trim();

        return NextResponse.json({ commentary });
    } catch (error) {
        console.error('OpenAI API Error:', error);

        // Fallback for demo purposes if API fails (e.g. quota exceeded)
        const team1 = match?.team1 || 'Team A';
        const team2 = match?.team2 || 'Team B';
        const series = match?.series || 'Match';

        const simulatedCommentary = `(Simulated Insight) High intensity match here! ${team1} is looking strong against ${team2} in this ${series} clash.`;

        return NextResponse.json({
            commentary: simulatedCommentary,
            note: "API Error (Quota/Network), using simulation."
        });
    }
}
