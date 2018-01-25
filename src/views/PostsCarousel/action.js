import config from 'react-global-configuration';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export const requestPosts = () => ({
  type: REQUEST_POSTS,
});

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts,
});

export const fetchPosts = (params = {}) => (dispatch) => {
  dispatch(requestPosts());
  config.set(window.__INITIAL_CONFIG__, { freeze: false });

  let url;
  if (params && params.id) {
    url = config.get('export').posts + '/' + String(params.id);
  } else {
    url =
      config.get('export').posts +
      '?' +
      Object.keys(params)
        .map(k => k + '=' + encodeURIComponent(params[k]))
        .join('&');
  }
  return fetch(url)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(json)))
    .catch(() => {
      dispatch(receivePosts([]));
    });
};
