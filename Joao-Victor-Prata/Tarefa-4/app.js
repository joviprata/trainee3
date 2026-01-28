import express from 'express';

const app = express();
const port = 3000;

let usuarios = [
    { id: 1, nome: 'Péricles', email: 'pericles@gmail.com'},
    { id: 2, nome: 'Reinaldo', email: 'reinaldo@gmail.com'},
    { id: 3, nome: 'Gertrudes', email: 'gertrudes@gmail.com'},
    { id: 4, nome: 'Eclair', email: 'eclair@gmail.com'},
    { id: 5, nome: 'Jurandir', email: 'jurandir@gmail.com'},
    { id: 6, nome: 'Epaminondas', email: 'epaminondas@gmail.com'},
    { id: 7, nome: 'Geremias', email: 'geremias@gmail.com'},
    { id: 8, nome: 'Adelaide', email: 'adelaide@gmail.com'},
];

app.use(express.json()); // Middleware que traduz o body do request para JSON


app.post('/usuarios', (req, res) => { // CREATE
    // Criar um usuário novo informando nome e email:
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).send({error: "Nome e e-mail são obrigatórios"});
    };

    const novoUsuario = {
        id: usuarios.length + 1,
        nome,
        email
    };

    usuarios.push(novoUsuario);

    return res.status(201).send({message: 'Novo usuário adicionado', usuario: novoUsuario});
});


app.get('/usuarios', (req, res) => { // READ
    res.status(200).send(usuarios); // Ler informações sobre todos os usuários
});


app.get('/usuarios/:id', (req, res) => { // READ
    // Ler informações sobre usuário com id específico:
    const { id } = req.params; 
    const usuarioSelecionado = usuarios.find(usuario => usuario.id === Number(id));
    
    if (usuarioSelecionado) {
        return res.status(200).send(usuarioSelecionado); 
    };

    return res.status(404).send({error: "Usuário não encontrado"});
});


app.put('/usuarios/:id', (req, res) => { // UPDATE
    // Procurar usuário pelo id:
    const { id } = req.params; 
    const usuarioSelecionado = usuarios.find(usuario => usuario.id === Number(id));
    
    if (!usuarioSelecionado) {
        return res.status(404).send({error: "Usuário não encontrado"});
    };

    // Atualizar todos os dados:
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).send({error: "Nome e e-mail são obrigatórios"});
    };

    usuarioSelecionado.nome = nome;
    usuarioSelecionado.email = email;

    return res.status(200).send({message: 'Dados de usuário foram atualizados', usuario: usuarioSelecionado});
});


app.patch('/usuarios/:id', (req, res) => { // UPDATE
    // Procurar usuário pelo id:
    const { id } = req.params; 
    const usuarioSelecionado = usuarios.find(usuario => usuario.id === Number(id));
    
    if (!usuarioSelecionado) {
        return res.status(404).send({error: "Usuário não encontrado"});
    };

    // Atualizar um ou mais dados:
    const { nome, email } = req.body;

    if (nome) usuarioSelecionado.nome = nome;
    if (email) usuarioSelecionado.email = email;

    return res.status(200).send({message: 'Dados de usuário foram atualizados', usuario: usuarioSelecionado});
});


app.delete('/usuarios/:id', (req, res) => { // DELETE
    // Procurar usuário pelo id:
    const { id } = req.params; 
    const usuarioIndex = usuarios.findIndex(usuario => usuario.id === Number(id));
    
    if (usuarioIndex === -1) {
        return res.status(404).send({error: "Usuário não encontrado"});
    };

    // Deletar usuário do array:
    const usuarioDeletado = usuarios.splice(usuarioIndex, 1)[0]; 

    return res.status(200).send({message: 'Usuário foi deletado', usuario: usuarioDeletado});
});


app.listen(port, () => { // escuta na porta 3000
    console.log(`App escutando na porta ${port} - http://localhost:${port}`);
});
