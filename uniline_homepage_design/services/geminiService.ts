
import { GoogleGenAI } from "@google/genai";
import { Lang } from "../translations";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIGreeting = async (name: string, lang: Lang) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a short, professional, and welcoming one-sentence greeting for a website visitor as if from the AI assistant of a digital studio named ${name}. 
      The greeting should sound futuristic and innovative.
      The output MUST be in ${lang === 'zh' ? 'Chinese' : 'English'}.`,
    });
    return response.text || (lang === 'zh' ? "欢迎来到 UNILINE 数字空间。" : "Welcome to the UNILINE digital space.");
  } catch (error) {
    console.error("Gemini Error:", error);
    return lang === 'zh' ? `欢迎访问 UNILINE 作品集。` : `Welcome to the UNILINE portfolio.`;
  }
};

export const getAICommentResponse = async (comment: string, lang: Lang) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are the official AI representative of UNILINE Studio. 
      A visitor left a comment on our guestbook: "${comment}". 
      Write a short, professional, and appreciative one-sentence reply.
      The output MUST be in ${lang === 'zh' ? 'Chinese' : 'English'}.`,
    });
    return response.text || (lang === 'zh' ? "感谢您的关注与反馈。" : "Thank you for your interest and feedback.");
  } catch (error) {
    console.error("Gemini Error:", error);
    return lang === 'zh' ? "感谢留言。" : "Thanks for reaching out.";
  }
};
