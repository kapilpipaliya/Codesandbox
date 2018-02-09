import * as React from 'react';
import * as reject from 'lodash/reject';
import { extendObservable, runInAction, observable } from 'mobx'
// https://github.com/STRML/react-grid-layout/blob/master/test/examples/6-dynamic-add-remove.jsx
class GridLayoutStore {
  constructor() {
    extendObservable(this, {
      layout: [],
      components:[],
      className: "layout",
      cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
      rowHeight: 100,
      newCounter: 0
    })
  }
  
  createElement(el) {
      const removeStyle = {
        position: "absolute",
        right: "2px",
        top: 0,
        cursor: "pointer"
      };
      const i = el.add ? "+" : el.i;
      return (
        <div key={i} data-grid={el}>
          {el.add ? (
            <span
              className="add text"
              onClick={this.onAddItem}
              title="You can add an item by clicking here, too."
            >
              Add +
            </span>
          ) : 
            React.createElement(el.component, el.props)
          }
          <span
            className="remove"
            style={removeStyle}
            onClick={this.onRemoveItem.bind(this, i)}
          >
            x
          </span>
        </div>
      );
  }

  onAddItem(r) {
    runInAction(() => {
      /*eslint no-console: 0*/
      console.log("adding", "n" + this.newCounter);
        // Add a new item. It must have a unique key!
      this.layout= this.layout.concat({
        i: "n" + this.newCounter,
        x: (this.layout.length * 2) % (this.cols || 12), 
        y: Infinity, // puts it at the bottom
        w: 6,
        h: 4,
        component: r.component,
        params: r.params
      })
      // Increment the counter to ensure key is always unique.
      this.newCounter= this.newCounter + 1
    })
  }

  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange(breakpoint, cols) {
    runInAction(() => {
      // this.breakpoint= breakpoint,
      // this.cols= cols
    })
  }

  onLayoutChange(layout) {
    runInAction(() => {
      // this.props.onLayoutChange(layout);
      // this.layout.replace(layout)
    })
  }

  onRemoveItem(i) {
    runInAction(() => {
      console.log("removing", i);
      this.layout= this.layout.filter(o => o.i != i);
      // this.setState({ items: _.reject(this.state.items, { i: i }) });
    })
  }
  
  
  // @computed get filtered() {
  //   let filteredList = this.countriesList.filter(
  //     t=>t.name.toLowerCase().indexOf(this.filterTermValue)>-1
  //   );
    
  //   return filteredList;
  // }
  
  
}

export default GridLayoutStore
// <span className="text">{i}</span>