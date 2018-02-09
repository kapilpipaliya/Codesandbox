import * as React from 'react';
// Note From <GreenJello> :
// you could make a high order component that passes stuff as props and maintains the state itself
const PaginationHOC = (InnerComponent) => class extends React.Component {
  @observable currentPage = 0;
  @observable pageSize = 50;
  @action onChange = (table) => (currentPage, pageSize) => {
    this.currentPage= currentPage;
    this.pageSize= pageSize;
    table.refetch({page: currentPage, per: pageSize});
  }
  @action onShowSizeChange = (table) => (currentPage, pageSize) => {
    this.currentPage= currentPage;
    this.pageSize= pageSize;
    table.refetch({page: currentPage, per: pageSize});
  }

  render() {
    return (
      <InnerComponent
        {...this.props}
        currentPage={this.currentPage}
        pageSize={this.pageSize}
        onChange={this.onChange)
        onShowSizeChange={this.onShowSizeChange)
      />
    );
  }
};

export default PaginationHOC;
