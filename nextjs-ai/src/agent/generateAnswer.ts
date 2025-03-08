import { StateAnnotation } from './state';
import openai from '../services/openai';
import { z } from 'zod';

const generateAnswer = async (state: typeof StateAnnotation.State) => {
  const llm = openai.withStructuredOutput(z.object({ answer: z.string() }));
  const promptValue =
    'Given the following user question, corresponding SQL query, ' +
    'and SQL result, answer the user question.\n\n' +
    `Question: ${state.question}\n` +
    `SQL Query: ${state.query}\n` +
    `SQL Result: ${state.result}\n`;
  const response = await llm.invoke(promptValue);
  return { answer: response.answer };
};

export default generateAnswer;
