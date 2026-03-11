import { logComTimestamp } from '../operadores/custom_operadores.js';
import { gps$ } from './gps.stream.js';
import { pedidos$ } from './pedidos.stream.js';

import { combineLatest, map } from 'rxjs';

export const painelEntregador$ = combineLatest([gps$, pedidos$]).pipe(
  map((gps, pedido) => {
    return {
      entregadorId: gps.entregador
    }
  }),

  logComTimestamp('PAINEL_ENTREGADOR')
)
