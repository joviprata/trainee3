# Tarefa 9 - Pipes e Validators

Implementação de Pipes e Validators com NestJS. Esta projeto foi feito de forma semelhante ao projeto da [Tarefa-7](https://github.com/joviprata/trainee3/tree/Tarefa-7-Joao-Victor-Prata/Joao-Victor-Prata/Tarefa-7), desta vez utilizando o Postgres ao invés do SQLite para persistência de dados.

## Instalação
Para instalar e rodar este projeto, clone este repositório e navegue para a pasta do projeto ([projeto_pipes](https://github.com/joviprata/trainee3/tree/Tarefa-9-Joao-Victor-Prata/Joao-Victor-Prata/Tarefa-9/projeto_pipes)). Siga as instruções apresentadas no [README.md gerado pelo NestJS](https://github.com/joviprata/trainee3/tree/Tarefa-9-Joao-Victor-Prata/Joao-Victor-Prata/Tarefa-9/projeto_pipes#readme).

## SQL Tabela clientes
O seguinte SQL Query foi executado para criar a tabela "clientes":

```bash
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);
```

<p align="center">
    <img width="1488" height="754" alt="Tabela Clientes (DBeaver)" src="https://github.com/user-attachments/assets/53b4454c-6356-40f5-8abf-00d538e79580" />
</p>
