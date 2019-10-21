import { createStore, combineReducers } from 'redux';
import playerReducer from '../features/player/reducer';

const rootReducer = combineReducers({
  player: playerReducer, // player is the key, playerReducer is whatever it returns
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
