import {
  interval,
  mergeMap,
  retry,
  of,
  catchError,
  scan,
  share,
} from 'rxjs';
import { gerarPedido } from '../utils/simulador';
import { logComTimestamp } from '../operadores/custom_operadores';

export const pedidos$ = interval(2000).pipe(
  mergeMap(() =>
    of(null).pipe(
      mergeMap(() => {
        if (Math.random() <= 0.1) {
          throw new Error('Falha na comunicação com o servidor');
        }
        return of(gerarPedido());
      }),
    )),
  
  retry(3),
  
  catchError((err) => {
    return of({
      status: 'erro',
      mensagem: err.message
    });
  }),

  logComTimestamp('PEDIDO'),
  share()
);

export const statusCount$ = pedidos$.pipe(
  scan((acc, pedido) => {
    acc[pedido.status] = (acc[pedido.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>),
  logComTimestamp('STATUS_COUNT')
);
