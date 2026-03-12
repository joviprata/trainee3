import { interval, map, filter } from 'rxjs';
import { gerarGPS } from '../utils/simulador';
import { logComTimestamp } from '../operadores/custom_operadores';

export const gps$ = interval(1000).pipe(
  map(() => gerarGPS()),
  logComTimestamp('GPS'),
);

export const velocidadeSuspeita$ = gps$.pipe(
  filter(gps => gps.velocidade > 60),
  logComTimestamp('VELOCIDADE_SUSPEITA')
);

export const gpsEnriquecido$ = gps$.pipe(
  map((gps) => ({
    ...gps,
    regiao: gps.lat > 0 ? 'Norte' : 'Sul'
  })),
  logComTimestamp('GPS_ENRIQUECIDO')
);
