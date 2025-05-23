import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        const apiKey = process.env.GEMINI_API_KEY || '';
        try {
          const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?key=${apiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
              }),
            }
          );

          if (!res.body) {
            throw new Error('No response body');
          }

          const reader = res.body.getReader();
          const decoder = new TextDecoder();
          let buffer = '';

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            // Try to extract and parse complete JSON objects
            let startIndex = buffer.indexOf('{');
            while (startIndex !== -1) {
              let braceCount = 0;
              let endIndex = -1;
              for (let i = startIndex; i < buffer.length; i++) {
                if (buffer[i] === '{') braceCount++;
                else if (buffer[i] === '}') braceCount--;

                if (braceCount === 0) {
                  endIndex = i + 1;
                  break;
                }
              }

              if (endIndex === -1) break; // Incomplete JSON, wait for more

              const jsonStr = buffer.slice(startIndex, endIndex);
              buffer = buffer.slice(endIndex); // Trim processed chunk

              try {
                const parsed = JSON.parse(jsonStr);
                const text = parsed?.candidates?.[0]?.content?.parts?.[0]?.text;
                const finishReason = parsed?.candidates?.[0]?.finishReason;

                if (text) {
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
                }

                if (finishReason) {
                  controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                  controller.close();
                  return;
                }
              } catch (err) {
                console.error('Error parsing JSON chunk:', err, 'Raw data:', jsonStr);
                break;
              }

              startIndex = buffer.indexOf('{');
            }
          }

          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (err) {
          console.error('Streaming error:', err);
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: 'Stream error occurred' })}\n\n`));
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        }
      },
    });

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Handler error:', error.message);
    } else {
      console.error('Handler error:', error);
    }
    return NextResponse.json({ error: 'Error generating content' }, { status: 500 });
  }
}
