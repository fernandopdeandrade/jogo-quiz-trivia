import React from 'react';
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import App from '../App'
import { act } from 'react-dom/test-utils';

describe('Settings', () => {
  it('testa se está na rota /settings', () => {
    const { history, store } = renderWithRouterAndRedux(<App />, {}, '/settings');
    expect(history.location.pathname).toBe('/settings');
    expect(store.getState().player.settingUser).toBe(false);
    expect(store.getState().player.dataSettings).toEqual({});

    const inputNumber = screen.getByTestId('inputNumberQuest');
    expect(inputNumber).toBeInTheDocument();

    userEvent.type(inputNumber, '10');
    expect(inputNumber.value).toBe('10');

    const inputCategory = screen.getByTestId('inputCategoryQuest');
    expect(inputCategory).toBeInTheDocument();

    userEvent.selectOptions(inputCategory, 'Entertainment: Books')
    expect(inputCategory.value).toBe('10');

    const inputQuestion = screen.getByTestId('inputQuestion');
    expect(inputQuestion).toBeInTheDocument();

    userEvent.selectOptions(inputQuestion, 'Medium');
    expect(inputQuestion.value).toBe('medium');

    const inputType = screen.getByTestId('inputType');
    expect(inputType).toBeInTheDocument();

    userEvent.selectOptions(inputType, 'Multiple Choice');
    expect(inputType.value).toBe('multiple');

    const btnSave = screen.getByRole('button', { name: /Salvar Configurações/i });
    expect(btnSave).toBeInTheDocument();

    userEvent.click(btnSave);
  })
})
