import React from 'react';
import { Item } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

import CategoryLabel from '../../../../components/CategoryLabel';
import { postPropType } from '../../reducer';
import './style.css';

const PostCard = (props) => {
  let path = '';

  if (!_.isNil(props.category)) {
    path = path + '/category/' + props.category.params.categorySlug + '/' + props.category.params.categoryId;
  }

  path = path + '/post/' + props.post.slug + '/' + props.post.id;

  const featuredMedia = props.post._embedded['wp:featuredmedia'];

  return (
    <Item className="post-item">
      <Link to={path} className="post-link">
        <div>
          {props.post._embedded['wp:term'][0].map(category => (
            <CategoryLabel key={category.id} name={category.name} />
          ))}
        </div>
        {props.post.title && <Item.Header as="h1" dangerouslySetInnerHTML={{ __html: props.post.title.rendered }} />}
        <Item.Content>
          {props.post.featured_media ? (
            <div
              className="image"
              style={{
                backgroundImage: 'url(' + (_.isArray(featuredMedia) && !_.isNil(featuredMedia[0]) ? featuredMedia[0].source_url : '') + ')',
              }}
            />
          ) : null}
          <Item.Description dangerouslySetInnerHTML={{ __html: props.post.excerpt.rendered }} />
        </Item.Content>
      </Link>
    </Item>
  );
};

PostCard.propTypes = {
  post: postPropType.isRequired,
  category: PropTypes.shape({
    params: PropTypes.shape({
      categorySlug: PropTypes.string.isRequired,
      categoryId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default PostCard;
