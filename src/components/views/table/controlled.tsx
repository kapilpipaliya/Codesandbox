/*
 * Hey! quick question, onFetchData is getting called twice when using server-side pagination
 *
 * [9:42]
 * ```  <ReactTable
 * page={this.state.page}
 * data={this.props.data}
 * onPageChange={this.onPageChange}
 * columns={this.props.columns}
 * loading={this.props.loading}
 * defaultPageSize={this.props.pageSize}
 * minRows={0}
 * pageSizeOptions={[10, 25, 50, 100]}
 * noDataText=""
 * className="-striped"
 * resizable={false}
 * onFetchData={this.fetchData}
 * sorted={this.props.sorted}
 * manual
 * pages={this.props.pages}
 * />
 * ```
 * (edited)
 * [9:42]
 * ```    onPageChange(index) {
 * this.setState({
 * page: index
 * });
 * }
 * ```
 * The first time I hit the next button, state.page in onFetchData is 0, then it gets called again right after with the new state.page of 1 (from my onPageChange method) (edited)
 * any idea why it would be getting called twice?
 * My guess is that on page change, onFetchData is called (with the original state), then onPageChange is called, state is set, then onFetchData gets called again
 * I fixed my issue: onPageChange, onChangeSort, and onPageSizeChange all had to be manually managed, whilst keeping track of state of page and sort in the table itself
 *
 * wickedmuso [2:53 AM]
 * @devin Once you choose to use onFetchData, there is no need for `onPageChange` (as the page information is passed to `onFetchData` and you can set your state inside `onFetchData`.
 * You have two calls by using both.
 * devin : Gotcha, so I've just got to use one or the other
 * wickedmuso : yeah - primarily, `onPageChange` is just for simple use - if you head into `onFetchData` you are sort of controlling mostly everything about the data fetch there - similar with `onSortedChange` and `onFilteredChange` as all of these are passed to `onFetchData` as well
 *
 */
