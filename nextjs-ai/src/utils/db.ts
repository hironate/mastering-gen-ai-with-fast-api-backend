import { SqlDatabase } from 'langchain/sql_db';
import { DataSource } from 'typeorm';

const datasource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'dvdrental',
});

const db = SqlDatabase.fromDataSourceParams({
  appDataSource: datasource,
});

export default db;
