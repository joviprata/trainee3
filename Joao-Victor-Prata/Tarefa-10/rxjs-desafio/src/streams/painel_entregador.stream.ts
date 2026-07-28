import { logComTimestamp } from '../operadores/custom_operadores';
import { gps$ } from './gps.stream';
import { pedidos$ } from './pedidos.stream';
import { isPedido } from '../utils/simulador';

import { combineLatest, map, filter } from 'rxjs';

export const painelEntregador$ = combineLatest([gps$, pedidos$]).pipe(

  filter(([gps, pedido]) => isPedido(pedido) && gps.entregadorId === pedido.entregadorId),

  map(([gps, pedido]) => ({
    entregadorId: gps.entregadorId,
    ultimaLocalizacao: {
      lat: gps.lat,
      lng: gps.lng,
      velocidade: gps.velocidade
    },
    ultimoStatus: pedido.status,
    ultimaAtualizacao: gps.timestamp
  })),

  logComTimestamp('PAINEL_ENTREGADOR')
);