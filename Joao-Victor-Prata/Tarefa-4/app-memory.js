import express from 'express';

const app = express();
const port = 3000;

let usuarios = [
    { id: 1, nome: 'Péricles', email: 'alice@gmail.com'},
    { id: 2, nome: 'Reinaldo', email: 'bob@gmail.com'},
    { id: 3, nome: 'Eclair', email: ''},
    { id: 4, nome: 'Jurandir', email: ''},
    { id: 5, nome: 'Epaminondas', email: ''},
    { id: 6, nome: 'Geremias', email: ''},
];

app.use( express.json() ); // Middleware que traduz o body do request para JSON


app.get('/usuarios', (req, res) => {
    res.status(200);
    res.send(usuarios); // Ler informações sobre todos os usuários (antes das alterações)
})


app.post('/usuarios', (req, res) => { // CREATE
    const { nome, email } = req.body;

    if (!nome || !email) {
        res.status(400).send({error: "Nome e e-mail são obrigatórios"});
    };

    const novoUsuario = {
        id: usuarios.length + 1,
        nome,
        email
    }

    usuarios.push(novoUsuario);

    res.status(201).send('Novo usuário adicionado:');
    res.send(novoUsuario);

});

app.get('/usuarios/:id', (req, res) => { // READ
    // Pegar informações do usuário de id específico no array usuarios
    const { id } = req.params; 
    const usuarioSelecionado = usuarios.find(usuario => usuario.id === Number(id));
    
    if (usuarioSelecionado) {
        res.status(200).send(usuarioSelecionado); 
    }
    else {
        res.status(404).send({error: "Usuário não encontrado"});
    }

});


app.get('/usuarios', (req, res) => {
    res.status(200);
    res.send(usuarios); // Ler informações sobre todos os usuários (após as alterações)
})


app.listen(port, () => { // escuta na porta 3000
    console.log(`App escutando na porta ${port} - http://localhost:${port}`);
});
