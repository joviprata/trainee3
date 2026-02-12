import { Inject, Injectable } from '@nestjs/common';
import Database from 'better-sqlite3';
import { Cliente } from './entities/cliente.entity';

@Injectable()
export class ClientesRepository {
  constructor(
    @Inject('DB')
    private db: Database.Database,
  ) {}

  find(): Cliente[] {
    return this.db.prepare('SELECT * FROM clientes').all() as Cliente[];
  }

  findOneBy(where: { id?: number; email?: string }): Cliente | null {
    if (where.id) {
      return (
        this.db
          .prepare<number, Cliente>('SELECT * FROM clientes WHERE id = ?')
          .get(where.id) ?? null
      );
    }

    if (where.email) {
      return (
        this.db
          .prepare<string, Cliente>('SELECT * FROM clientes WHERE email = ?')
          .get(where.email) ?? null
      );
    }

    return null;
  }

  create(data: Partial<Cliente>): Cliente {
    return data as Cliente;
  }

  save(cliente: Partial<Cliente>): Cliente {
    if (cliente.id) {
      const fields: string[] = [];
      const values: (string | number)[] = [];

      if (cliente.nome !== undefined) {
        fields.push('nome = ?');
        values.push(cliente.nome);
      }

      if (cliente.email !== undefined) {
        fields.push('email = ?');
        values.push(cliente.email);
      }

      const sql = `UPDATE clientes SET ${fields.join(', ')} WHERE id = ?`;
      values.push(cliente.id);

      this.db.prepare(sql).run(...values);

      return this.findOneBy({ id: cliente.id })!;
    } else {
      const resultado = this.db
        .prepare('INSERT INTO clientes (nome, email) VALUES (?, ?)')
        .run(cliente.nome, cliente.email);

      return this.findOneBy({ id: Number(resultado.lastInsertRowid) })!;
    }
  }

  delete(id: number): { affected: number } {
    const resultado = this.db
      .prepare('DELETE FROM clientes WHERE id = ?')
      .run(id);

    return { affected: resultado.changes };
  }
}
