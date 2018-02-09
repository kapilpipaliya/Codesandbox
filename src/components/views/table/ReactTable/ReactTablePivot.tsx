import * as React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { observer } from 'mobx-react';

import SettingsButton from 'components/structures/buttons/Settings';

@observer
export default class RTable extends React.Component {
  constructor() {
    super();
    this.state = {
      pageSize: 1,
    };
  }
  
  componentDidMount() {
    // do the initial pageSize update
    this.updatePageSize();
  }

  componentDidUpdate(prevProps, prevState) {
    // note: prevProps and prevState are not required for this
    this.updatePageSize();
  }

  // make this a function so it can be called from anywhere
  updatePageSize = () => {
    // this.reactTable.getResolvedState() to get the internal state of your react-table instance
    // use the sortedData element (which is an array of the displayed data).
    // the 'sortedData' property contains the currently accessible records based on the filter and sort
    // we can implement export to excel with this data.
    const currentRecords = this.ref.getResolvedState().sortedData;

    // we just push all the IDs onto the selection array
    // console.log(currentRecords.length)
    const pageSize = currentRecords.length;
    if (this.state.pageSize != pageSize) {
      this.setState({ pageSize });
    }
  }
  
  render() {
    return (
      <>
      <SettingsButton/>
        <ReactTable
          defaultFiltered={[
            {
              id: '_destroy',
              value: false,
            },
          ]}
          defaultFilterMethod={(filter, row) =>
            (row[filter.id] === filter.value)}
          {...this.props}
          
          NoDataComponent={() => null}
          showPagination={false}
          collapseOnDataChange={false}
          noDataText=""
          manual
          sortable={false}
          filterable={false}
          defaultPageSize={5}
          className="-striped -highlight"
          resizable={false}
          
          ref={(r) => this.ref = r}
          pageSize={this.state.pageSize}
        />
      </>
    );
  }
}
