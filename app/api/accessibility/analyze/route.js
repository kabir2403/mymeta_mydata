import OpenAI from 'openai';

export async function POST(req) {
  try {
    const { url, html } = await req.json();

    let pageHtml = html;
    if (!pageHtml && url) {
      const resp = await fetch(url);
      pageHtml = await resp.text();
    }

    // If no API key is configured, return a helpful sample payload so the UI remains testable.
    if (!process.env.OPENAI_API_KEY) {
      const sample = {
        issues: [
          {
            id: 'a11y-1',
            severity: 'critical',
            selector: 'img:not([alt])',
            description: 'Image elements missing `alt` attributes are not accessible to screen readers.',
            suggestion: 'Add descriptive `alt` text to images or `role="presentation"` if purely decorative.',
            wcag: '1.1.1'
          },
          {
            id: 'a11y-2',
            severity: 'major',
            selector: 'a:where([href])',
            description: 'Links should have discernible text; some links use vague text like "click here".',
            suggestion: 'Use descriptive link text that describes the destination.',
            wcag: '2.4.4'
          }
        ],
        note: 'fallback - OPENAI_API_KEY not configured'
      };
      return new Response(JSON.stringify(sample), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const prompt = `You are an accessibility auditor. Given the following website HTML, return a JSON array named \"issues\". Each issue should contain: id, severity (critical|major|minor), selector (CSS selector pointing to problematic element), description, suggestion, and wcag (relevant WCAG success criteria). Only return valid JSON, nothing else.\n\nHTML:\n${(pageHtml || '').slice(0, 20000)}`;

    const completion = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful web accessibility auditor.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0
    });

    const text = completion?.choices?.[0]?.message?.content?.trim();
    let issues;
    try {
      issues = JSON.parse(text);
      // If the assistant returned an object with { issues: [...] }, normalize to that shape
      if (!Array.isArray(issues) && Array.isArray(issues.issues)) issues = issues.issues;
    } catch (err) {
      // Attempt to extract JSON substring if assistant included explanation
      const m = text && text.match(/(\[\s*\{[\s\S]*\}\s*\])/);
      if (m) {
        issues = JSON.parse(m[0]);
      } else {
        throw err;
      }
    }

    return new Response(JSON.stringify({ issues }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    const sample = {
      issues: [
        {
          id: 'a11y-1',
          severity: 'critical',
          selector: 'img:not([alt])',
          description: 'Image elements missing `alt` attributes are not accessible to screen readers.',
          suggestion: 'Add descriptive `alt` text to images or `role="presentation"` if purely decorative.',
          wcag: '1.1.1'
        }
      ],
      error: String(err)
    };
    return new Response(JSON.stringify(sample), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
