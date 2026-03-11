import { interval, take, map, scan } from 'rxjs';
import { gerarPedido } from '../utils/simulador.js';

export const pedidos$ = interval(2000).pipe( 
  take(5),
  map(() => gerarPedido())
);

// export const statusCount$ = pedidos$.pipe(
//   scan((acc, pedido) => acc + 1),

//   map((totalColetado) => {
//     return {
//       coletado: totalColetado,
//       em_rota: 0,
//       entregue: 0,
//       falhou: 0
//     }
//   })
// )

// statusCount$.subscribe({
//   next: (dadosPedido) => {
//     console.log('[STATUSCOUNT][next]:', dadosPedido);
//   },

//   error: (err) => {
//     console.log('[error]:', err);
//   },

//   complete: () => {
//     console.log('[complete]');
//   }
// });