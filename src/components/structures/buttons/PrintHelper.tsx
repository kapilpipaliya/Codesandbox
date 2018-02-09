import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Button from 'components/structures/buttons/Button';
import $ from 'assets/stylesheets/styles';

export default class PrintableReportComponent extends React.Component {

  clickHandler = (print) => {
    const w = window.open(); 
    const l = w.document.createElement('link'); 
    l.setAttribute('rel', 'stylesheet'); 
    l.setAttribute('href', 'URLtoCSS'); 
    w.document.head.appendChild(l);
    ReactDOM.render(print, w.document.body);
    w.print();
  }

  render() {
    return(
      <div ref={(input) => { this.printPart = input; }}>
      
      <Button
        onlyIcon
        text="Print"
        type="button"
        icon="print"
        label="Print"
        onClick={() => this.clickHandler(this.props.print)}
        className={$.fctrl}
      />
      </div>
      );
  }
}
