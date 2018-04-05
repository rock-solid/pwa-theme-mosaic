import config from 'react-global-configuration';

export const REQUEST_TRANSLATIONS = 'REQUEST_TRANSLATIONS';
export const RECEIVE_TRANSLATIONS = 'RECEIVE_TRANSLATIONS';

export const requestTranslations = () => ({
  type: REQUEST_TRANSLATIONS,
});

export const receiveTranslations = translations => ({
  type: RECEIVE_TRANSLATIONS,
  translations,
});

export const fetchTranslations = (dispatch) => {
  dispatch(requestTranslations());
  config.set(window.__INITIAL_CONFIG__, { freeze: false });

  return fetch(config.get('translate').path, {
    method: 'GET',
    header: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      mode: 'cors',
    },
  })
    .then(response => response.json())
    .then(json => dispatch(receiveTranslations(json)))
    .catch(() => {
      dispatch(receiveTranslations([]));
    });
};
