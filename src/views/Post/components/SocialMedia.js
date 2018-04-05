import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import config from 'react-global-configuration';

const SocialMedia = (props) => {
  // load social media app configuration
  const socialMedia = config.get('socialMedia');

  return (
    <div>
      {
        socialMedia.facebook ? (
          <a href={'https://m.facebook.com/sharer.php?u=' + props.link}>
            <Icon name="facebook f" size="large" circular inverted color="blue" />
          </a>
        ) : null
      }
      {
        socialMedia.twitter ? (
          <a href={'https://twitter.com/intent/tweet?text=' + encodeURIComponent(props.title) + ' ' + props.link}>
            <Icon name="twitter" size="large" circular inverted color="teal" />
          </a>
        ) : null
      }
      {
        socialMedia.google ? (
          <a href={'https://plus.google.com/share?url=' + props.link}>
            <Icon name="google plus" size="large" circular inverted color="red" />
          </a>
        ) : null
      }
    </div>
  );
};

SocialMedia.propTypes = {
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
export default SocialMedia;
