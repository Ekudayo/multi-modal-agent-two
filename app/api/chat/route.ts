import { google } from "@ai-sdk/google";
import { streamText, convertToModelMessages, type UIMessage } from "ai";

// Allow streaming responses up to 30 seconds
export const runtime = "edge";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    // model: "openai/gpt-4o",
    // messages: await convertToModelMessages(messages),

    model: google("gemini-2.5-flash"), // Ensure this is a direct call
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
