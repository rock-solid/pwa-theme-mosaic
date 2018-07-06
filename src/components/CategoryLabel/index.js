import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './style.css';

const CategoryLabel = (props) => {
  if (props.link !== null) {
    return (
      <Link to={props.link}>
        <span dangerouslySetInnerHTML={{ __html: props.name }} className="categories-labels" />
      </Link>
    );
  }

  return (<span dangerouslySetInnerHTML={{ __html: props.name }} className="categories-labels" />);
};

CategoryLabel.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string,
};

CategoryLabel.defaultProps = {
  link: null,
};

export default CategoryLabel;
