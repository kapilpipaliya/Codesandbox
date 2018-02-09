import * as React from 'react';
import { pure, compose, lifecycle, withProps } from 'recompose';
import { inject } from 'mobx-react';
import { withStyles } from 'material-ui/styles';
import * as classnames from 'classnames';
import { observer, Observer } from 'mobx-react';
import { graphql, compose } from 'react-apollo';

import withFlashMessage from 'views/flash/withFlashMessage';
import { FLASH_MESSAGE } from 'queries/flash/flashMessageQuery';

const styles = {
  root: {
    // '@media print': {
    //   display: 'none',
    // }
  }
};

@observer
class FlashMessage extends React.Component<any, any> {

  private onClick = () => {
    this.props.deleteFlashMessage();
  }

  public render() {
    const { message } = this.props.data;
    if (!message) {
      return null;
    }
    const { type, text } = message;
    
    return (
      <div
        className={classnames('alert', {
          'alert-success': type === 'notice',
          'alert-danger': type === 'error',
        })}
      >
        <button onClick={this.onClick} className="close">
          <span>&times;</span>
        </button>
        {text}
      </div>
    );
  }
}

export default compose(
  graphql(FLASH_MESSAGE),
  withFlashMessage,
  withStyles(styles)
)(FlashMessage);