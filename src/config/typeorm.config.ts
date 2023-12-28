import { resolve } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { pgConfig } from '../env';

console.log({
  __dirname,
  migrations: resolve(__dirname, '../database/migrations/**/*{.js,.ts}'),
});

export const typeOrmConfig: PostgresConnectionOptions = {
  type: 'postgres',
  ssl: pgConfig.PG_SSL,
  host: pgConfig.PG_HOST,
  port: pgConfig.PG_PORT,
  username: pgConfig.PG_USER,
  database: pgConfig.PG_DATABASE,
  password: pgConfig.PG_PASSWORD,
  synchronize: false,
  entities: ['dist/database/entities/**/*{.js,.ts}'],
  migrations: ['dist/database/migrations/**/*{.js,.ts}'],
  namingStrategy: new SnakeNamingStrategy(),
};
