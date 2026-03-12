import {
  filter,
  mergeMap,
  take,
  timer,
  map,
  takeUntil,
  merge,
} from "rxjs";
import { alertas$ } from "./alertas.stream";
import { velocidadeSuspeita$ } from "./gps.stream";
import { logComTimestamp } from "../operadores/custom_operadores";

const alertasAlta$ = alertas$.pipe(
  filter(alerta => alerta.severidade === 'alta')
);

const alertaParaGps$ = alertasAlta$.pipe(
  mergeMap(alerta =>
    velocidadeSuspeita$.pipe(
      filter(gps => gps.entregadorId === alerta.entregadorId),
      take(1),
      takeUntil(timer(5000)),
      map(gps => ({
        entregadorId: alerta.entregadorId,
        alerta,
        gps
      }))
    )
  )
);

const gpsParaAlerta$ = velocidadeSuspeita$.pipe(
  mergeMap(gps =>
    alertasAlta$.pipe(
      filter(alerta => alerta.entregadorId === gps.entregadorId),
      take(1),
      takeUntil(timer(5000)),
      map(alerta => ({
        entregadorId: gps.entregadorId,
        alerta,
        gps
      }))
    )
  )
);

export const emergencia$ = merge(
  alertaParaGps$,
  gpsParaAlerta$
).pipe(
  logComTimestamp('EMERGENCIA')
);