import React from 'react';
import { createRoot } from 'react-dom/client';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './app';

const mount = (
  el,
  { onSignIn, onNavigate, defaultHistory, initialPath = '/' }
) => {
  const history =
    defaultHistory ||
    createMemoryHistory(
      ({
        initialEntries: [initialPath],
      } = {})
    );

  if (onNavigate) {
    history.listen((update) => {
      onNavigate({ pathname: update.location.pathname });
    });
  }

  const root = createRoot(el);
  root.render(<App onSignIn={onSignIn} history={history} />);

  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;

      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

// If in development and in isolation, call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_auth-dev-root');

  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

export { mount };
