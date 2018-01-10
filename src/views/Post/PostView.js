import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { Container, Image, Header, Label, Icon } from 'semantic-ui-react';
import Moment from 'react-moment';

import { postPropType } from '../PostsCarousel/reducer';
import './style.css';

const PostView = (props) => {
  const { post } = props;
  const { author } = post._embedded;
  const categoriesList = post._embedded['wp:term'];
  const featuredMedia = post._embedded['wp:featuredmedia'];
  const history = createHistory();

  function getImage(sourceImg) {
    let imageSource;
    if (sourceImg) {
      imageSource = sourceImg[0].source_url;
      return imageSource;
    }
    imageSource = 'https://placeholdit.co//i/555x650';
    return imageSource;
  }

  return (
    <Container className="post">
      <Icon size="big" name="chevron left" onClick={history.goBack} />
      <Image src={getImage(featuredMedia)} />
      <Container textAlign="justified">
        {categoriesList[0].map(category => (
          <Label color="teal" key={category.name}>
            {category.name}
          </Label>
        ))}
        <Header>
          <div dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        </Header>
        <Header.Subheader>
          &nbsp;by&nbsp;<b>{author[0].name}</b>,&nbsp;<Moment format="MMMM DD, YYYY">{post.date}</Moment>
        </Header.Subheader>
        <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      </Container>
    </Container>
  );
};

PostView.propTypes = {
  post: postPropType.isRequired,
};

export default PostView;
