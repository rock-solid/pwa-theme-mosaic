import config from '../../config/config';

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
      config.API_COMMENTS_URL +
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
  fetch(config.API_COMMENTS_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ params }),
  });
};
