import React from 'react';
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import App from '../App'
import { act } from 'react-dom/test-utils';

describe('Testa a tela de feedbacks', () => {
  it('Testa se existe um header na página "feedback"', () => {
    renderWithRouterAndRedux(<App />, {}, '/feedback');

    const header = screen.getByTestId('header');
    const img = screen.getByTestId('header-profile-picture');
    const h2 = screen.getByTestId('header-player-name');
    const imageSettings = screen.getByAltText('settings');

    expect(header).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(h2).toBeInTheDocument();
    expect(imageSettings).toBeInTheDocument();
  });

  test('Testa se a mensagem "Could be better..." aparece na tela caso a pessoa acerte menos de 3 perguntas', () => {
    const INITIAL_STATE = {
      player: {
        name: 'alguém',
        assertions: 2,
        gravatarEmail: 'alguem@alguem.com',
        score: 173,
      }
    };

    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/feedback');
    expect(history.location.pathname).toBe('/feedback')

    const couldBeBetterMessage = screen.getByTestId('feedback-text');
    expect(couldBeBetterMessage).toBeInTheDocument();
    expect(couldBeBetterMessage).toHaveTextContent(/Could be better.../i)
  });

  test('Testa se a mensagem "Well Done!..." aparece na tela caso a pessoa acerte todas as perguntas', () => {
    const INITIAL_STATE = {
      player: {
        name: 'alguém',
        assertions: 5,
        gravatarEmail: 'alguem@alguem2.com',
        score: 296,
      }
    };

    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/feedback');
    expect(history.location.pathname).toBe('/feedback')

    const wellDoneMessage = screen.getByTestId('feedback-text');
    expect(wellDoneMessage).toBeInTheDocument();
    expect(wellDoneMessage).toHaveTextContent(/Well Done!/i)
  });

  test('Testa se elementos estão presentes na página de feedback', async () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/feedback');
    const h1 = screen.getByRole('heading', { name: /Could be better.../i });
    const h2 = screen.getByTestId('feedback-total-score');
    const h3 = screen.getByTestId('feedback-total-question');

    expect(history.location.pathname).toBe('/feedback')
    expect(h1).toBeInTheDocument();
    expect(h2).toBeInTheDocument();
    expect(h3).toBeInTheDocument();
    // console.log(history.location.pathname)
  })

  it('Testa se existem dois botões na página feedback', () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/feedback');
    const button1 = screen.getByRole('button', { name: /Play Again/i });
    const button2 = screen.getByRole('button', { name: /Ranking/i });

    expect(history.location.pathname).toBe('/feedback')
    expect(button1).toBeInTheDocument();
    expect(button2).toBeInTheDocument();
  });

  it('Testa se clicar no botão "Play Again" será direcionado para a rota "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/feedback');
    const button1 = screen.getByRole('button', { name: /Play Again/i });

    expect(history.location.pathname).toBe('/feedback')
    expect(button1).toBeInTheDocument();

    userEvent.click(button1);

    expect(history.location.pathname).toBe('/');
    // console.log(history.location.pathname)
  });

  it('Testa se é clicar em Ranking vai pra página "/ranking"', () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/feedback');
    const button2 = screen.getByRole('button', { name: /Ranking/i });

    expect(history.location.pathname).toBe('/feedback')
    expect(button2).toBeInTheDocument();

    userEvent.click(button2);

    expect(history.location.pathname).toBe('/ranking');
    // console.log(history.location.pathname)
  });
});
