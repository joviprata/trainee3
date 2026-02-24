# Tarefa 8 - Async / Await e Promises

Estudo e demonstração de async/await e Promise, em um projeto que simula o funcionamento de pedidos em um restaurante.

## Instalação
Para instalar, rodar este projeto e observar o resultado gerado pelo código, clone este repositório e navegue para a pasta do projeto ([projeto-restaurante](https://github.com/joviprata/trainee3/tree/Tarefa-8-Joao-Victor-Prata/Joao-Victor-Prata/Tarefa-8/projeto-restaurante)).<br/>
Abra o terminal e execute o seguinte comando:

```npx ts-node restaurante.ts```

## Análise do Código
A function ```prepararRefeicao()``` retorna uma Promise - é prometido ao garçom que será estabelecida ("settled") para ele pelo menos uma resposta ao que foi exigido do cozinheiro - seja ```resolve``` indicando que foi possível preparar a refeição, ou ```reject``` indicando que não foi possível preparar a refeição por conta de um erro (neste caso sendo o fato de não se haver ingredientes para preparar o prato).<br/>
Para simular o tempo que leva para o cozinheiro preparar o prato, foi utilizado um ```setTimeout()``` de 2 segundos. Em um contexto de um projeto utilizando banco de dados, isto seria equivalente a um tempo de espera que levaria para obter dados do banco.

A função ```servirRefeicao()``` foi declarada de forma assíncrona (```async```) pois não há como prever quanto tempo a refeição leva para ser preparada (neste caso são sempre 2 segundos, mas em casos reais com recursos e dados reais este tempo é imprevisível).<br/>
Esta função tenta servir a refeição com sucesso (``` await prepararRefeicao(prato)```). Se a promessa da refeição for resolvida, então o prato é entregue ao cliente com sucesso.<br/>
Caso contrário, um erro é gerado pela promessa, que é recebido pela função ```servirRefeicao()``` (```catch(erro)```), informando o erro especificado no ```reject``` da promessa (```"Está faltando ingredientes para preparar este prato."```).<br/>
É importante ressaltar que este tipo de implementação ```try catch``` deve ser usado com bastante cautela em projetos reais, pois outros erros de implementação podem ocorrer no ```try``` e fazer com que o desenvolvedor equivocadamente assuma que este erro é necessariamente por conta que a Promise foi rejeitada. 

## Output
Considere o prato de exemplo para os casos abaixo sendo pizza (```let prato = "Pizza";```).<br/>
- Caso ```temIngredientes = true```, o resultado da execução do projeto será:

```bash
Levando pedido para a cozinha...
Preparando a refeição...
Refeição preparada: Pizza
Pizza foi entregue ao cliente.
```

- Caso ```temIngredientes = false```, o resultado da execução do projeto será:

```bash
Levando pedido para a cozinha...
Preparando a refeição...
Erro:  Está faltando ingredientes para preparar este prato.
```
