import { combineReducers } from 'redux';
import player from './Trivia';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "Trivia" no seu estado global
const rootReducer = combineReducers({
  player,
});

export default rootReducer;
