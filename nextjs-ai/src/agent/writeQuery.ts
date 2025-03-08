import { z } from 'zod';
import openai from '../services/openai';
import db from '../utils/db';
import getQueryPromptTemplate from './prompt';
import { InputStateAnnotation } from './state';

const queryOutput = z.object({
  query: z.string().describe('Syntactically valid SQL query.'),
});

const structuredLlm = openai.withStructuredOutput(queryOutput);

const writeQuery = async (state: typeof InputStateAnnotation.State) => {
  const queryPromptTemplate = await getQueryPromptTemplate();
  const datasource = await db;
  const promptValue = await queryPromptTemplate.invoke({
    dialect: datasource.appDataSourceOptions.type,
    top_k: 10,
    table_info: await datasource.getTableInfo(),
    input: state.question,
  });
  console.log({ promptValue });
  const result = await structuredLlm.invoke(promptValue);
  console.log({ result });
  return { query: result.query };
};

export default writeQuery;
