import * as React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { withStyles } from 'material-ui/styles';
import { observer } from 'mobx-react';

const styles = theme => ({
  root: {
    padding: '0px !important', // why this is not working?
  },
});

@observer
class RTable extends React.Component {
  constructor() {
    super();
    this.state = {
      // get your data from "wherever"
      // data: makeData(),
      // add a variable for the input field
      columnName: '',
      // ensure your columns are in controlled state
      // columns: []
    };
  }
  
  // create a handler for the input field changes`
  updateColumnName = (e) => {
    const columnName = e.target.value;
    this.setState({ columnName });
  }
  // add a column to the columns in the state
  addColumn = () => {
    // take a copy - never modify state directly
    const columns = [...this.state.columns];
    // create the new column with the name from the input
    // probably should put better checks here
    const column = {
      // maybe something like first letters uppercase??
      Header: this.state.columnName.toUpperCase(),
      // add the accessor name based on the new column
      accessor: this.state.columnName,
    };
    // add it to the array
    columns.push(column);
    // update the state and clear out the column name variable
    this.setState({ columns, columnName: '' });
  }
  
  trProps = {
    onContextMenu: (e) => {
      // console.log('funky context');
      e.preventDefault();
      return false;
    }
  };

  render() {
    const { columns, ...props } = this.props;
    const { classes } = this.props;
    return (
      <>

      <ReactTable
        defaultFiltered={[
          {
            id: '_destroy',
            value: false,
          },
        ]}
        defaultFilterMethod={(filter, row) =>
          (row[filter.id] === filter.value)}

        NoDataComponent={() => null}
        showPagination={false}
        collapseOnDataChange={false}
        noDataText=""
        manual
        sortable={false}
        filterable={false}
        defaultPageSize={20}
        className="-striped -highlight"
        getTrProps={() => this.trProps}
        getTdProps={() => { return { className: classes.root }; }}
        
        columns={columns}
        {...this.props}
      />
      </>
    );
  }
}

export default withStyles(styles)(RTable);
// noDataText=''
// manual // informs React Table that you'll be handling sorting and pagination server-side

// React-Table - Column Adding
// https://codesandbox.io/s/pmqqxnmqlj

      // <input placeholder="column name" onChange={this.updateColumnName} value={this.state.columnName} />
      // <button onClick={this.addColumn}>Add Column</button>
      // <br/>
      // Existing Fields: {' '}
      // {
      //   Object.keys(data[0]).filter((item)=>item!='children').join(', ').trim()
      // }
      
// keep data and presentationl part keep seperate. many benifits.
// width: undefined, // A hardcoded width for the column

// styleName='table'