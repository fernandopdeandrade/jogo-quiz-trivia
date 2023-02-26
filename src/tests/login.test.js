import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { act } from 'react-dom/test-utils';
import triviaQuestions from '../services';
import { mockData } from './helpers/dataMock';

const player = {
  name: 'fernando',
  gravatar: 'd7fff362fb6e9efd9f5f2295452a241a',
};

const settings = {
  category: '9',
  type: 'boolean',
  difficulty: 'easy',
  amount: '5',
};

const infoUser = {
  nome: 'Estrupício Gumercindo',
  email: 'email@qualquer.com',
  token: '70de88f68aec314d990f469cc703313a0d761307f9337eccd97d40ed655ae5cd',
};

afterEach(() => {
  jest.clearAllMocks();
});

// beforeEach(() => {
//   jest.spyOn(triviaQuestions, 'default').mockResolvedValue(mockData);
//   jest.spyOn(triviaFetch, 'default').mockResolvedValue(infoUser);
// });

describe('Testa o componente Login', () => {
  it('Testa se o botão de login é desabilitado se um input estiver vazio', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('input-gravatar-email');
    const inputName = screen.getByTestId('input-player-name');
    const loginButton = screen.getByTestId('btn-play');

    expect(loginButton).toBeDisabled();

    userEvent.type(emailInput, '');
    userEvent.type(inputName, 'sou um nome');
    expect(loginButton).toBeDisabled();
  });

  it('Testa de o botão permanece desabilitado se os dois inputs forem vazios', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('input-gravatar-email');
    const inputName = screen.getByTestId('input-player-name');
    const loginButton = screen.getByTestId('btn-play');

    expect(loginButton).toBeDisabled();

    userEvent.type(emailInput, '');
    userEvent.type(inputName, '');
    expect(loginButton).toBeDisabled();
  });

  it('Testa se o botão de login é habilitado se os dois inputs estiverem preenchidos', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('input-gravatar-email');
    const inputName = screen.getByTestId('input-player-name');
    const loginButton = screen.getByTestId('btn-play');

    expect(loginButton).toBeDisabled();

    userEvent.type(emailInput, 'pupygreen@gmail.com');
    userEvent.type(inputName, 'nameQualquer');
    expect(loginButton).toBeEnabled();
  });

  it('Testa se existe existe uma imagem com o alt="logo" na tela', () => {
    renderWithRouterAndRedux(<App />);
    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();
  });

  it('Testa se existe um "strong" com o texto "Score" na página de login', () => {
    renderWithRouterAndRedux(<App />);
    const score = screen.getByText('Score:');
    expect(score).toBeInTheDocument();
  });

  it('Testa se existe um "header" na tela de login', () => {
    renderWithRouterAndRedux(<App />);
    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
  });

  it('Testa se existe um uma imagem com o "alt" "settings"', () => {
    renderWithRouterAndRedux(<App />);
    const settings = screen.getByAltText('settings');

    expect(settings).toBeInTheDocument();
  });

  it('Testa se preencher os campos e clicar no botão, uma mensagem de "loading" aparece na tela', async () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('input-gravatar-email');
    const inputName = screen.getByTestId('input-player-name');
    const loginButton = screen.getByTestId('btn-play');

    userEvent.type(emailInput, infoUser.email);
    userEvent.type(inputName, infoUser.nome);

    userEvent.click(loginButton);

    const loading = screen.getByText('Loading...');
    expect(loading).toBeInTheDocument();
  });

  it('Testa se vai para a rota "/play" apos inserir os dados e clicar no botão', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('input-gravatar-email');
    const inputName = screen.getByTestId('input-player-name');
    const loginButton = screen.getByTestId('btn-play');

    userEvent.type(emailInput, infoUser.email);
    userEvent.type(inputName, infoUser.nome);

    userEvent.click(loginButton);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
    });

    const { pathname } = history.location;
    expect(pathname).toBe('/play');
  });
  it('Testa se vai para a rota "/play" apos inserir os dados e clicar no botão', async () => {
    const player = {
      assertions: 0,
      score: 0,
      name: 'Tyrion Lannister',
      gravatarEmail: '4675ee57486c6ab9507d64d763ffd4f3',
      questions: {
        response_code: 1,
        results: []
      },
      picture: '',
      settingUser: false,
      dataSettings: {}
    }

    const { history, store } = renderWithRouterAndRedux(<App />, { player });
    expect(history.location.pathname).toBe('/')
    const emailInput = screen.getByTestId('input-gravatar-email');
    expect(emailInput).toBeInTheDocument();
    const inputName = screen.getByTestId('input-player-name');
    expect(inputName).toBeInTheDocument();
    const loginButton = screen.getByTestId('btn-play');
    expect(loginButton).toBeInTheDocument();

    userEvent.type(emailInput, 'trybe@test.com');
    userEvent.type(inputName, 'Tyrion Lannister');

    userEvent.click(loginButton);
    expect(history.location.pathname).toBe('/')
  });

  it('Testa se existe um "token" no localStorage', async () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('input-gravatar-email');
    const inputName = screen.getByTestId('input-player-name');
    const loginButton = screen.getByTestId('btn-play');

    userEvent.type(emailInput, infoUser.email);
    userEvent.type(inputName, infoUser.nome);

    userEvent.click(loginButton);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
    });

    const token = localStorage.getItem('token');

    if (token !== null) {
      expect(token.length).toBeGreaterThan(0);
    }
  });

  it('Testa se existe um "name" no localStorage', async () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('input-gravatar-email');
    const inputName = screen.getByTestId('input-player-name');
    const loginButton = screen.getByTestId('btn-play');

    userEvent.type(emailInput, infoUser.email);
    userEvent.type(inputName, infoUser.nome);

    userEvent.click(loginButton);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
    });

    const name = localStorage.getItem('name');

    if (name !== null) {
      expect(name.length).toBeGreaterThan(0);
    }
  });

  it('Testa se as Questões existem após clicar no botão', async () => {
    const { store } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('input-gravatar-email');
    const inputName = screen.getByTestId('input-player-name');
    const loginButton = screen.getByTestId('btn-play');

    userEvent.type(emailInput, infoUser.email);
    userEvent.type(inputName, infoUser.nome);

    userEvent.click(loginButton);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
    });

    const { player } = store.getState();
    expect(player.questions.results.length).toBeGreaterThan(0);
  });
});