export async function POST() {
  return new Response(JSON.stringify({
    success: false,
    message: 'Orchestration has been removed. The application now focuses solely on Accessibility analysis.'
  }), {
    status: 410,
    headers: { 'Content-Type': 'application/json' }
  });
}
