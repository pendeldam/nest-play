import { ConnectionOptions } from 'typeorm';

export default {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'nest-play',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  synchronize: false,
  cli: {
    migrationsDir: 'src/migrations/',
  },
} as ConnectionOptions;
