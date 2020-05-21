import * as Actions from './types';

// Initial state of the store
const initialState = {
  categoria: undefined,
  viajes: [],
  usuario: undefined,
  //TODO Usuario {name: string, token:string, email: string}
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
    case Actions.SET_CATEGORIA: {
      return {
        ...state,
        categoria: payload.categoria,
      };
    }
    case Actions.SET_MODULOS: {
      return {
        ...state,
        viajes: payload.viajes,
      };
    }
    case Actions.SET_ANGEL: {
      return {
        ...state,
        angel: payload.angel,
        angelTime: payload.angelTime,
      };
    }
    case Actions.SET_EMOCION: {
      return {
        ...state,
        emocion: payload.emocion,
        emocionTime: payload.emocionTime,
      };
    }
    case Actions.SAVE_USER: {
      return {
        ...state,
        usuario: payload.usuario,
      };
    }
    default:
      return state;
  }
};
