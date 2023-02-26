import React from 'react';
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import App from '../App'

const INITIAL_STATE = {
  player: {
    name: 'alguém',
    score: 180,
    picture: 'https://www.gravatar.com/avatar/d7fff362fb6e9efd9f5f2295452a241a',
    token: 'eb785ccb31339a37c61b2acb5be5b599c13506d6d576799ebe39ca26c73e5ba8',
    assertions: 2,
    gravatarEmail: 'email@qualquer.com',
  },
};

describe('Testa a tela de Rankings', () => {
  it('Testa se esta na rota "/ranking"', () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/ranking');
    expect(history.location.pathname).toBe('/ranking')
  });

  it('Testa se existe um texto "Ranking" na página', () => {
    renderWithRouterAndRedux(<App />, {}, '/ranking');
    const rankingText = screen.getByText(/Ranking/i);
    expect(rankingText).toBeInTheDocument();
  });

  it('Testa se existe um botão que leva a página "/" home', () => {
    renderWithRouterAndRedux(<App />, {}, '/ranking');
    const homeButton = screen.getByTestId('btn-go-home');
    expect(homeButton).toBeInTheDocument();
  });

  it('Testa se clicar no botão "Home" será direcionado para a rota "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/ranking');
    const homeButton = screen.getByTestId('btn-go-home');
    userEvent.click(homeButton);
    expect(history.location.pathname).toBe('/');
  });

  it('Testa se existe um elemento "strong" com o texto "Pontuação final:"', () => {
    renderWithRouterAndRedux(<App />, {}, '/ranking');
    const strong = screen.getByText(/Pontuação final:/i);
    expect(strong).toBeInTheDocument();
  });

  it('Testa se existe um elemento "strong" com o texto "Nome do jogador"', () => {
    renderWithRouterAndRedux(<App />, {}, '/ranking');
    const strong = screen.getByText(/Nome do jogador/i);
    expect(strong).toBeInTheDocument();
  });

  it('Testa se as informações do jogador são exibidas corretamente na página', () => {
    const { store, history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/feedback');

    expect(history.location.pathname).toBe('/feedback');
    const rankBtn = screen.getByTestId('btn-ranking');

    userEvent.click(rankBtn);

    expect(history.location.pathname).toBe('/ranking');

    const { name, score, picture } = store.getState().player;
    const h2OneAndTwo = screen.getAllByRole('heading', { level: 2 });
    const img = screen.getByRole('img');

    expect(h2OneAndTwo[0]).toHaveTextContent(name);
    expect(h2OneAndTwo[1]).toHaveTextContent(score);
    expect(img).toHaveAttribute('src', picture, 'alt', name);
  });

  it('Testar a linha 38 do arquivo "Rankig.js"', () => {
    const { store, history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/ranking');
    expect(history.location.pathname).toBe('/ranking');
    console.log(store.getState().player);
    const { name, score, picture } = store.getState().player;
    const h2OneAndTwo = screen.getAllByRole('heading', { level: 2 });
    const img = screen.getByRole('img');

    expect(h2OneAndTwo[0]).toHaveTextContent(name);
    expect(h2OneAndTwo[1]).toHaveTextContent(score);
    expect(img).toHaveAttribute('src', picture, 'alt', name);
  });
});
