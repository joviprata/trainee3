import { of, timer, switchMap, map, filter, share, repeat } from 'rxjs';
import { gerarAlerta } from '../utils/simulador';
import { logComTimestamp } from '../operadores/custom_operadores';

export const alertas$ = of(null).pipe(
  switchMap(() =>
    timer(Math.random() * 5000 + 3000).pipe(
      map(() => gerarAlerta()),
    )
  ),
  logComTimestamp('ALERTA'),
  share(),
  repeat()
);

export const alertasCriticos$ = alertas$.pipe(
  filter(alerta => alerta.severidade === 'alta' || alerta.severidade === 'media'),
  logComTimestamp('ALERTA_CRITICO')
);
