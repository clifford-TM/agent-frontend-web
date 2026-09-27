import express from "express";

import { GeminiProvider } from "./providers/gemini.provider.js";
import { CodeGenerationService } from "./services/code-generation.service.js";

const app = express();

app.use(express.json());

const provider = new GeminiProvider();
const codeGenerationService = new CodeGenerationService(provider);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/generate", async (req, res) => {
  try {
    const { task } = req.body;

    if (!task) {
      return res.status(400).json({
        error: "Task is required",
      });
    }

    const result = await codeGenerationService.generateFrontend(task);

    res.json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to generate frontend code",
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
