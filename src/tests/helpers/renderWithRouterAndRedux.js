import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../../redux/reducers';

export const renderWithRouterAndRedux = (component, initialState, route = '/') => {
  const store = createStore(reducer, initialState, applyMiddleware(thunk));
  const history = createMemoryHistory({ initialEntries: [route] });

  // const localStorageMock = (() => {
  //   let store = {};
  //   return {
  //     getItem: (key) => store[key],
  //     setItem: (key, value) => {
  //       store[key] = value.toString();
  //     }

  //   }
  // })();

  // Object.defineProperty(window, 'localStorage', { value: localStorageMock });

  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>
          {component}
        </Router>
      </Provider>
    ),
    history,
    store,
  };
};

export default renderWithRouterAndRedux;
