import * as React from 'react';
import { Button } from 'primereact/components/button/Button';
import Select from 'rc-select';
import * as Pagination from 'rc-pagination';
// import 'rc-pagination/assets/index.css';
import 'assets/stylesheets/rc-pagination.css';
import 'assets/stylesheets/rc-select.css';
import { observable, computed, action, extendObservable, runInAction } from 'mobx';
import { observer, Observer } from 'mobx-react';

@observer
export default class AllGemSizes extends React.Component {
  render() {
  return (
    <div>
      <Pagination 
        showTotal={(total, range) => `${range[0]} - ${range[1]} of ${total} items`}
        selectComponentClass={Select}
        showSizeChanger
        defaultPageSize={20}
        pageSizeOptions={['10', '20', '30', '40', '50']} 
        // onShowSizeChange={this.onShowSizeChange}
        defaultCurrent={1}
        // hideOnSinglePage
        
        total={this.props.total} 
        current={this.props.current} 
        pageSize={this.props.pageSize} 
        onChange={this.props.onChange}
        onShowSizeChange={this.props.onShowSizeChange}
      />
      
    </div>
  );}
  
}
