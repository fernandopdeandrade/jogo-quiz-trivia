import React from 'react';
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import App from '../App'

describe('Testa o header da aplicação', () => {
  it('Testa se existe um header na página "feedback"', () => {
    renderWithRouterAndRedux(<App />, {}, '/');

    const header = screen.getByTestId('header');
    const img = screen.getByTestId('header-profile-picture');
    const h2 = screen.getByTestId('header-player-name');
    const imageSettings = screen.getByAltText('settings');

    expect(header).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(h2).toBeInTheDocument();
    expect(imageSettings).toBeInTheDocument();
  });

  it('Testa se ao clicar em settings será direcionado para a rota "/settings"', () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/');
    const imageSettings = screen.getByAltText('settings');

    expect(imageSettings).toBeInTheDocument();

    userEvent.click(imageSettings);

    expect(history.location.pathname).toBe('/settings');
  });
});
