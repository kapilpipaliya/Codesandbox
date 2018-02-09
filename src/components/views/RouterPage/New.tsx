// 1. Do not use React State in this File
// 2. Use Pure Function.
// 3. Use Recompose HOC for more control.
import * as React from 'react';
import { inject } from 'mobx-react';
// import MobxReactFormDevTools from 'mobx-react-form-devtools';
import Button from 'material-ui/Button';
import StyleForm from 'logic/_Form';
import withCreateStyle from 'mutations/design/styles/createStyleMutation';

// const newStyleForm = new MyForm({ ...styleForm });
// MobxReactFormDevTools.register({ newStyleForm });
// MobxReactFormDevTools.select('newStyleForm');
// MobxReactFormDevTools.open(true);

const NewStylePure = ({ createStyle, route, router }) => {
    return (
      <div>
        <Button variant="raised" color="primary" onClick={router._history.goBack}>Back</Button>
        <h1 style={{fontSize: 'larger'}}>New Style</h1>
        <StyleForm action={createStyle} submitName="Create Style" />
      </div>
    );
};

export default inject('router')(withCreateStyle(NewStylePure));
