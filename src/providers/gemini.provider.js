export class GeminiProvider {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    this.model = "gemini-3.6-flash";
    this.baseUrl = "https://generativelanguage.googleapis.com/v1beta/models";

    if (!this.apiKey) {
      throw new Error("GEMINI_API_KEY is not configured");
    }
  }

  async generate(prompt) {
    const url = `${this.baseUrl}/${this.model}:generateContent`;

    const response = await fetch(url, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": this.apiKey,
      },

      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `Gemini API error ${response.status}: ${data.error?.message}`,
      );
    }

    return data.candidates[0].content.parts[0].text;
  }
}
