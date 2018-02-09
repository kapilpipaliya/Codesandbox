import * as React from 'react';
import { branch } from 'recompose';

/*
 * Branch returns a HOC, which accepts a component and return a component, so branch(...) is a HOC and branch(...)(...) is a component.
 * https://stackoverflow.com/questions/42843891/using-branch-from-recompose
 * this is HOC and should return a component.
 */
const wrapEmpty = (WrappedComponent) => (props) => <span>---</span>
    ;

// This is HOC and should return a component.
const wrapInput = (WrappedComponent) => (props) => {
  const newProps = { ...props, visible: undefined };
  return <WrappedComponent {...newProps} />;
};

export default branch(
  ({visible}) => visible === false,
  wrapEmpty,
  wrapInput
);
