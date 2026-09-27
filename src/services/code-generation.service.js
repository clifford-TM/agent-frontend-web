export class CodeGenerationService {
  constructor(provider) {
    this.provider = provider;
  }

  async generateFrontend(task) {
    const prompt = `
You are a frontend software development agent.

Your task is:
${task}

Generate the frontend files necessary to complete the task.

Return ONLY valid JSON using exactly this structure:

{
    "summary": "Short description of the implemented changes",
    "files": [
        {
            "path": "path/to/file",
            "content": "complete file content"
        }
    ]
}

Rules:
- Do not use Markdown.
- Do not wrap the response in code blocks.
- Return only valid JSON.
- Each file must contain its complete content.
- Use appropriate HTML, CSS and JavaScript when necessary.
`;

    const response = await this.provider.generate(prompt);

    return JSON.parse(response);
  }
}
