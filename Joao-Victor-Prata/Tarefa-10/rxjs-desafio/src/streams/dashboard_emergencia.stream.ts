import { filter } from "rxjs";
import { alertas$ } from "./alertas.stream.js";
import { velocidadeSuspeita$ } from "./gps.stream.js";

// filtrar alerta para ser somente de severidade alta
// combinar com entregadorId de velocidade superior a 60km/h no gps$

export const emergencia$ = alertas$.pipe(
  filter(alerta => alerta.severidade === 'alta')
)
