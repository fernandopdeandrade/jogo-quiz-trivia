export const triviaFetch = async () => {
  const request = await fetch(
    'https://opentdb.com/api_token.php?command=request',
  );
  const response = await request.json();
  return response;
};

export const triviaQuestions = async (token, numberQuestion) => {
  const request = await fetch(
    `https://opentdb.com/api.php?amount=${numberQuestion}&token=${token}`,
  );
  const response = await request.json();
  return response;
};

export async function triviaQuestionsSettings(parameters) {
  const request = await fetch(
    `https://opentdb.com/api.php?amount=${parameters.triviaAmount}&category=${parameters.trivia_category}&difficulty=${parameters.trivia_difficulty}&type=${parameters.trivia_type}`,
  );
  const response = await request.json();
  return response;
}

// export { triviaFetch, triviaQuestions };
