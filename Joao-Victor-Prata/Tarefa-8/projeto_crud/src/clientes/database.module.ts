import { Module } from '@nestjs/common';
import Database from 'better-sqlite3';

@Module({
  providers: [
    {
      provide: 'DB',
      useFactory: (): Database.Database => {
        const db = new Database('fgv_tarefa8.db');

        db.exec(`
          CREATE TABLE IF NOT EXISTS clientes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE
          );
        `);

        return db;
      },
    },
  ],
  exports: ['DB'],
})
export class DatabaseModule {}
