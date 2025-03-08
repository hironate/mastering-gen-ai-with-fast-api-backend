import { ChatOpenAI } from '@langchain/openai';

const openai = new ChatOpenAI({
  modelName: 'gpt-4o',
  apiKey: process.env.OPENAI_API_KEY,
  temperature: 0.2,
});

export default openai;
