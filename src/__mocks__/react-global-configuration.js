import React from 'react';

const settings = {
  export: {
    categories: 'http://localhost/wordpress-4.8.3/wordpress/wp-json/wp/v2/categories',
    posts: 'http://localhost/wordpress-4.8.3/wordpress/wp-json/wp/v2/posts',
    pages: 'http://localhost/wordpress-4.8.3/wordpress/wp-json/wp/v2/pages?_embed=media',
    comments: 'http://localhost/wordpress-4.8.3/wordpress/wp-json/wp/v2/comments',
    media: 'http://localhost/wordpress-4.8.3/wordpress/wp-json/wp/v2/media',
  },
  translate: {
    path: 'https://s3-eu-west-1.amazonaws.com/appticles-kit/others/locales3/en_EN.json',
    language: 'en',
  },
  socialMedia: {
    facebook: true,
    twitter: true,
    google: true,
  },
  'ga-id': 'UA-000000-01',
  websiteUrl: 'http://localhost/wordpress-4.8.3/wordpress?wmp_theme_mode=desktop',
  logo: 'http://localhost/wordpress-4.8.3/wordpress/wp-content/uploads/wordpress-mobile-pack/logo_1516880924.png',
};

class ReactGlobalConfiguration extends React.Component {
  render() {
    return null;
  }
}
ReactGlobalConfiguration.set = () => new Promise(() => true);
ReactGlobalConfiguration.get = param => param;
ReactGlobalConfiguration.settings = settings;

export default ReactGlobalConfiguration;
