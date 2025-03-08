import { QuerySqlTool } from 'langchain/tools/sql';
import { StateAnnotation } from './state';
import db from '../utils/db';
const executeQuery = async (state: typeof StateAnnotation.State) => {
  const datasource = await db;
  const executeQueryTool = new QuerySqlTool(datasource);
  return { result: await executeQueryTool.invoke(state.query) };
};

export default executeQuery;
