# Tarefa 10 - Sistema de Monitoramento Reativo

Implementação de um pipeline reativo completo com Observables, operadores e tratamento de erros.

## Como rodar o projeto
Para instalar e rodar este projeto, clone este repositório e navegue para a pasta do projeto ([rxjs-desafio](https://github.com/joviprata/trainee3/tree/Tarefa-10-Joao-Victor-Prata/Joao-Victor-Prata/Tarefa-10/rxjs-desafio)). Rode o seguinte comando no terminal:

```bash
npx tsx src/main.ts
```

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
tipo: 'atraso' | 'veiculo_parado' | 'rota_desviada',
entregadorId: string,
mensagem: string,
severidade: 'media' | 'alta'
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
ultimoStatus: string,
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
O operador combineLatest foi escolhido para implementação da stream painelEntregador$. Determinada lógica foi aplicada:<br/>
- Se um entregador for captado pelo GPS mas não pelos Pedidos,  

# Resolução para Etapa 3.2 (Dashboard de Emergência)
Para resolver a etapa 3.2, 

# Dificuldade enfrentada
Uma dificuldade enfrentada ao implementar foi com a ordem de chamada dos operadores. O `logComTimestamp` teve que ser movido para o final, depois dos operadores `map()`, pois caso contrário ele estaria printando o valor emitido pelo operador `interval()`, ao invés de printar o valor transformado no pipeline. Fazendo esta alteração, no entanto, gerou erros de tipagem nos streams derivados (por exemplo `velocidadeSuspeita$`, derivado de `gps$`). Para preservar o tipo dos streams e evitar tratamento desorganizado de dados, foi importada `MonoTypeOperatorFunction` de `rxjs` em `custom_operadores.ts`, e declarado que o operador `logComTimestamp` não altera o tipo do stream.

# Observações
A propriedade next() das subscriptions em `main.ts` não possui `console.log(`[${nome}]`, dados);` pois o resultado jé é exibido pelo operador `logComTimestamp`. Para evitar redundância de logs e manter a saída do console mais clara, esse `console.log` foi removido da main.
