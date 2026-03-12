
// Função auxiliar (pega elemento aleatório de um array):

function pegarAleatorio<T>(arr: T[]): T {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex]!;
}


// Gerar Alerta:

const tipoAlerta = ['atraso', 'veiculo_parado', 'rota_desviada'];
const severidadeAlerta = ['baixa', 'media', 'alta'];

export function gerarAlerta() {
  const numEntregador = Math.floor(Math.random() * 999) + 1;

  return {
    tipo: pegarAleatorio(tipoAlerta),
    entregadorId: `ENT-${numEntregador.toString().padStart(3, '0')}`,
    mensagem: 'ALERTA',
    severidade: pegarAleatorio(severidadeAlerta),
  };
}


// Gerar GPS:

export function gerarGPS() {
  const numEntregador = Math.floor(Math.random() * 999) + 1;

  return {
    entregadorId: `ENT-${numEntregador.toString().padStart(3, '0')}`,
    lat: Math.random() * 180 - 90,
    lng: Math.random() * 360 - 180,
    velocidade: Number((Math.random() * 80).toFixed(2)),
    timestamp: new Date(),
  };
}


// Gerar Pedido:

const statusPedido = ['coletado', 'em_rota', 'entregue', 'falhou']

export function gerarPedido() {
  const numPedido = Math.floor(Math.random() * 999999999) + 1;
  const numEntregador = Math.floor(Math.random() * 999) + 1;

  return {
    pedidoId: `PED-${numPedido.toString().padStart(14, '0')}`,
    status: pegarAleatorio(statusPedido),
    entregadorId: `ENT-${numEntregador.toString().padStart(3, '0')}`,
    timestamp: new Date(),
  };
}

// Garantir estrutura certa para o pedido ser filtrado em painelEntregador$:
interface Pedido {
  pedidoId: string;
  status: string;
  entregadorId: string;
  timestamp: Date;
}

// Função Type Guard do Pedido:
export function isPedido(pedido: any): pedido is Pedido {
  return pedido && pedido.status !== 'erro' && 'entregadorId' in pedido;
}
