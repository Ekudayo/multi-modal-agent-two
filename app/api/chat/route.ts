import { google } from "@ai-sdk/google";
import { streamText, convertToModelMessages, type UIMessage } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

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

// import { google } from "@ai-sdk/google";
// import { streamText, convertToModelMessages, type UIMessage } from "ai";
// import { groq } from "@ai-sdk/groq";

// // Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

// export async function POST(req: Request) {
//   const { messages }: { messages: UIMessage[] } = await req.json();
// const model = groq("llama-3.3-70b-versatile");
//   // 1. We must 'await' the streamText call to initialize the stream
//   const result = streamText({
//     // 2. gemini-1.5-flash is currently the most stable 'Free Tier' model
//     // but gemini-3.1-flash is the new 2026 standard if your SDK is updated.
//     model: google("gemini-2.0-flash"),
//     messages: await convertToModelMessages(messages),
//   });

//   // 3. Changed to toDataStreamResponse() - it's more robust for general chat
//   // and handles the conversion from UIMessages automatically.
//  return result.toTextStreamResponse();
// }

// import { groq } from "@ai-sdk/groq";
// import { streamText, convertToModelMessages, tool } from "ai";
// import { z } from "zod";

// // Helper function defined at the top level to clear variable errors
// async function createResource({ content }: { content: string }) {
//   console.log("Saving to knowledge base:", content);
//   return { success: true, message: "Resource added successfully." };
// }

// export async function POST(req: Request) {
//   try {
//     const { messages } = await req.json();

//     // STRICT FLATTENING: Ensures every message content is a plain string for Groq
//     const modelMessages = (await convertToModelMessages(messages)).map(
//       (msg) => {
//         let flattenedContent = "";

//         if (typeof msg.content === "string") {
//           flattenedContent = msg.content;
//         } else if (Array.isArray(msg.content)) {
//           flattenedContent = msg.content
//             .map((part) => ("text" in part ? part.text : ""))
//             .join("\n");
//         }

//         return {
//           ...msg,
//           content: flattenedContent || " ", // Fallback to non-empty string
//         };
//       },
//     );

//     const result = await streamText({
//       model: groq("llama-3.3-70b-versatile"), // Stable 2026 Groq ID
//       system:
//         "You are a helpful assistant. Use 'addResource' to save information.",
//       messages: modelMessages,
//       tools: {
//         addResource: tool({
//           description: "add a resource to your knowledge base.",
//           inputSchema: z.object({
//             content: z.string().describe("the content to add"),
//           }),
//           execute: async ({ content }) => createResource({ content }),
//         }),
//       },
//       maxSteps: 5, // Allows tool calling + final response in one request
//     });

//     // Modern streaming protocol for Vercel AI SDK 3.1+
//     return result.toDataStreamResponse();
//   } catch (error) {
//     console.error("Critical Agent Error:", error);
//     return new Response(JSON.stringify({ error: "Internal Server Error" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }
