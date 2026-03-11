import { tap } from 'rxjs';
import type { MonoTypeOperatorFunction } from 'rxjs';

export function logComTimestamp<T>(label?: string): MonoTypeOperatorFunction<T> {
  return tap((value) =>{

    const horarioEmissao = new Date();

    const horarioFormatado = horarioEmissao.toLocaleTimeString('pt-BR', { hour12: false }) 
      + '.' + horarioEmissao.getMilliseconds().toString().padStart(3, '0');

    if (label) {
      console.log(`[${label}] ${horarioFormatado} → `, value);
    } else {
      console.log(`${horarioFormatado} → `, value);
    }
  });
}
