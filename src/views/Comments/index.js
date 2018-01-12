import 'react-router-modal/css/react-router-modal.css';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';
import _ from 'lodash';

import { fetchComments } from './actions';
import { getComments, getCommentsFetching } from './reducers';
import NotFound from '../../components/NotFound/index';
import CommentsView from './CommentsView';

class Comments extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchComments({ postId: this.props.match.params.postId }));
  }

  render() {
    console.log('this.props', this.props);

    const comm = this.props.comments.filter(comment => comment.post === Number(this.props.match.params.postId));

    if (this.props.loading === 1) {
      return <Loader active />;
    } else if (_.isNil(comm)) {
      return <NotFound />;
    }

    return <CommentsView comments={comm} match={this.props.match} />;
  }
}

Comments.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      postId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  loading: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  comments: getComments(state.comments),
  loading: getCommentsFetching(state.comments),
});

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ fetchComments }, dispatch));
}
export default connect(mapStateToProps, mapDispatchToProps)(Comments);
