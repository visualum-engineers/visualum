
//react components
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import { Provider } from 'react-redux';
import store from './redux/store';
import * as serviceWorker from './serviceWorker';
import { RealmAppProvider } from './realm/RealmApp'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <RealmAppProvider appId={process.env["REACT_APP_REALM_APP_ID"]}>
        <App />
      </RealmAppProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
