import * as React from 'react';
import { TacoTable, DataType, Formatters } from 'react-taco-table';
import 'react-taco-table/dist/react-taco-table.css';
// import './ReactTable.css';
import { observer } from 'mobx-react';

@observer
export default class RTable extends React.Component {

  render() {
    const { columns, ...props } = this.props;
    return (
      <>
        <TacoTable {...this.props} columns={columns}  />;
      </>
    );
  }
}
