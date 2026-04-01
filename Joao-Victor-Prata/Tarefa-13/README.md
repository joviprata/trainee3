# Tarefa 13 - Projeto CRUD

Implementação de um projeto CRUD de estudos com front-end e back-end.<br/>
A ideia proposta para este projeto é providenciar um sistema de estudos realizados por estudantes do ensino fundamental, correspondendo ao seguinte cenário:

```
COMO aluno do ensino fundamental,
QUERO registrar minhas anotações feitas em sala e avaliar meu desempenho,
PARA identificar quais áreas preciso melhorar.
```

## Tecnologias utilizadas:

### Front-end
- Angular
- Bootstrap
- TypeScript

### Back-end
- Node.js
- NestJS
- TypeORM

### Banco de dados
- PostgreSQL

## Como rodar o projeto
Para instalar e rodar este projeto, clone este repositório e navegue para a pasta [frontend](https://github.com/joviprata/trainee3/tree/Tarefa-13-Joao-Victor-Prata/Joao-Victor-Prata/Tarefa-13/projeto-crud/frontend) e [backend](https://github.com/joviprata/trainee3/tree/Tarefa-13-Joao-Victor-Prata/Joao-Victor-Prata/Tarefa-13/projeto-crud/backend) do projeto. Em cada uma delas, instale as dependências com:


```bash
npm install
```

Depois, ainda em cada pasta, inicie o projeto com:

```bash
npm start
```

## Configuração do banco
Certifique-se de ter um PostgreSQL rodando. Configure as variáveis no backend usando .env (host, port, username, password, database).

O banco de dados foi criado com o seguinte query:


```sql
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE provas (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	nome VARCHAR(255) NOT NULL,
	data_prova TIMESTAMP NOT NULL
);

CREATE TABLE estudos (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	conteudo VARCHAR(255) NOT NULL,
	anotacoes TEXT,
	materia VARCHAR(100) NOT NULL,
	professor VARCHAR(255),
	dificuldade INTEGER NOT NULL,

	prova_id UUID,
	CONSTRAINT fk_prova
		FOREIGN KEY (prova_id)
		REFERENCES provas(id)
		ON DELETE SET NULL
);

CREATE TABLE datas_estudo (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	estudo_id UUID NOT NULL,
	data_estudo DATE NOT NULL,

	CONSTRAINT fk_estudo
		FOREIGN KEY (estudo_id)
		REFERENCES estudos(id)
		ON DELETE CASCADE
);
```


## Imagens do projeto


<p align="center">
  <img width="1920" height="1080" alt="Form" src="https://github.com/user-attachments/assets/9ff14a33-a13d-4ad4-96ed-0972556e3940" />
</p>
<p align="center">
  <img width="1920" height="1080" alt="Resultado Form" src="https://github.com/user-attachments/assets/40abc810-8bdb-41a4-9111-b597e7a5952c" />
</p>
<p align="center">
  <img width="1920" height="1080" alt="Form" src="https://github.com/user-attachments/assets/d46e72f6-0e73-4779-b685-84e889f7700f" />
</p>
<p align="center">
  <img width="1920" height="1080" alt="Form" src="https://github.com/user-attachments/assets/48b239a3-7a78-4632-b128-84d2a7976af3" />
</p>
<p align="center">
  <img width="1920" height="1080" alt="Form" src="https://github.com/user-attachments/assets/c23f68a7-3375-45a5-b0e7-6222d5967482" />
</p>
