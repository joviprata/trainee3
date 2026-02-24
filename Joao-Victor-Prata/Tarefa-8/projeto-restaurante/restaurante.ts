function prepararRefeicao(prato: string): Promise<string>  {
    return new Promise((resolve, reject) =>  {
        const temIngredientes = true;

        console.log("Preparando a refeição...");
        
        setTimeout(() => {
            if (temIngredientes) {
                resolve(`Refeição preparada: ${prato}`);
            } else {
                reject("Está faltando ingredientes para preparar este prato.");
            }
        }, 2000);
    });
};

async function servirRefeicao(prato: string) { 
    try {
        console.log("Esperando a refeição ficar pronta...")

        const mensagem = await prepararRefeicao(prato);

        console.log(mensagem);

        console.log(`${ prato } foi entregue ao cliente.`);

    } catch (erro) {
        console.log("Erro:", erro);
    };
};

let prato = "Pizza";
servirRefeicao(prato);