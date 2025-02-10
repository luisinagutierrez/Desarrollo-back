import { MikroORM, t } from "@mikro-orm/core";
import { MongoHighlighter } from "@mikro-orm/mongo-highlighter";
import dotenv from "dotenv";

dotenv.config();

const DB_NAME =
  process.env.NODE_ENV === "integrationtest"
    ? process.env.DB_NAME_TEST
    : process.env.DB_NAME_DEV;

export const orm = await MikroORM.init({
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  //dbName: 'Ecommerce2023',
  dbName: DB_NAME,
  type: 'mongo',
  clientUrl: 'mongodb://127.0.0.1:27017',
  highlighter: new MongoHighlighter(),
  debug: true,
  allowGlobalContext: true,
  schemaGenerator: { //never in production
    disableForeignKeys: true,
    createForeignKeyConstraints: true,
    ignoreSchema: [],
  }
})

export const syncSchema = async () => {
  const generator = orm.getSchemaGenerator();
  /*
  await generator.dropSchema();
  await generator.createSchema();
  */
  await generator.updateSchema();
}