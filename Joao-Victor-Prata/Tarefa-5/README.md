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
### GET (listar todos):
<p align= "center">  
  <img width="1920" height="1080" alt="Postman - GET (listar todos)" src="https://github.com/user-attachments/assets/726bf4b0-7a1c-4066-be54-571e436668e4" />
<p/>

### GET (buscar por id):
<p align= "center">  
  <img width="1920" height="1080" alt="Postman - GET (buscar por id)" src="https://github.com/user-attachments/assets/8c408e7b-e6e5-44b5-a228-83e6def0231b" />
<p/>

### POST:
<p align= "center">  
  <img width="1920" height="1080" alt="Postman - POST" src="https://github.com/user-attachments/assets/ab25b9b2-b9b7-4b15-a0c0-e3e1c0f454dd" />
<p/>

### PUT:
<p align= "center">  
  <img width="1920" height="1080" alt="Postman - PUT" src="https://github.com/user-attachments/assets/a020d6d6-b62a-468b-9cb5-43b978d795eb" />
<p/>

### PATCH:
<p align= "center">  
  <img width="1920" height="1080" alt="Postman - PATCH" src="https://github.com/user-attachments/assets/27fe483e-c7fb-488a-91bc-cfde022ad35a" />
<p/>

### DELETE:
<p align= "center">  
  <img width="1920" height="1080" alt="Postman - DELETE" src="https://github.com/user-attachments/assets/7cb2ef62-e38c-47c1-b74f-6acaaa91e2c2" />
<p/>
