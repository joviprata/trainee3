import { interval, take, map } from 'rxjs';

function pegarAleatorio<T>(arr: T[]): T | undefined {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

const statusPedido = ['coletado', 'em_rota', 'entregue', 'falhou']

const pedido$ = interval(2000).pipe( 
  take(5),
  map(() => {
    const numPedido = Math.floor(Math.random() * 999999999) + 1;
    const numEntregador = Math.floor(Math.random() * 999) + 1;

    return {
      pedidoId: `PED-${numPedido.toString().padStart(14, '0')}`,
      status: pegarAleatorio(statusPedido),
      entregadorId: `ENT-${numEntregador.toString().padStart(3, '0')}`,
      timestamp: new Date(),
    };
  })
);

pedido$.subscribe({
  next: (dadosPedido) => {
    console.log('[next]:', dadosPedido);
  },

  error: (err) => {
    console.log('[error]:', err);
  },

  complete: () => {
    console.log('[complete]');
  }
});
