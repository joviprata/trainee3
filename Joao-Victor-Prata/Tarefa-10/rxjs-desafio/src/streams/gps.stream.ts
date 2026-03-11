import { interval, take } from 'rxjs';

const gps$ = interval(1000).pipe(
  take(5)
);

gps$.subscribe({
  next: () => {

    const numEntregador = Math.floor(Math.random() * 999) + 1;

    const dadosGPS = {
      entregadorId: `ENT-${numEntregador.toString().padStart(3, '0')}`,
      lat: Math.random() * 180 - 90,
      lng: Math.random() * 360 - 180,
      velocidade: Number((Math.random() * 80).toFixed(2)),
      timestamp: new Date,
    };

    console.log('[next]: ', dadosGPS);
  },

  error: (err) => {
    console.log('[error]: ', err);
  },

  complete: () => {
    console.log('[complete]');
  }

});
