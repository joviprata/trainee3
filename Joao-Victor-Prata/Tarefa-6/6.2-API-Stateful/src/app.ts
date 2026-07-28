import express from 'express';
import type { Request, Response, NextFunction } from 'express';

import 'dotenv/config';
import crypto from 'crypto';
import cookieParser from 'cookie-parser';

const app = express();
const port = 3000;

interface Usuario {
  id: number;
  nome: string;
  senha: string;
}

const usuarios: Usuario[] = [
    { id: 1, nome: 'Jovi', senha: process.env.SENHA_USUARIO_ADMIN_1 as string }
];


interface Cliente {
  id: number;
  nome: string;
  email: string;
}

let clientes: Cliente[] = [
    { id: 1, nome: 'Péricles', email: 'pericles@gmail.com'},
    { id: 2, nome: 'Reinaldo', email: 'reinaldo@gmail.com'},
    { id: 3, nome: 'Gertrudes', email: 'gertrudes@gmail.com'},
    { id: 4, nome: 'Eclair', email: 'eclair@gmail.com'},
    { id: 5, nome: 'Jurandir', email: 'jurandir@gmail.com'},
    { id: 6, nome: 'Epaminondas', email: 'epaminondas@gmail.com'},
    { id: 7, nome: 'Geremias', email: 'geremias@gmail.com'},
    { id: 8, nome: 'Adelaide', email: 'adelaide@gmail.com'},
];


interface Sessao {
  idUsuario: number;
  nome: string;
}

const sessoes: Record<string, Sessao> = {}; // Sessões de usuários autenticados


app.use(express.json()); // Middleware que traduz o body do request para JSON
app.use(cookieParser());


// Autenticação:
function gerarToken() {
    return crypto.randomBytes(24).toString('hex');
};

function authUsuario(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.idSessao;

    if (!token || !sessoes[token]) {
        return res.status(401).send({error: "Usuário não autenticado"});
    };

    next();
};

app.post('/login', (req, res) => {
    // Autenticação de usuário informando nome e senha:
    const { nome, senha } = req.body;

    if (!nome || !senha) {
        return res.status(400).send({error: "Nome e senha são obrigatórios"});
    };

    const usuario = usuarios.find(usuario => usuario.nome === nome);

    if (!usuario) {
        return res.status(404).send({error: "Usuário não encontrado"});
    };

    if (usuario.senha !== senha) {
        return res.status(401).send({error: "Credenciais inválidas"});
    };

    const token = gerarToken();

    sessoes[token] = {
        idUsuario: usuario.id,
        nome: usuario.nome
    };

    res.cookie('idSessao', token, {
        httpOnly: true // Id da sessão é visto / acessado somente pelo web server
    });

    return res.status(200).send({message: "Usuário autenticado", usuario: nome});
});

app.post('/logout', (req, res) => {
    // Autenticação de usuário informando nome e senha:
    const token = req.cookies.idSessao;

    if (!token || !sessoes[token]) {
        return res.status(401).send({error: "Usuário não autenticado"});
    };

    res.clearCookie('idSessao');

    delete sessoes[token];

    return res.status(200).send({message: 'Usuário foi deslogado'});

});


app.post('/clientes', authUsuario, (req, res) => { // CREATE
    // Criar um cliente novo informando nome e email:
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).send({error: "Nome e e-mail são obrigatórios"});
    };

    const novoCliente = {
        id: clientes.length + 1,
        nome,
        email
    };

    clientes.push(novoCliente);

    return res.status(201).send({message: 'Novo cliente adicionado', cliente: novoCliente});
});


app.get('/clientes', authUsuario, (req, res) => { // READ
    res.status(200).send(clientes); // Ler informações sobre todos os clientes
});


app.get('/clientes/:id', authUsuario, (req, res) => { // READ
    // Ler informações sobre cliente com id específico:
    const { id } = req.params; 
    const clienteSelecionado = clientes.find(cliente => cliente.id === Number(id));
    
    if (!clienteSelecionado) {
        return res.status(404).send({error: "Cliente não encontrado"});
    };

    return res.status(200).send(clienteSelecionado);
});


app.put('/clientes/:id', authUsuario, (req, res) => { // UPDATE
    // Procurar cliente pelo id:
    const { id } = req.params; 
    const clienteSelecionado = clientes.find(cliente => cliente.id === Number(id));
    
    if (!clienteSelecionado) {
        return res.status(404).send({error: "Cliente não encontrado"});
    };

    // Atualizar todos os dados:
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).send({error: "Nome e e-mail são obrigatórios"});
    };

    clienteSelecionado.nome = nome;
    clienteSelecionado.email = email;

    return res.status(200).send({message: 'Dados de cliente foram atualizados', cliente: clienteSelecionado});
});


app.patch('/clientes/:id', authUsuario, (req, res) => { // UPDATE
    // Procurar cliente pelo id:
    const { id } = req.params; 
    const clienteSelecionado = clientes.find(cliente => cliente.id === Number(id));
    
    if (!clienteSelecionado) {
        return res.status(404).send({error: "Cliente não encontrado"});
    };

    // Atualizar um ou mais dados:
    const { nome, email } = req.body;

    if (nome) clienteSelecionado.nome = nome;
    if (email) clienteSelecionado.email = email;

    return res.status(200).send({message: 'Dados de cliente foram atualizados', cliente: clienteSelecionado});
});


app.delete('/clientes/:id', authUsuario, (req, res) => { // DELETE
    // Procurar cliente pelo id:
    const { id } = req.params; 
    const clienteIndex = clientes.findIndex(cliente => cliente.id === Number(id));
    
    if (clienteIndex === -1) {
        return res.status(404).send({error: "Cliente não encontrado"});
    };

    // Deletar cliente do array:
    const clienteDeletado = clientes.splice(clienteIndex, 1)[0]; 

    return res.status(200).send({message: 'Cliente foi deletado', cliente: clienteDeletado});
});


app.listen(port, () => { // Escuta na porta 3000
    console.log(`App escutando na porta ${port} - http://localhost:${port}`);
});
