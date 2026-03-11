import { interval, take } from 'rxjs';

function pegarAleatorio<T>(arr: T[]): T | undefined {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

const alerta$ = interval((3 + (Math.random() * 5)) * 1000);

alerta$.subscribe({
  next: () => {

    const numEntregador = Math.floor(Math.random() * 999) + 1;

    const dadosAlerta = {
      tipo: pegarAleatorio(['atraso', 'veiculo_parado', 'rota_desviada']),
      entregadorId: `ENT-${numEntregador.toString().padStart(3, '0')}`,
      mensagem: 'string',
      severidade: pegarAleatorio(['baixa', 'media', 'alta']),
    };

    console.log('[next]: ', dadosAlerta);
  },

  error: (err) => {
    console.log('[error]: ', err);
  },

  complete: () => {
    console.log('[complete]');
  }

});
