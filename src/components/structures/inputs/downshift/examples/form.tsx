import * as React from 'react';
import Basic from './basic';

class Examples extends React.Component {
  handleSubmit(evt) {
    evt.preventDefault();
    alert('Form submitted!');
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Basic />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Examples;
