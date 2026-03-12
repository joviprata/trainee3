import { timer, switchMap, map, filter } from 'rxjs';
import { gerarAlerta } from '../utils/simulador';
import { logComTimestamp } from '../operadores/custom_operadores';

export const alertas$ = timer(0, 0).pipe(
  switchMap(() =>
    timer(Math.random() * 5000 + 3000).pipe(
      map(() => gerarAlerta()),
    )
  ),
  logComTimestamp('ALERTAS')
);

export const alertasCriticos$ = alertas$.pipe(
  filter(alerta => alerta.severidade === 'alta' || alerta.severidade === 'media'),
  logComTimestamp('ALERTAS_CRITICOS')
);
