// 1. Do not use React State in this File
// 2. Use Pure Function.
// 3. Use Recompose HOC for more control.

import * as React from 'react';
import { pure, compose, lifecycle, withProps } from 'recompose';
import { BreadCrumb } from 'primereact/components/breadcrumb/BreadCrumb';
import TableViewControls from 'components/views/controls/TableViewControls';
import { inject } from 'mobx-react';

const AllPure = (props) => {
  const SessionStore = props.SessionStore;
  const currentPage = props.SessionStore.currentPage;
  
  const pageHash = props.SessionStore[currentPage];
  
  const data = pageHash.data;
  // const { loading, error, allMfgPriorities, prioritiesCount, loadMorePriorities, currentUser, destroyPriority } = pageHash
  const { error, allMfgPriorities, prioritiesCount, loadMorePriorities, currentUser, destroyPriority } = pageHash;
  const List = pageHash.table;
  const HeadList = pageHash.headList;
  const headerName = pageHash.headerName;
  const loading = pageHash.loading;

  // if (error) {
  //   return <div>An unexpected error occurred</div>;
  // }
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <BreadCrumb model={[{label: headerName, url: ''}]}/>
      <h1>{headerName}</h1>
      <HeadList />
      <TableViewControls/>
      <List loading={loading} error={error} data={data} count={data.length} loadMore={loadMorePriorities} currentUser={currentUser} destroyRow={destroyPriority} />
    </div>
  );
};

export default inject('SessionStore')(compose(
  pure,
  lifecycle({
    // componentDidMount() {
    //   // this.props.priorities.refetch(); // You can pass variables here.
    // }
  })
)(AllPure));
