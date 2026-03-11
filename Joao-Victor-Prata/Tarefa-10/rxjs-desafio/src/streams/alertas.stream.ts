import { interval, take, map } from 'rxjs';

function pegarAleatorio<T>(arr: T[]): T | undefined {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

const tipoAlerta = ['atraso', 'veiculo_parado', 'rota_desviada'];
const severidadeAlerta = ['baixa', 'media', 'alta'];

const alerta$ = interval((3 + (Math.random() * 5)) * 1000).pipe(
  take(5),
  map(() => {
    const numEntregador = Math.floor(Math.random() * 999) + 1;

    return {
     tipo: pegarAleatorio(tipoAlerta),
      entregadorId: `ENT-${numEntregador.toString().padStart(3, '0')}`,
      mensagem: 'ALERTA',
      severidade: pegarAleatorio(severidadeAlerta),
    };
  })    
);

alerta$.subscribe({
  next: (dadosAlerta) => {
    console.log('[next]:', dadosAlerta);
  },

  error: (err) => {
    console.log('[error]:', err);
  },

  complete: () => {
    console.log('[complete]');
  }
});
