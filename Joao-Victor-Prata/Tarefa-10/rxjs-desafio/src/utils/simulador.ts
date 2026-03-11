// Função auxiliar (pega elemento aleatório de um array):

function pegarAleatorio<T>(arr: T[]): T | undefined {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
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


// GerarGPS:

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


// GerarPedido:

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
