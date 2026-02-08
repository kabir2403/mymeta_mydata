export async function POST() {
  return new Response(JSON.stringify({
    success: false,
    message: 'This endpoint has been removed. The project now focuses only on the Accessibility tool.'
  }), {
    status: 410,
    headers: { 'Content-Type': 'application/json' }
  });
}
