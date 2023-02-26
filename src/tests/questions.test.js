import React from 'react';
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import App from '../App'
import { mockData } from './helpers/dataMock'
import { act } from 'react-dom/test-utils';
import { triviaQuestionsSettings } from '../services';

const player = {
  name: 'fernando',
  gravatarEmail: 'd7fff362fb6e9efd9f5f2295452a241a',
};

const settings = {
  category: '9',
  type: 'boolean',
  difficulty: 'easy',
  amount: '5',
};

afterEach(() => {
  jest.clearAllMocks();
});

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });
});

describe('Teste o componente <Questions />', () => {
  it('Teste se é renderizado a rota "/play" após clicar no botão', async () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/');
    expect(history.location.pathname).toBe('/');

    const emailInput = screen.getByTestId('input-gravatar-email');
    const inputName = screen.getByTestId('input-player-name');

    userEvent.type(emailInput, player.gravatarEmail);
    userEvent.type(inputName, player.name);

    const loginButton = screen.getByTestId('btn-play');

    act(() => {
      userEvent.click(loginButton);
    });

    const loading = screen.getByText('Loading...');
    expect(loading).toBeInTheDocument();

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
    });

    const { pathname } = history.location;
    expect(pathname).toBe('/play');

    const strongText = screen.getByText('Timer:');
    const spanTimer = screen.getByText('30');

    expect(strongText).toBeInTheDocument();
    expect(spanTimer).toBeInTheDocument();

    const playerName = screen.getByTestId('header-player-name');
    expect(playerName).toHaveTextContent(player.name);

    const h3Question = screen.getByTestId('question-category');
    expect(h3Question).toBeInTheDocument();
    expect(h3Question).toHaveTextContent('Entertainment: Video Games');

    const question = screen.getByTestId('question-text');
    expect(question).toBeInTheDocument();
    expect(question).toHaveTextContent('What is the first weapon you acquire in Half-Life?');

    const buttonOne = screen.getByRole('button', { name: /A crowbar/i });
    expect(buttonOne).toBeInTheDocument();

    const buttonTwo = screen.getByRole('button', { name: /A pistol/i });
    expect(buttonTwo).toBeInTheDocument();

    const buttonThree = screen.getByRole('button', { name: /The H.E.V suit/i });
    expect(buttonThree).toBeInTheDocument();

    const buttonFour = screen.getByRole('button', { name: /Your fists/i });
    expect(buttonFour).toBeInTheDocument();

    act(() => {
      userEvent.click(buttonOne);
    });

    const nextButton = screen.getByTestId('btn-next');
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toHaveTextContent('Próxima pergunta');

    act(() => {
      userEvent.click(nextButton);
    });

    const h3QuestionTwo = screen.getByTestId('question-category');
    expect(h3QuestionTwo).toBeInTheDocument();
    expect(h3QuestionTwo).toHaveTextContent('Entertainment: Video Games');

    const questionTwo = screen.getByTestId('question-text');
    expect(questionTwo).toBeInTheDocument();
    expect(questionTwo).toHaveTextContent('TF2: Sentry rocket damage falloff is calculated based on the distance between the sentry and the enemy, not the engineer and the enemy');

    const buttonOneTwo = screen.getByRole('button', { name: /True/i });
    expect(buttonOneTwo).toBeInTheDocument();
    expect(buttonOneTwo).toHaveTextContent('True');

    const buttonTwoTwo = screen.getByRole('button', { name: /False/i });
    expect(buttonTwoTwo).toBeInTheDocument();
    expect(buttonTwoTwo).toHaveTextContent('False');

    act(() => {
      userEvent.click(buttonTwoTwo);
    });

    const nextButtonTwo = screen.getByTestId('btn-next');
    expect(nextButtonTwo).toBeInTheDocument();
    expect(nextButtonTwo).toHaveTextContent('Próxima pergunta');

    act(() => {
      userEvent.click(nextButtonTwo);
    });

    const h3QuestionThree = screen.getByTestId('question-category');
    expect(h3QuestionThree).toBeInTheDocument();
    expect(h3QuestionThree).toHaveTextContent('Entertainment: Film');

    const questionThree = screen.getByTestId('question-text');
    expect(questionThree).toBeInTheDocument();
    expect(questionThree).toHaveTextContent('In the 1984 movie &quot;The Terminator&quot;, what model number is the Terminator portrayed by Arnold Schwarzenegger?');

    const buttonOneThree = screen.getByRole('button', { name: /I-950/i });
    expect(buttonOneThree).toBeInTheDocument();
    expect(buttonOneThree).toHaveTextContent('I-950');

    const buttonTwoThree = screen.getByRole('button', { name: /T-888/i });
    expect(buttonTwoThree).toBeInTheDocument();
    expect(buttonTwoThree).toHaveTextContent('T-888');

    const buttonThreeThree = screen.getByRole('button', { name: /T-1000/i });
    expect(buttonThreeThree).toBeInTheDocument();
    expect(buttonThreeThree).toHaveTextContent('T-1000');

    const buttonFourThree = screen.getByRole('button', { name: /T-800/i });
    expect(buttonFourThree).toBeInTheDocument();
    expect(buttonFourThree).toHaveTextContent('T-800');

    act(() => {
      userEvent.click(nextButtonTwo);
    });

    expect(screen.getByText('Science: Computers')).toBeInTheDocument();
    expect(screen.getByText('Which of these is the name for the failed key escrow device introduced by the National Security Agency in 1993?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Clipper Chip/i }));
    userEvent.click(screen.getByRole('button', { name: /Clipper Chip/i }));

    act(() => {
      userEvent.click(nextButtonTwo);
    });

    expect(screen.getByText('Entertainment: Video Games')).toBeInTheDocument();
    expect(screen.getByText('TF2: Sentry rocket damage falloff is calculated based on the distance between the sentry and the enemy, not the engineer and the enemy')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /False/i }));
    userEvent.click(screen.getByRole('button', { name: /False/i }));

    act(() => {
      userEvent.click(nextButtonTwo);
    });
    act(() => {
      userEvent.click(nextButtonTwo);
    });

    const feeedBackScore = screen.getByText(/Total de pontos:/i);
    expect(feeedBackScore).toBeInTheDocument();

    const feedBackAssertions = screen.getByText(/Número de acertos:/i);
    expect(feedBackAssertions).toBeInTheDocument();

    const buttonAgain = screen.getByRole('button', { name: /Play Again/i });
    expect(buttonAgain).toBeInTheDocument();

    const buttonRanking = screen.getByRole('button', { name: /Ranking/i });
    expect(buttonRanking).toBeInTheDocument();
    userEvent.click(buttonRanking)

    const rankingName = screen.getByTestId('player-name-0');
    expect(rankingName).toBeInTheDocument();
    const rankingScore = screen.getByTestId('player-score-0');
    expect(rankingScore).toBeInTheDocument();
    const btnPlayAgain = screen.getByTestId('btn-go-home');
    expect(btnPlayAgain).toBeInTheDocument();

    userEvent.click(btnPlayAgain);
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
  });

  test('Testa se clicar no botão de configuração, será direcionado para a rota "/settings"', async () => {
    const { history, store } = renderWithRouterAndRedux(<App />);

    const settingsButton = screen.getByTestId('btn-settings');
    expect(settingsButton).toBeInTheDocument();
    userEvent.click(settingsButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/settings');

    const h1Text = screen.getByRole('heading', { name: /Configurações/i });
    expect(h1Text).toBeInTheDocument();

    const numberQuestions = screen.getByText(/Número de questões:/i);
    expect(numberQuestions).toBeInTheDocument();

    const category = screen.getByText(/Categoria:/i);
    expect(category).toBeInTheDocument();

    const difficulty = screen.getByText(/Dificuldade:/i);
    expect(difficulty).toBeInTheDocument();

    const type = screen.getByText(/Estilo de perguntas:/i);
    expect(type).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /Salvar Configurações/i });
    expect(button).toBeInTheDocument();
  });
});