import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables for local testing (platform does this automatically)
dotenv.config();

const app = express();
const PORT = 3000;

// Set up server options
app.use(express.json());

// Lazy-initialize GoogleGenAI to prevent crashing at startup if the API key is missing
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// REST Backend API routes FIRST
app.post("/api/generate-blueprint", async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const { businessName, industry, growthGoal, targetAudience, currentChallenges } = req.body;

    if (!businessName || !industry || !growthGoal) {
      res.status(400).json({ error: "Missing required fields: businessName, industry, or growthGoal" });
      return;
    }

    const ai = getGeminiClient();

    // Use gemini-3.5-flash as default for structured text requests
    const systemPrompt = `You are Pandurang Chalak, Performance Marketing Consultant and the founder of ScaleWithPC, a premium, ROI-driven growth agency. 
Your goal is to generate a highly professional, realistic, and actionable performance marketing and business growth blueprint.
Ensure the response is tailored and deeply realistic for their specific industry and growth goals—never generic "slop". Make it custom and highly actionable.`;

    const prompt = `Generate a comprehensive business growth and performance marketing blueprint for:
Business Name: ${businessName}
Industry: ${industry}
Growth Goal: ${growthGoal}
Target Audience: ${targetAudience || "General demographic relevant to " + industry}
Current Challenges: ${currentChallenges || "Not specified - focus on rapid market entry and scaling"}

Please return the blueprint as a strict JSON object structure with the following keys:
- targetPersona: An object with a "name", "demographic", "painPoints" (array of strings), and "buyingTrigger".
- metaAdsStrategy: An object describing the ad structure across:
   - "tof": Top of Funnel campaign title, targeting strategy, and creative focus.
   - "mof": Middle of Funnel campaign title, retargeting list, and dynamic offer.
   - "bof": Bottom of Funnel campaign title, urgent call to action, and social proof angle.
- creativeConcept: An object describing one high-converting ad creative with fields "type" (Image, Video, Carousel), "hookMessage", "primaryText", "visualMockupPrompt".
- aiGrowthLever: A precise recommendation for using AI automation in their business (e.g. WhatsApp Automation, AI Customer Research, Lead follow-up) with "automationGoal" and "stepsToImplement" (array of strings).
- predictedMetrics: An object with "estimatedCplRange" (e.g. "$12-$15" or "Rs. 250-350"), "suggestedMonthlyBudget" (suggested currency-fit or dollar range), "expectedConversionRate" (percentage), and "estimatedRoiMultiple" (e.g. "3.5x").
- customConsultantNote: A direct, warm, expert paragraph signed off by "Pandurang Chalak, ScaleWithPC".`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["targetPersona", "metaAdsStrategy", "creativeConcept", "aiGrowthLever", "predictedMetrics", "customConsultantNote"],
          properties: {
            targetPersona: {
              type: Type.OBJECT,
              required: ["name", "demographic", "painPoints", "buyingTrigger"],
              properties: {
                name: { type: Type.STRING },
                demographic: { type: Type.STRING },
                painPoints: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                buyingTrigger: { type: Type.STRING }
              }
            },
            metaAdsStrategy: {
              type: Type.OBJECT,
              required: ["tof", "mof", "bof"],
              properties: {
                tof: {
                  type: Type.OBJECT,
                  required: ["campaignName", "targeting", "concept"],
                  properties: {
                    campaignName: { type: Type.STRING },
                    targeting: { type: Type.STRING },
                    concept: { type: Type.STRING }
                  }
                },
                mof: {
                  type: Type.OBJECT,
                  required: ["campaignName", "retargeting", "offer"],
                  properties: {
                    campaignName: { type: Type.STRING },
                    retargeting: { type: Type.STRING },
                    offer: { type: Type.STRING }
                  }
                },
                bof: {
                  type: Type.OBJECT,
                  required: ["campaignName", "cta", "socialProof"],
                  properties: {
                    campaignName: { type: Type.STRING },
                    cta: { type: Type.STRING },
                    socialProof: { type: Type.STRING }
                  }
                }
              }
            },
            creativeConcept: {
              type: Type.OBJECT,
              required: ["type", "hookMessage", "primaryText", "visualMockupPrompt"],
              properties: {
                type: { type: Type.STRING },
                hookMessage: { type: Type.STRING },
                primaryText: { type: Type.STRING },
                visualMockupPrompt: { type: Type.STRING }
              }
            },
            aiGrowthLever: {
              type: Type.OBJECT,
              required: ["automationGoal", "stepsToImplement"],
              properties: {
                automationGoal: { type: Type.STRING },
                stepsToImplement: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                }
              }
            },
            predictedMetrics: {
              type: Type.OBJECT,
              required: ["estimatedCplRange", "suggestedMonthlyBudget", "expectedConversionRate", "estimatedRoiMultiple"],
              properties: {
                estimatedCplRange: { type: Type.STRING },
                suggestedMonthlyBudget: { type: Type.STRING },
                expectedConversionRate: { type: Type.STRING },
                estimatedRoiMultiple: { type: Type.STRING }
              }
            },
            customConsultantNote: { type: Type.STRING }
          }
        }
      }
    });

    let textOutput = response.text;
    if (!textOutput) {
      throw new Error("No response output generated from Gemini model.");
    }

    // Clean markdown code block boundaries robustly
    textOutput = textOutput.trim();
    if (textOutput.startsWith("```")) {
      // Remove opening backticks
      textOutput = textOutput.replace(/^```(?:json)?/i, "").trim();
      // Remove closing backticks
      textOutput = textOutput.replace(/```$/, "").trim();
    }

    let payload: any;
    try {
      payload = JSON.parse(textOutput);
    } catch (parseError: any) {
      console.error("Direct JSON parse failed, attempting regex search of json block. Text output length:", textOutput.length);
      // Fallback regex to extract anything between { and }
      const jsonMatch = textOutput.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          payload = JSON.parse(jsonMatch[0]);
        } catch (regexParseError: any) {
          throw new Error("Failed to parse AI structure. Raw text: " + textOutput.substring(0, 200) + "...");
        }
      } else {
        throw new Error("Unable to reconstruct structural data. Raw text: " + textOutput.substring(0, 200) + "...");
      }
    }

    // Ensure all mandatory fields exist (guarantees no undefined runtime fields on front-end)
    const securePayload = {
      targetPersona: {
        name: payload?.targetPersona?.name || "Premium High-Value Consumer",
        demographic: payload?.targetPersona?.demographic || "Aged 28-50, regional urban professionals & decision makers",
        painPoints: Array.isArray(payload?.targetPersona?.painPoints) && payload.targetPersona.painPoints.length > 0
          ? payload.targetPersona.painPoints
          : ["High acquisition costs", "Inefficient marketing funnel leaks", "Inconsistent lead flow quality"],
        buyingTrigger: payload?.targetPersona?.buyingTrigger || "A clear, trust-inducing proof-of-work and dynamic local conversion funnel."
      },
      metaAdsStrategy: {
        tof: {
          campaignName: payload?.metaAdsStrategy?.tof?.campaignName || "TOF - Broad Prospecting - " + businessName,
          targeting: payload?.metaAdsStrategy?.tof?.targeting || "Pune & lookalike audience clusters + specific high-intent interest stacks",
          concept: payload?.metaAdsStrategy?.tof?.concept || "Visual validation hook and direct case-study value-add."
        },
        mof: {
          campaignName: payload?.metaAdsStrategy?.mof?.campaignName || "MOF - Lead Engagers Retargeting",
          retargeting: payload?.metaAdsStrategy?.mof?.retargeting || "Engaged with Instagram/Facebook ad creatives in last 60 days",
          offer: payload?.metaAdsStrategy?.mof?.offer || "Tailored industry ROI catalog or limited session audits invitation."
        },
        bof: {
          campaignName: payload?.metaAdsStrategy?.bof?.campaignName || "BOF - Direct Response Conversions",
          cta: payload?.metaAdsStrategy?.bof?.cta || "Secure your audit session inside the priority queue",
          socialProof: payload?.metaAdsStrategy?.bof?.socialProof || "Verified Pune leader metrics and testimonial showcase loops."
        }
      },
      creativeConcept: {
        type: payload?.creativeConcept?.type || "Video",
        hookMessage: payload?.creativeConcept?.hookMessage || `Stop wasting marketing budgets on vanity metrics—here's how we scale real Pune brands with performance engines.`,
        primaryText: payload?.creativeConcept?.primaryText || `Are you struggling with cold lead pipelines or astronomical advertising spent? Pandurang Chalak's ScaleWithPC builds high-converting Meta campaigns and CRM automation systems that work. Get your custom priority blueprint.`,
        visualMockupPrompt: payload?.creativeConcept?.visualMockupPrompt || "A clean, dark high-contrast editorial overlay showing conversion statistics, 3.5x ROI metrics, with subtle orange light styling."
      },
      aiGrowthLever: {
        automationGoal: payload?.aiGrowthLever?.automationGoal || "Install Automated WhatsApp Lead Capture + AI Assistant CRM",
        stepsToImplement: Array.isArray(payload?.aiGrowthLever?.stepsToImplement) && payload.aiGrowthLever.stepsToImplement.length > 0
          ? payload.aiGrowthLever.stepsToImplement
          : [
              "Connect automatic Meta Lead Gen Form hook using Zapier webhook trigger",
              "Execute automated WhatsApp greeting dispatcher within 90 seconds of lead creation",
              "Qualify with personalized AI chatbot logic before routing to Pandurang Chalak priority calendar queue"
            ]
      },
      predictedMetrics: {
        estimatedCplRange: payload?.predictedMetrics?.estimatedCplRange || (industry === "Real Estate" ? "Rs. 350 - Rs. 650" : "Rs. 180 - Rs. 320"),
        suggestedMonthlyBudget: payload?.predictedMetrics?.suggestedMonthlyBudget || (industry === "Real Estate" ? "Rs. 1,50,000 - Rs. 3,00,000" : "Rs. 75,000 - Rs. 1,50,000"),
        expectedConversionRate: payload?.predictedMetrics?.expectedConversionRate || "3.5%",
        estimatedRoiMultiple: payload?.predictedMetrics?.estimatedRoiMultiple || "3.8x"
      },
      customConsultantNote: payload?.customConsultantNote || `I've audited your entry parameters for ${businessName}. This growth strategy leverages precise regional prospecting hooks combined with prompt WhatsApp qualification automation. Let's optimize your direct-response marketing pipeline. — Pandurang Chalak, ScaleWithPC.`
    };

    res.json(securePayload);
  } catch (error: any) {
    console.error("Error generating marketing blueprint:", error);
    res.status(500).json({
      error: "Failed to generate growth blueprint.",
      details: error.message || String(error),
    });
  }
});

// Configure Vite integration
async function main() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

main().catch((err) => {
  console.error("Vite server initialization error:", err);
});
