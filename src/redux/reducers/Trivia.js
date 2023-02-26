const INITIAL_STATE = {
  assertions: 0,
  score: 0,
  name: '',
  gravatarEmail: '',
  questions: [],
  picture: '',
  settingUser: false,
  dataSettings: {},
};

const trivia = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'QUESTIONS_API':
    return { ...state, questions: action.questions };
  case 'ACTIVE_SCORE':
    return {
      ...state,
      assertions: action.assertions,
      score: action.score,
    };
  case 'LOGIN':
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.email,
    };
  case 'RANKING':
    return {
      ...state,
      ranking: action.ranking,
    };
  case 'TOTAL':
    return { ...state, total: action.total };
  case 'USER_SETTINGS':
    return {
      ...state,
      settingUser: action.boolean,
      dataSettings: action.data,
    };
  default:
    return state;
  }
};

export default trivia;
