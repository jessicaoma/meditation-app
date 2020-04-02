// Initial state of the store
const initialState = {
  categoria: {
    key: '1',
    titulo: 'Ser feliz',
    color: '#fdd58d',
    imagenLista:
      'http://okoconnect.com/karim/assets/categorias/categoria-1/iconobubble.svg',
    imagenFondo:
      'http://okoconnect.com/karim/assets/categorias/categoria-1/fondocategoria.png',
    imagenPrevia:
      'http://okoconnect.com/karim/assets/categorias/categoria-1/portada.jpg',
    media:
      'http://okoconnect.com/karim/assets/categorias/categoria-1/video.mp4',
  },
  viaje: {
    key: '12',
    titulo: '¿Qué es ser feliz?',
    categoriaId: '1',
    isfree: true,
    imagenfondo:
      'http://okoconnect.com/karim/assets/categorias/categoria-1/pasoscategoria.png',
    pasos: [
      {
        key: '5e6bd20e-1c4f-48ac-8f62-9a56144dde08',
        titulo: 'Bienvenida',
        color: '#fdd58d',
        tipo: 0,
        contenidos: [
          {
            key: '59c041a7-03a1-4429-93f8-6b106dc515e3',
            imagen:
              'http://okoconnect.com/karim/assets/categorias/categoria-1/intro-1.png',
            texto: 'Es una experiencia',
            titulo: 'LA FELICIDAD',
          },
        ],
      },
      {
        key: '5e6bd20e-1c4f-48ac-8f62-9a56144dde08',
        titulo: 'Bienvenida',
        color: '#fdd58d',
        tipo: 0,
        contenidos: [
          {
            key: '254f3b45-b862-441a-be16-4bd1edd8c32b',
            imagen:
              'http://okoconnect.com/karim/assets/categorias/categoria-1/intro-2.png',
            texto:
              'Una sensación, un sentimiento, una emoción, un estado de la mente y un estado del ser.',
          },
        ],
      },
      {
        key: '5e6bd20e-1c4f-48ac-8f62-9a56144dde08',
        titulo: 'Bienvenida',
        color: '#fdd58d',
        tipo: 0,
        contenidos: [
          {
            key: '254f3b45-b862-441a-be16-4bd1edd8c32b',
            imagen:
              'http://okoconnect.com/karim/assets/categorias/categoria-1/intro-3.png',
            texto:
              'La felicidad es la experiencia espiritual de vivir cada minuto con amor, gracia y gratitud.',
          },
        ],
      },
      {
        key: 'c3d84de5-f779-40c7-8a01-9f92a57386fa',
        titulo: '¿QUÉ ES LA FELICIDAD?',
        color: '#fdd58d',
        tipo: 1,
        media: 'http://okoconnect.com/karim/cursos/ser-feliz/modulo-1.mp3',
        imagenFondo:
          'http://okoconnect.com/karim/assets/categorias/categoria-1/audio-0.png',
        contenidos: [],
      },
      {
        key: 'dc8bf5ee-65fb-4115-9fb6-9a05584bba40',
        titulo: 'Recomendaciones',
        color: '#fdd58d',
        tipo: 2,
        imagenFondo:
          'http://okoconnect.com/karim/assets/categorias/categoria-1/recomendaciones-0.png',
        contenidos: [
          {
            key: '2bcad5ec-abeb-4a74-bb60-bfbe670ddf14',
            titulo: 'Acepta',
            texto:
              'La vida te presenta desafíos y experiencias desagradables que son difíciles de soportar. Ante eso puedes decidir: aceptar y aprender o tratar de cambiar esas circunstancias vitales. Si está a tu alcance cambiarlas, hazlo. Afronta aquello que te molesta. Si no puedes cambiarlo, no resistas, no te opongas. Hay cosas que se escapan de tu poder de acción. Entiende que cada prueba es una oportunidad para entrenar tu paciencia y tu capacidad de amar, y para crecer espiritualmente.',
          },
        ],
      },
      {
        key: 'c59b7468-3bb1-485f-baa1-231491de8f8c',
        titulo: 'Ejercicios',
        color: '#fdd58d',
        tipo: 3,
        imagenFondo:
          'http://okoconnect.com/karim/assets/categorias/categoria-1/ejercicio-0.png',
        contenidos: [
          {
            key: '1',
            titulo: 'Reto Personal',
            texto:
              'Te invito a hacer unos ejercicios para conectarte con tu ser espiritual a través del silencio y la observación detenida de tus pensamientos, sensaciones y emociones.',
          },
        ],
      },
      {
        key: '3c2de602-bcf5-4028-9ea1-82bd14e9a2f1',
        titulo: 'Cierre',
        color: '#fdd58d',
        tipo: 10,
        imagenFondo:
          'http://okoconnect.com/karim/assets/categorias/categoria-1/cierre-1.png',
        contenidos: [
          {
            titulo: '¡HOLA!',
            texto:
              'Te felicito por haber terminado este primer viaje hacia la felicidad. Espero que tengas claro que si buscas razones para estar triste lo estarás, pero cada vez que buscamos algo porque estar feliz el universo te lo regresa.',
          },
        ],
      },
      {
        key: '3c2de602-bcf5-4028-9ea1-82bd14e9a2f1',
        titulo: 'Cierre',
        color: '#fdd58d',
        tipo: 10,
        imagenFondo:
          'http://okoconnect.com/karim/assets/categorias/categoria-1/cierre-2.png',
        contenidos: [
          {
            texto:
              'Siempre ten presente que tus expresiones continuas de gratitud y amor son las que te traerán alegría, prosperidad, éxito, satisfacción, abundancia y más amor a tu vida.',
          },
        ],
      },
      {
        key: '3c2de602-bcf5-4028-9ea1-82bd14e9a2f1',
        titulo: 'Cierre',
        color: '#fdd58d',
        tipo: 10,
        imagenFondo:
          'http://okoconnect.com/karim/assets/categorias/categoria-1/cierre-3.png',
        contenidos: [
          {
            texto:
              'No olvides que si con todo lo que tienes no eres feliz, con todo lo que te falta tampoco lo serás.\n\nCon amor y gratitud\nKarim Temple',
          },
        ],
      },
    ],
  },
};

// Function to handle actions and update the state of the store.
// Notes:
// - The reducer must return a new state object. It must never modify
//   the state object. State objects should be treated as immutable.
// - We set \`state\` to our \`initialState\` by default. Redux will
//   call reducer() with no state on startup, and we are expected to
//   return the initial state of the app in this case.
export const reducer = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case 'SET_CATEGORIA': {
      return {
        ...state,
        categoria: payload.categoria,
      };
    }
    case 'SET_VIAJE': {
      return {
        ...state,
        viaje: payload.viaje,
      };
    }
  }

  return state;
};
