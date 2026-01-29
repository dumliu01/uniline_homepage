import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Lang } from "../translations";

//const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Simple in-memory cache to prevent redundant calls during a session
const cache: Record<string, string> = {};

// Circuit breaker to prevent spamming the API when quota is exhausted
let quotaExhaustedUntil = 0;

/**
 * Utility to execute functions with exponential backoff retries.
 * Handles 429 (Rate Limit) and transient server errors gracefully.
 */
const withRetry = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 3000
): Promise<T> => {
  if (Date.now() < quotaExhaustedUntil) {
    throw { status: 429, message: 'Circuit breaker active: Quota exhausted' };
  }

  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      return await fn();
    } catch (error: any) {
      attempt++;
      const isQuotaError = error?.status === 429 || error?.message?.includes('429') || error?.message?.includes('RESOURCE_EXHAUSTED');
      const isServerError = error?.status >= 500;

      if (isQuotaError) {
        // If we hit a quota error, set circuit breaker for 60 seconds
        quotaExhaustedUntil = Date.now() + 60000;
      }

      if ((isQuotaError || isServerError) && attempt < maxRetries) {
        const delay = initialDelay * Math.pow(2, attempt - 1);
        console.warn(`Gemini API busy or limited. Retrying in ${delay}ms... (Attempt ${attempt}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
  throw new Error("Max retries exceeded");
};

// export const getAIGreeting = async (name: string, lang: Lang) => {
//   const cacheKey = `greeting_${name}_${lang}`;
//   if (cache[cacheKey]) return cache[cacheKey];

//   const fallback = lang === 'zh' ? "欢迎来到 UNILINE 数字空间。" : "Welcome to the UNILINE digital space.";
  
//   try {
//     const response: GenerateContentResponse = await withRetry(() => ai.models.generateContent({
//       model: 'gemini-3-flash-preview',
//       contents: `Generate a short, professional, and welcoming one-sentence greeting for a website visitor as if from the AI assistant of a digital studio named ${name}. 
//       The greeting should sound futuristic and innovative.
//       The output MUST be in ${lang === 'zh' ? 'Chinese' : 'English'}.`,
//     }));
    
//     const text = (response as any).text?.trim() || fallback;
//     cache[cacheKey] = text;
//     return text;
//   } catch (error) {
//     console.error("Gemini Greeting Error:", error);
//     return fallback;
//   }
// };

// export const getAICommentResponse = async (comment: string, lang: Lang) => {
//   const fallback = lang === 'zh' ? "收到传输。保持智能。" : "Transmission received. Stay intelligent.";
  
//   try {
//     const response: GenerateContentResponse = await withRetry(() => ai.models.generateContent({
//       model: 'gemini-3-flash-preview',
//       contents: `You are the core AI of UNILINE, a futuristic digital studio. 
//       A user left a comment: "${comment}".
//       Write a short, intelligent, and visionary reply to this comment in one sentence.
//       The reply MUST be in ${lang === 'zh' ? 'Chinese' : 'English'}.`,
//     }));
    
//     return (response as any).text?.trim() || fallback;
//   } catch (error) {
//     console.error("Gemini Comment Error:", error);
//     return fallback;
//   }
// };

