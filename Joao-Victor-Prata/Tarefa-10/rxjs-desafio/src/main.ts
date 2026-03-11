import { alertas$, alertasCriticos$ } from './streams/alertas.stream.js';
import { gps$, velocidadeSuspeita$ } from './streams/gps.stream.js';
import { pedidos$ } from './streams/pedidos.stream.js';

alertas$.subscribe({
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

alertasCriticos$.subscribe({
  next: (dadosAlerta) => {
    console.log('BBBBB[next]:', dadosAlerta);
  },

  error: (err) => {
    console.log('[error]:', err);
  },

  complete: () => {
    console.log('[complete]');
  }
});


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

velocidadeSuspeita$.subscribe({
  next: (dadosGPS) => {
    console.log('AAAAAA[next]:', dadosGPS);
  },

  error: (err) => {
    console.log('[error]:', err);
  },

  complete: () => {
    console.log('[complete]');
  }
});


pedidos$.subscribe({
  next: (dadosPedido) => {
    console.log('[next]:', dadosPedido);
  },

  error: (err) => {
    console.log('[error]:', err);
  },

  complete: () => {
    console.log('[complete]');
  }
});