import fs from 'fs';
import path from 'path';

let schedulerRunning = false;

export async function startDailyScheduler() {
  if (schedulerRunning) return;
  schedulerRunning = true;

  console.log('Daily scheduler started');

  // Run at 2 AM UTC every day
  const checkSchedule = async () => {
    const now = new Date();
    const hours = now.getUTCHours();
    const minutes = now.getUTCMinutes();

    // Check if it's 2 AM UTC
    if (hours === 2 && minutes === 0) {
      console.log('Running scheduled AI orchestration at 2 AM UTC');
      try {
        const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3001';
        const response = await fetch(`${baseUrl}/api/orchestrate`, {
          method: 'POST',
        });
        const data = await response.json();
        console.log('Scheduled orchestration completed:', data);
      } catch (error) {
        console.error('Scheduled orchestration failed:', error.message);
      }
    }

    // Check again in 1 minute
    setTimeout(checkSchedule, 60000);
  };

  checkSchedule();
}

export async function GET() {
  return new Response(JSON.stringify({
    app: 'Accessibility Tool',
    status: 'scheduler removed',
    message: 'Background orchestration/scheduler removed in accessibility-focused project.'
  }), {
    status: 410,
    headers: { 'Content-Type': 'application/json' }
  });
}
