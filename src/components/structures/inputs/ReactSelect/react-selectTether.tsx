/*
 * Nehero commented on Mar 7
 * I ran into the same problem as @burtyish. (before actually reading his comment) I found a fix that works for the regular react-select (haven't tested creatable/async) that doesn't use react-dimensions
 */

import * as React from 'react';
import Select from 'react-select';
import * as TetherComponent from 'react-tether';

/** From https://github.com/JedWatson/react-select/issues/810#issuecomment-250274937 **/
export default class TetheredSelectWrap extends Select {

  constructor(props) {
    super(props);

    this.renderOuter = this._renderOuter;
  }

  _renderOuter() {
    const menu = super.renderOuter.apply(this, arguments);

    // Don't return an updated menu render if we don't have one
    if (!menu) {
      return;
    }

    /** This.wrapper comes from the ref of the main Select component (super.render()) **/
    const selectWidth = this.wrapper ? this.wrapper.offsetWidth : null;

    return (
      <TetherComponent
        renderElementTo="body"
        ref="tethered-component"
        attachment="top left"
        targetAttachment="top left"
        constraints={[
          {
            'to': 'window',
            'attachment': 'together',
            'pin': ['top']
          }
        ]}
      >
        {/* Apply position:static to our menu so that it's parent will get the correct dimensions and we can tether the parent */}
        <div></div>
        {React.cloneElement(menu, {
          'style': {
            'position': 'static',
            'width': selectWidth
          }
        })}
      </TetherComponent>
    );
  }

}
