import config from 'react-global-configuration';

export const REQUEST_PAGES = 'REQUEST_PAGES';
export const RECEIVE_PAGES = 'RECEIVE_PAGES';

export const requestPages = () => ({
  type: REQUEST_PAGES,
});

export const receivePages = pages => ({
  type: RECEIVE_PAGES,
  pages,
});

export const fetchPages = (params = {}) => (dispatch) => {
  dispatch(requestPages());

  let url;
  if (params && params.id) {
    url = config.get('export').pages + '/' + String(params.id);
  } else {
    url =
      config.get('export').pages +
      '?' +
      Object.keys(params)
        .map(k => k + '=' + encodeURIComponent(params[k]))
        .join('&');
  }
  return fetch(url)
    .then(response => response.json())
    .then(json => dispatch(receivePages(json)))
    .catch(() => {
      dispatch(receivePages([]));
    });
};
