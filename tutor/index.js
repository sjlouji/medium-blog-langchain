const { Ollama } = require("@langchain/ollama");
const { PromptTemplate } = require("@langchain/core/prompts");

const topic = process.argv[2];

if (!topic) {
  console.log("Provide a topic'");
  process.exit(1);
}

const model = new Ollama({
  model: "gemma3:latest",
  temperature: 0.7,
  maxRetries: 2,
  baseUrl: "http://127.0.0.1:11434", // Forcing to IPV4
});

const prompt = PromptTemplate.fromTemplate(
  "You're a kind and clever teacher. Help me understand {topic} using a fun and simple explanation that even a 5-year-old would enjoy."
);

const chain = prompt.pipe(model);

async function run() {
  const result = await chain.invoke({ topic });
  console.log(result);
}

run().catch(console.error);