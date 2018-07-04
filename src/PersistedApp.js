import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import PropTypes from 'prop-types';

import store, { persistor } from './configureStore';

const PersistedApp = (props) => {
  if (persistor !== null) {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {props.children}
        </PersistGate>
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      {props.children}
    </Provider>
  );
};

PersistedApp.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PersistedApp;
