import { Lang } from "../translations";

/**
 * Static AI service replacements.
 * Gemini SDK removed as per request.
 */

export const getAIGreeting = async (name: string, lang: Lang) => {
  return lang === 'zh' 
    ? "欢迎来到 UNILINE 数字空间，系统已就绪。" 
    : "Welcome to the UNILINE digital space. Systems operational.";
};

export const getAICommentResponse = async (comment: string, lang: Lang) => {
  return lang === 'zh' 
    ? "传输已接收。保持智能，共同构建未来。" 
    : "Transmission received. Stay intelligent and build the future together.";
};