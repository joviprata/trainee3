import { interval, map, filter } from 'rxjs';
import { gerarAlerta } from '../utils/simulador.js';
import { logComTimestamp } from '../operadores/custom_operadores.js';

export const alertas$ = interval((3 + (Math.random() * 5)) * 1000).pipe(
  map(() => gerarAlerta()),
  logComTimestamp('ALERTAS')
);

export const alertasCriticos$ = alertas$.pipe(
  filter(alerta => alerta.severidade === 'alta' || alerta.severidade === 'media'),
  logComTimestamp('ALERTAS_CRITICOS')
);
