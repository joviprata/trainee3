# Tarefa 10 - Sistema de Monitoramento Reativo

Implementação de um pipeline reativo completo com Observables, operadores e tratamento de erros.

## Como rodar o projeto
Para instalar e rodar este projeto, clone este repositório e navegue para a pasta do projeto ([rxjs-desafio](https://github.com/joviprata/trainee3/tree/Tarefa-10-Joao-Victor-Prata/Joao-Victor-Prata/Tarefa-10/rxjs-desafio)). Instale as dependências rodando o seguinte comando no terminal:


```bash
npm install
```

Em seguida, rode o seguinte comando no terminal para iniciar o projeto:

```bash
npm start
```

Todas as streams são canceladas após 30 segundos de execução, encerrando em seguida a aplicação.

## Descrição das Streams
As seguintes streams foram implementadas: 
- `alertas$`: informa imprevistos ocorridos em uma entrega.

```bash
tipo: 'atraso' | 'veiculo_parado' | 'rota_desviada',
entregadorId: string,
mensagem: string,
severidade: 'baixa' | 'media' | 'alta'
```

- `alertasCriticos$`: informa imprevistos de média ou alta severidade.

```bash
tipo: 'atraso' | 'veiculo_parado' | 'rota_desviada',
entregadorId: string,
mensagem: string,
severidade: 'media' | 'alta'
```

- `emergencia$`: informa emergências (alertas de alta severidade, cujo entregador estava dirigindo com velocidade superior a 60 km/h de acordo com o gps).

```bash
entregadorId: string,
alerta: {
  tipo: string,
  entregadorId: string,
  mensagem: string,
  severidade: 'alta'
},
gps: {
  entregadorId: string,
  lat: number,
  lng: number,
  velocidade: number,
  timestamp: Date
}
```

- `gps$`: informa localização, data, horário e velocidade de um entregador.

```bash
entregadorId: string,
lat: number,
lng: number,
velocidade: number,
timestamp: Date
```

- `velocidadeSuspeita$`: informa dados de quando um entregador está dirigindo a mais de 60 km/h.

```bash
entregadorId: string,
lat: number,
lng: number,
velocidade: number,
timestamp: Date
```

- `gpsEnriquecido$`: informa dados de GPS além de informar região (Norte ou Sul).

```bash
entregadorId: string,
lat: number,
lng: number,
velocidade: number,
timestamp: Date,
regiao: 'Norte' | 'Sul'
```

- `painelEntregador$`: informa dados mais recentes de um entregador (GPS + pedidos).

```bash
 {
entregadorId: string,
ultimaLocalizacao: { lat, lng, velocidade },
ultimoStatus: coletado' | 'em_rota' | 'entregue' | 'falhou',
ultimaAtualizacao: Date
}
```

- `pedidos$`: informa dados de pedido realizado por um cliente.

```bash
pedidoId: string,
status: 'coletado' | 'em_rota' | 'entregue' | 'falhou',
entregadorId: string,
timestamp: Date
```

- `statusCount$`: informa contagem total de cada status dos pedidos.<br/>
Observação: os campos podem ou não aparecer no objeto emitido, dependendo
dos status presentes nos pedidos processados até o momento.

```bash
coletado?: number,
em_rota?: number,
entregue?: number,
falhou?: number
```

# Operador escolhido na Etapa 3.1 (Painel do Entregador): combineLatest
O operador `combineLatest` foi escolhido para implementação da stream `painelEntregador$`. Esse operador permite combinar as emissões das streams `gps$` e `pedidos$`, sempre fornecendo o valor mais recente de cada uma delas. <br/>
Para impedir que o painel do entregador exiba dados obtidos do GPS de um entregador mesclados com dados de pedido de outro entregador, um filtro foi aplicado, garantindo que `gps.entregadorId === pedido.entregadorId`. Observa-se que esta abordagem faz com que haja poucas emissões do painel do entregador, visto que não é garantido que o último pedido seja do último entregador e vice-versa. Em um projeto mais avançado uma abordagem melhor poderia ser estruturar persistência de dados (preservar o histórico das emissões) e não deixar que dados sejam fortemente filtrados por recência.

# Resolução para Etapa 3.2 (Dashboard de Emergência)
Para resolver a etapa 3.2, foi aplicada a seguinte lógica:

A stream `emergencia$` pode ser acionada por duas condições:

- Ou um alerta de severidade 'alta' é emitido (alerta filtrado, com `alerta.severidade === 'alta'`);
- Ou um entregador tem velocidade superior a 60km/h (qualquer emissão de `velocidadeSuspeita$` pois essa stream já é o gps filtrado).

No momento em que uma das condições ocorrem, é iniciado um intervalo de 5 segundos.<br/>
Dentro deste intervalo, um filtro é aplicado:

- Seja para receber somente dados de gps com velocidade superior a 60km/h (quando o alerta acionou o intervalo);
- Ou, seja para receber somente dados de alerta de severidade 'alta' (quando o gps acionou o intervalo).

Se receber um dado dos dois até a finalização do intervalo e se o `entregadorId` é o mesmo para as duas emissões, a stream emite os dados mesclados.<br/>
Se não receber nenhum dos dois até a finalização do intervalo, a stream é desativada, esperando ser iniciada novamente por uma das condições.

# Dificuldades enfrentadas
- Ordem de chamada dos operadores: o `logComTimestamp` teve que ser movido para o final, depois dos operadores `map()`, pois caso contrário ele estaria printando o valor emitido pelo operador `interval()`, ao invés de printar o valor transformado no pipeline. Fazendo esta alteração, no entanto, gerou erros de tipagem nos streams derivados (por exemplo `velocidadeSuspeita$`, derivado de `gps$`). Para preservar o tipo dos streams e evitar tratamento desorganizado de dados, foi utilizado o tipo `MonoTypeOperatorFunction` do RxJS em `custom_operadores.ts`, e declarado que o operador `logComTimestamp` não altera o tipo do stream.
- Implementação do filtro usando `pedido.entregadorId` em `painelEntregador$`: como `pedidos$` pode emitir tanto dados de pedidos devidamente formatados quanto objetos de erro no formato `{ status: 'erro', mensagem: err.message }` (quando ocorre uma falha de comunicação com o servidor), foi necessário implementar um **Type Guard**, que permite ao TypeScript tratar corretamente os dados usados no filtro. Uma função `isPedido()` foi criada, que verifica se o objeto emitido representa um pedido válido (ou seja, não possui `status: 'erro'` e contém a propriedade `entregadorId`).
- Emissão duplicada de valores: Como há Observables que são derivados de outros, por exemplo, `gpsEnriquecido$` derivado de `gps$`, o operador `logComTimestamp` executa duas vezes para um mesmo valor emitido. Isso ocorre porque, ao emitir um valor em `gps$`, esse valor é processado tanto pela própria stream quanto pelas streams derivadas, resultando em múltiplos logs para o mesmo dado.<br/>Uma solução equivocada seria utilizar `Distinct` em `logComTimestamp`: eliminar a exibição de logs duplicados pode melhorar a clareza dos dados apresentados, mas não resolve o fato de que os Observables continuam sendo executados múltiiplas vezes desnecessariamente o que pode prejudicar o desempenho do software. Logo, para resolver tanto a exibição dos logs quanto a execução duplicada de valores, foram adicionados operadores `share()`, permitindo que dados sejam compartilhados entre Observers e impedindo que o mesmo Observable seja reexecutado para cada nova inscrição. 

# Observações
A função next() das subscriptions em `main.ts` não possui `console.log(`[${nome}]`, dados);` pois o resultado já é exibido pelo operador `logComTimestamp`. Para evitar redundância de logs e manter a saída do console mais clara, esse `console.log` foi removido da main.
