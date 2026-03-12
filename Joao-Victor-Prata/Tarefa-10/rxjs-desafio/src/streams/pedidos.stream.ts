import {
  interval,
  map,
  retry,
  of,
  catchError,
  scan,
} from 'rxjs';
import { gerarPedido } from '../utils/simulador';
import { logComTimestamp } from '../operadores/custom_operadores';

export const pedidos$ = interval(2000).pipe(
  map(() => {
    if (Math.random() <= 0.1) {
      throw new Error('Falha na comunicação com o servidor');
    }
    return gerarPedido();
  }),

  retry(3),

  catchError((err) => {
    return of({
      status: 'erro',
      mensagem: err.message
    });
  }),

  logComTimestamp('PEDIDOS')
);

export const statusCount$ = pedidos$.pipe(
  scan((acc, pedido) => {
    acc[pedido.status] = (acc[pedido.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>),
  logComTimestamp('STATUS_COUNT')
);
