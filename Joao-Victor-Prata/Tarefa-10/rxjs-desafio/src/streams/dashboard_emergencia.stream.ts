import { filter } from "rxjs";
import { alertas$ } from "./alertas.stream.js";
import { velocidadeSuspeita$ } from "./gps.stream.js";
import { logComTimestamp } from "../operadores/custom_operadores.js";

// condições:
// ou um alerta de severidade 'alta' é emitido (alerta filtrado, com alerta.severidade === 'alta'),
// ou um entregador têm velocidade superior a 60km/h (qualquer emissão de velocidadeSuspeita pois ela é o gps filtrado)
// no momento em que uma das condições ocorrem, é iniciado um intervalo.
// dentro deste intervalo, um filtro é aplicado,
// ou para receber somente dados de gps com velocidade superior a 60km/h (quando o alerta acionou o intervalo),
// ou para receber somente dados de alerta de severidade 'alta' (quando o gps acionou o intervalo).
// se receber um dos dois até a finalização do intervalo E se o entregadorId é o mesmo para as duas emissões, a stream emite os dados mesclados.
// se não receber nenhum dos dois até a finalização do intervalo, a stream é desativada, esperando ser iniciada novamente por uma das condições.

// filtrar alerta para ser somente de severidade alta
// combinar com entregadorId de velocidade superior a 60km/h no gps$

export const emergencia$ = alertas$.pipe(
  filter(alerta => alerta.severidade === 'alta'),
  logComTimestamp('EMERGENCIA')
)
