import config from 'react-global-configuration';

export const REQUEST_COMMENTS = 'REQUEST_COMMENTS';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';

export const requestComments = () => ({
  type: REQUEST_COMMENTS,
});

export const receiveComments = comments => ({
  type: RECEIVE_COMMENTS,
  comments,
});

export const fetchComments = (params = {}) => (dispatch) => {
  dispatch(requestComments());

  let url;
  if (params) {
    url =
      config.get('export').comments +
      '?' +
      Object.keys(params)
        .map(k => k + '=' + encodeURIComponent(params[k]))
        .join('&');
  }
  return fetch(url)
    .then(response => response.json())
    .then(json => dispatch(receiveComments(json)))
    .catch(() => {
      dispatch(receiveComments([]));
    });
};

export const addComment = (params = {}) => {
  fetch(config.get('export').comments, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ params }),
  });
};
