import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Loader, Header, Icon } from 'semantic-ui-react';
import _ from 'lodash';
import ReactPullToRefresh from 'react-pull-to-refresh';
import 'react-router-modal/css/react-router-modal.css';

import { fetchComments } from './actions';
import { getComments, getCommentsFetching, commentPropType } from './reducers';
import CommentsView from './components/CommentsView';

// translations
import { fetchTranslations } from '../../translations/actions';
import { getTranslations, getTranslationsFetching } from '../../translations/reducers';

import './style.css';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchComments({ postId: this.props.match.params.postId, per_page: 100 }));
    dispatch(fetchTranslations);
  }

  handleRefresh(resolve, reject) {
    const { dispatch } = this.props;

    if (dispatch(fetchComments({ postId: this.props.match.params.postId, per_page: 100 }))) {
      resolve();
    } else {
      reject();
    }
  }

  render() {
    const comm = this.props.comments.filter(comment => comment.post === Number(this.props.match.params.postId));

    let path = '';
    if (!_.isNil(this.props.match.params.categorySlug) && !_.isNil(this.props.match.params.categoryId)) {
      path = '/category/' + this.props.match.params.categorySlug + '/' + this.props.match.params.categoryId;
    }

    path = path + '/post/' + this.props.match.params.postSlug + '/' + this.props.match.params.postId;

    return (
      <div className="comments-container">
        <Header as="h3" block className="comments-header">
          {this.props.translations.TEXTS && this.props.translations.TEXTS.COMMENTS}
          <Link to={path}>
            <Icon name="close" />
          </Link>
        </Header>
        {this.props.loading === 1 && this.props.loadingTranslations === 1 ? (
          <Loader active />
        ) : (
          <ReactPullToRefresh onRefresh={this.handleRefresh}>
            <CommentsView
              comments={comm}
              loading={this.props.loading}
              postId={this.props.match.params.postId}
              commentStatus={this.props.match.params.commentStatus}
              texts={this.props.translations}
            />
          </ReactPullToRefresh>
        )}
      </div>
    );
  }
}

Comments.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      categoryId: PropTypes.string.isRequired,
      categorySlug: PropTypes.string.isRequired,
      postId: PropTypes.string.isRequired,
      postSlug: PropTypes.string.isRequired,
      commentStatus: PropTypes.oneOf(['open', 'closed', 'disabled']).isRequired,
    }).isRequired,
  }).isRequired,
  loading: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf(commentPropType).isRequired,
  loadingTranslations: PropTypes.number.isRequired,
  translations: PropTypes.shape({
    TEXTS: PropTypes.shape({
      COMMENTS: PropTypes.string,
    }),
  }),
};

Comments.defaultProps = {
  translations: {
    TEXTS: {
      COMMENTS: 'Comments',
    },
  },
};

const mapStateToProps = state => ({
  comments: getComments(state.comments),
  loading: getCommentsFetching(state.comments),
  translations: getTranslations(state.translations),
  loadingTranslations: getTranslationsFetching(state.translations),
});

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ fetchComments, fetchTranslations }, dispatch));
}
export default connect(mapStateToProps, mapDispatchToProps)(Comments);
