import * as React from 'react';
import ScrollArea from 'react-scrollbar';
export default (value) => <ScrollArea ><pre>{JSON.stringify(value, null, 2)}</pre></ScrollArea >;
