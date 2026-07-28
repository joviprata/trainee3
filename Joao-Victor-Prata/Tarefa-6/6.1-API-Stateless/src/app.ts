import express from 'express';
import type { NextFunction, Request, Response } from 'express';
import 'dotenv/config';

const app = express();
const port = 3000;

interface Usuario {
    token: string;
    id: number;
    nome: string;
};

const usuarios: Record<string, Usuario> = {
  [process.env.TOKEN_USUARIO_ADMIN_1 as string]: {
    token: process.env.TOKEN_USUARIO_ADMIN_1 as string,
    id: 1,
    nome: 'Jovi',
  },
};

let clientes = [
    { id: 1, nome: 'Péricles', email: 'pericles@gmail.com'},
    { id: 2, nome: 'Reinaldo', email: 'reinaldo@gmail.com'},
    { id: 3, nome: 'Gertrudes', email: 'gertrudes@gmail.com'},
    { id: 4, nome: 'Eclair', email: 'eclair@gmail.com'},
    { id: 5, nome: 'Jurandir', email: 'jurandir@gmail.com'},
    { id: 6, nome: 'Epaminondas', email: 'epaminondas@gmail.com'},
    { id: 7, nome: 'Geremias', email: 'geremias@gmail.com'},
    { id: 8, nome: 'Adelaide', email: 'adelaide@gmail.com'},
];


// Autenticação:
function authUsuario(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({error: "Usuário não autenticado: faltando credenciais"});
    };

    const token = authHeader.replace('ApiKey ', '');

    const user = usuarios[token];

    if (!user) {
        return res.status(401).send({error: "Usuário não encontrado"});
    };

    next();
};


app.use(express.json()); // Middleware que traduz o body do request para JSON


app.post('/clientes', authUsuario, (req: Request, res: Response) => { // CREATE
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


app.get('/clientes', authUsuario, (req: Request, res: Response) => { // READ
    res.status(200).send(clientes); // Ler informações sobre todos os clientes
});


app.get('/clientes/:id', authUsuario, (req: Request, res: Response) => { // READ
    // Ler informações sobre cliente com id específico:
    const { id } = req.params; 
    const clienteSelecionado = clientes.find(cliente => cliente.id === Number(id));
    
    if (!clienteSelecionado) {
        return res.status(404).send({error: "Cliente não encontrado"});
    };

    return res.status(200).send(clienteSelecionado);
});


app.put('/clientes/:id', authUsuario, (req: Request, res: Response) => { // UPDATE
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


app.patch('/clientes/:id', authUsuario, (req: Request, res: Response) => { // UPDATE
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


app.delete('/clientes/:id', authUsuario, (req: Request, res: Response) => { // DELETE
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
