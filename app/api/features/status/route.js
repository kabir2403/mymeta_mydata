export async function GET() {
  return new Response(JSON.stringify({
    success: false,
    message: 'This endpoint has been deprecated — feature tracking removed in accessibility-focused project.'
  }), {
    status: 410,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST() {
  return new Response(JSON.stringify({
    success: false,
    message: 'This endpoint has been deprecated — feature tracking removed in accessibility-focused project.'
  }), {
    status: 410,
    headers: { 'Content-Type': 'application/json' }
  });
}
