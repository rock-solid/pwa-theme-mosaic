import config from '../../config/config';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export const requestPosts = () => ({
  type: REQUEST_POSTS,
});

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts,
});

export const fetchPosts = (dispatch) => {
  dispatch(requestPosts());

  return fetch(config.API_POSTS_URL)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(json)))
    .catch(() => {
      dispatch(receivePosts([]));
    });
};
