import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

export const generateAssistantResponse = async (userMessage: string): Promise<string> => {
  if (!apiKey) return "عذراً، خدمة الذكاء الاصطناعي غير متوفرة حالياً. (Missing API Key)";

  try {
    // Using Flash Lite for low-latency responses as requested
    const model = "gemini-2.5-flash-lite"; 
    const systemInstruction = `
      You are "Oki-Bot", a smart, friendly, and futuristic AI assistant for "Oki-Store", an Egyptian e-commerce brand selling Smart Home Devices, Gadgets, and Mobile Accessories.
      
      Tone: Professional, Tech-savvy, helpful, and uses Egyptian Arabic slang occasionally (mix of Modern Standard Arabic and Egyptian).
      
      Your capabilities:
      1. Recommend products based on user needs (Smart Home, Kitchen, Mobile Accessories).
      2. Compare products.
      3. Answer questions about shipping (30 days refund, 24/7 support, Cash on Delivery).
      
      If asked about prices, give approximate ranges or say "check the product page".
      Keep responses concise and engaging.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: userMessage,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "آسف، لم أستطع فهم ذلك.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "حدث خطأ في الاتصال بالخادم الذكي.";
  }
};

export const generateArticleContent = async (topic: string): Promise<{title: string, content: string}> => {
    if (!apiKey) return { title: "Error", content: "Missing API Key" };

    try {
        // Using Gemini 3 Pro for complex content generation tasks
        const model = "gemini-3-pro-preview";
        const prompt = `
            Write a short, engaging blog post (article) for Oki-Store about: "${topic}".
            Language: Egyptian Arabic (Slang/Friendly).
            Style: Futuristic, Tech-focused, Exciting.
            Structure:
            1. Catchy Title.
            2. Short introduction.
            3. 3-4 Bullet points of benefits/tips.
            4. Conclusion.
            
            Return the result as JSON with keys: "title" and "content".
        `;

        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                // High thinking budget for creative writing
                thinkingConfig: { thinkingBudget: 1024 }
            }
        });

        const text = response.text || "{}";
        return JSON.parse(text);

    } catch (error) {
        console.error("Article Gen Error:", error);
        return { title: "Error", content: "Failed to generate article." };
    }
}