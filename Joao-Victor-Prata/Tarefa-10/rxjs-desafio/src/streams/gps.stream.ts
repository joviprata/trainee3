import { interval, take, map } from 'rxjs';

const gps$ = interval(1000).pipe(
  take(5),
  map(() => {
    const numEntregador = Math.floor(Math.random() * 999) + 1;

    return {
      entregadorId: `ENT-${numEntregador.toString().padStart(3, '0')}`,
      lat: Math.random() * 180 - 90,
      lng: Math.random() * 360 - 180,
      velocidade: Number((Math.random() * 80).toFixed(2)),
      timestamp: new Date(),
    };
  })
);

gps$.subscribe({
  next: (dadosGPS) => {
    console.log('[next]:', dadosGPS);
  },

  error: (err) => {
    console.log('[error]:', err);
  },

  complete: () => {
    console.log('[complete]');
  }
});
