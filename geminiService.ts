
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const getGeminiHelp = async (prompt: string) => {
  if (!API_KEY) return "API Key not configured.";
  
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "أنت خبير في قطاع المقاولات والإنشاءات في الشرق الأوسط. ساعد المقاولين في صياغة تفاصيل مشاريعهم بشكل احترافي أو تحليل العطاءات.",
        temperature: 0.7,
      },
    });
    return response.text || "لم يتم استلام رد.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "حدث خطأ أثناء الاتصال بالذكاء الاصطناعي.";
  }
};
