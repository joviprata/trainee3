# Tarefa 7 - CRUD com NestJS usando DtoS e SQLite

Implementação de um CRUD de clientes com NestJS, usando DtoS e SQLite para persistir dados no banco de dados.<br/>Para testes de API foi utilizado o Postman, e para visualizar os dados foi utilizado o DBeaver.

## Instalação
Para instalar e rodar este projeto, clone este repositório e navegue para a pasta do projeto ([projeto_crud](https://github.com/joviprata/trainee3/tree/Tarefa-7-Joao-Victor-Prata/Joao-Victor-Prata/Tarefa-7/projeto_crud)). Siga as instruções apresentadas no [README.md gerado pelo NestJS](https://github.com/joviprata/trainee3/tree/Tarefa-7-Joao-Victor-Prata/Joao-Victor-Prata/Tarefa-7/projeto_crud#readme).

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
    <img width="1488" height="754" alt="Tabela Clientes (DBeaver)" src="https://github.com/user-attachments/assets/64f78ba3-4713-4ad5-827a-55ac7b784e35" />
</p>
