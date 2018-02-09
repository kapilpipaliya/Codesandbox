import * as React from 'react';

class ImagePreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }

  mouseOver = () => {
    this.setState({ hover: true });
  }

  mouseOut = () => {
    this.setState({ hover: false });
  }

  render() {
    const { articleName, articleLink } = this.props;
    return (
      <div
        onMouseOver={this.mouseOver}
        onMouseLeave={this.mouseOut}
      >
        {articleName}
        {this.state.hover ? (
          <img
            style={{ position: 'absolute', zIndex: 500 }}
            src={articleLink}
          />
        ) : null}
      </div>
    );
  }
}

export default ImagePreview;
// https://codesandbox.io/s/lyy40rwkk7
// use it like this: Cell: row => <ImagePreview articleName={row.value} articleLink="http://www.quanmax.com/site/wp-content/uploads/2017/06/test.png" />
