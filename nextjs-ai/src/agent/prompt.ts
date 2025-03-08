import { pull } from 'langchain/hub';
import { ChatPromptTemplate } from '@langchain/core/prompts';

async function getQueryPromptTemplate() {
  return await pull<ChatPromptTemplate>('langchain-ai/sql-query-system-prompt');
}

export default getQueryPromptTemplate;
