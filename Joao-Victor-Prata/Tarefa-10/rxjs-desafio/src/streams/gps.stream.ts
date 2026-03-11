import { interval, take, map, filter } from 'rxjs';
import { gerarGPS } from '../utils/simulador.js';

export const gps$ = interval(1000).pipe(
  take(5),
  map(() => gerarGPS())
);

export const velocidadeSuspeita$ = gps$.pipe(
  filter(gps => gps.velocidade > 60)
);

export const gpsEnriquecido$ = gps$.pipe(
  map((gps) => ({
    ...gps,
    regiao: gps.lat > 0 ? 'Norte' : 'Sul'
  }))
);
