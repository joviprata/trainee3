# Tarefa 8 - Migração de TypeORM para SQLite puro

Implementação de um CRUD de clientes com NestJS, usando DtoS e SQLite para persistir dados no banco de dados.<br/>Esta tarefa é uma variação da [Tarefa-7](https://github.com/joviprata/trainee3/tree/Tarefa-7-Joao-Victor-Prata/Joao-Victor-Prata/Tarefa-7), desenvolvendo o projeto com SQLite puro ao invés de usar o framework TypeORM.<br/>Para testes de API foi utilizado o Postman, e para visualizar os dados foi utilizado o DBeaver.

## Instalação
Para instalar e rodar este projeto, clone este repositório e navegue para a pasta do projeto ([projeto_crud](https://github.com/joviprata/trainee3/tree/Tarefa-8-Joao-Victor-Prata/Joao-Victor-Prata/Tarefa-8/projeto_crud)). Siga as instruções apresentadas no [README.md gerado pelo NestJS](https://github.com/joviprata/trainee3/tree/Tarefa-8-Joao-Victor-Prata/Joao-Victor-Prata/Tarefa-8/projeto_crud#readme).

## SQL Tabela clientes
O seguinte SQL Query foi executado para criar a tabela "clientes":

```bash
CREATE TABLE clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
);
```

<p align="center">
    <img width="1488" height="754" alt="Tabela Clientes (DBeaver)" src="https://github.com/user-attachments/assets/e334acac-3f0a-497a-af0f-b47e21c2970a" />
</p>
