import config from 'react-global-configuration';

export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

export const requestCategories = () => ({
  type: REQUEST_CATEGORIES,
});

export const receiveCategories = (categories, perPage = null) => ({
  type: RECEIVE_CATEGORIES,
  categories,
  perPage,
});

export const fetchCategories = (params = {}) => (dispatch) => {
  dispatch(requestCategories());

  let url;
  if (params) {
    url =
      config.get('export').categories +
      '?' +
      Object.keys(params)
        .map(k => k + '=' + encodeURIComponent(params[k]))
        .join('&');
  } else {
    url = config.get('export').categories;
  }

  return fetch(url)
    .then(response => response.json())
    .then(json => dispatch(receiveCategories(json, params.per_page)))
    .catch(() => {
      dispatch(receiveCategories([]));
    });
};
