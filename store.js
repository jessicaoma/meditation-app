import {createStore} from 'redux';
import {reducer} from './reducers';
//import AsyncStorage from '@react-native-community/async-storage';
import {AsyncStorage} from 'react-native';
import {persistStore, persistReducer} from 'redux-persist';

// Middleware: Redux Persist Config
const persistConfig = {
  // Root
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  //whitelist: ['authReducer'],
  // Blacklist (Don't Save Specific Reducers)
  blacklist: ['categoria', 'viajes', 'viaje'],
};

const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

export {store, persistor};

export default {store, persistor};
