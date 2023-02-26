export const LOGIN = 'LOGIN';
export const QUESTIONS_API = 'QUESTIONS_API';
export const ACTIVE_SCORE = 'ACTIVE_SCORE';
export const RANKING = 'RANKING';
export const USER_SETTINGS = 'USER_SETTINGS';

export const sendLogin = (email, name) => ({
  type: LOGIN,
  email,
  name,
});

export const quests = (questions) => ({
  type: QUESTIONS_API,
  questions,
});

export const assertionsScore = (score, assertions) => ({
  type: ACTIVE_SCORE,
  score,
  assertions,
});

export const rankingAction = (ranking) => ({
  type: RANKING,
  ranking,
});

export const userSettings = (boolean, data) => ({
  type: USER_SETTINGS,
  boolean,
  data,
});
