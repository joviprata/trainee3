import { interval, take, map, filter } from 'rxjs';
import { gerarAlerta } from '../utils/simulador.js';

export const alertas$ = interval((3 + (Math.random() * 5)) * 1000).pipe(
  take(5),
  map(() => gerarAlerta())
);

export const alertasCriticos$ = alertas$.pipe(
  filter(alerta => alerta.severidade === 'alta' || alerta.severidade === 'media')
)
