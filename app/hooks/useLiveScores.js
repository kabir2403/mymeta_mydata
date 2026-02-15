'use client';
import { useState, useEffect } from 'react';
import { liveMatches as initialMatches } from '../data/mockData';

export function useLiveScores() {
    const [matches, setMatches] = useState(initialMatches);

    useEffect(() => {
        const interval = setInterval(() => {
            setMatches(prevMatches => prevMatches.map(match => {
                if (match.status !== 'Live') return match;

                // Parse current score "285/4 (45.0)" or "145/2"
                // Simple regex to extract runs/wickets
                const scoreParts = match.score1.match(/(\d+)\/(\d+)/);
                if (!scoreParts) return match;

                let runs = parseInt(scoreParts[1]);
                let wickets = parseInt(scoreParts[2]);

                // Random event: 0=dot, 1=1run, 2=2runs, 3=4runs, 4=6runs, 5=wicket
                const event = Math.random();

                if (event > 0.98 && wickets < 10) { // 2% chance of wicket
                    wickets += 1;
                } else if (event > 0.9) { // 6
                    runs += 6;
                } else if (event > 0.8) { // 4
                    runs += 4;
                } else if (event > 0.5) { // 1 or 2
                    runs += Math.random() > 0.5 ? 1 : 2;
                }

                // Update score string (simplified for demo)
                const newScore = `${runs}/${wickets}`;

                return {
                    ...match,
                    score1: newScore // keeping it simple, just updating team 1 for now
                };
            }));
        }, 2000); // Update every 2 seconds

        return () => clearInterval(interval);
    }, []);

    return matches;
}
