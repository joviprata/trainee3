# Tarefa 5 - API RESTful: Stateless para Stateful
Aplicação de princípios de API RESTful no projeto desenvolvido na Tarefa-4 (um CRUD sobre entidade Clientes utilizando o Express).<br/>
Duas versões para o projeto foram feitas: [Stateless](https://github.com/joviprata/trainee3/tree/Joao-Victor-Prata/Joao-Victor-Prata/Tarefa-5/5.1-API-Stateless) e [Stateful](https://github.com/joviprata/trainee3/tree/Joao-Victor-Prata/Joao-Victor-Prata/Tarefa-5/5.2-API-Stateful).<br/>
A versão **Stateless** exige que o usuário acessando a API informe o token de acesso em todas as requisições que fizer.<br/>
  A versão **Stateful**, por outro lado, exige que o usuário faça autenticação apenas uma vez, fazendo uma requisição POST/login e informando o nome e senha. Quando autenticado, o usuário consegue realizar todas as requisições que quiser sem que o sistema exija novamente as credenciais dele. Para deslogar, o usuário pode fazer requisição POST/logout ou simplesmente finalizar a sessão interrompendo o código pelo terminal. Esta versão utiliza cookies de navegação para que o sistema possa armazenar informações do usuário. 

## Instalação
Para instalar e rodar este projeto, clone este repositório e navegue para a pasta do projeto (Stateless ou Stateful). Instale as dependências rodando o seguinte comando no terminal:

```npm install```

Em seguida, rode o seguinte comando no terminal para iniciar o aplicativo:

```npm start```

## Debug do API
Foi utilizado o Postman para realizar testes de requests de API.<br/>
Além disso, foi instalado o Nodemon para reiniciar o servidor automaticamente quando o código é alterado, facilitando o desenvolvimento do projeto ( ```npm run dev``` ).

## Rotas

### POST (login):
<p align= "center">  
  <img width="1920" height="1080" alt="Postman - POST (login)" src="https://github.com/user-attachments/assets/45f08821-9c11-4da8-9e93-0b96339affd2" />
<p/>
  
### GET (listar todos):
<p align= "center">  
  <img width="1920" height="1080" alt="Postman - GET (listar todos)" src="https://github.com/user-attachments/assets/c58263d3-34a4-461b-9f30-b589a9771d69" />
<p/>

### GET (buscar por id):
<p align= "center">  
  <img width="1920" height="1080" alt="Postman - GET (buscar por id)" src="https://github.com/user-attachments/assets/5497f612-7920-4055-ba0b-188e3798ca59" />
<p/>

### POST:
<p align= "center">  
  <img width="1920" height="1080" alt="Postman - POST" src="https://github.com/user-attachments/assets/3bf5dca4-051b-4c40-918b-6fd44732c16c" />
<p/>

### PUT:
<p align= "center">  
  <img width="1920" height="1080" alt="Postman - PUT" src="https://github.com/user-attachments/assets/1986d954-7d0c-403c-b0d5-3ece2664052e" />
<p/>

### PATCH:
<p align= "center">  
  <img width="1920" height="1080" alt="Postman - PATCH" src="https://github.com/user-attachments/assets/b814b7c6-55de-40b5-9e80-94f0bd92e539" />
<p/>

### DELETE:
<p align= "center">  
  <img width="1920" height="1080" alt="Postman - DELETE" src="https://github.com/user-attachments/assets/e99bc380-615c-4ee4-825c-150b2f883065" />
<p/>

### POST (logout):
<p align= "center">  
  <img width="1920" height="1080" alt="Postman - POST (logout)" src="https://github.com/user-attachments/assets/d4972e2b-3d50-4ff7-900c-bac2a75387d9" />
<p/>
