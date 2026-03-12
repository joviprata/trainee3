import { Subject, takeUntil } from 'rxjs';

import { alertas$, alertasCriticos$ } from './streams/alertas.stream';
import { emergencia$ } from './streams/dashboard_emergencia.stream';
import { gps$, velocidadeSuspeita$, gpsEnriquecido$ } from './streams/gps.stream';
import { painelEntregador$ } from './streams/painel_entregador.stream';
import { pedidos$, statusCount$ } from './streams/pedidos.stream';

const destroy$ = new Subject<void>();

// Contador de eventos:

const resumo: Record<string, number> = {};

function subscribeStream(nome: string, stream$: any) {

  resumo[nome] = 0;

  stream$
    .pipe(takeUntil(destroy$))
    .subscribe({
      next: (dados: any) => resumo[nome]!++,
      error: (err: any) => console.log(`[${nome} ERROR]`, err),
      complete: () => console.log(`[${nome} COMPLETE]`)
    });
}


// Registrar todas as streams:

subscribeStream('alertas$', alertas$);
subscribeStream('alertasCriticos$', alertasCriticos$);

subscribeStream('emergencia$', emergencia$);

subscribeStream('gps$', gps$);
subscribeStream('velocidadeSuspeita$', velocidadeSuspeita$);
subscribeStream('gpsEnriquecido$', gpsEnriquecido$);

subscribeStream('painelEntregador$', painelEntregador$);

subscribeStream('pedidos$', pedidos$);
subscribeStream('statusCount$', statusCount$);

setTimeout(() => {

  destroy$.next();
  destroy$.complete();


  console.log('\nTotal de eventos processados por cada stream:\n');

  for (const stream in resumo) {
    console.log(`${stream}: ${resumo[stream]} eventos`);
  }

}, 30000);