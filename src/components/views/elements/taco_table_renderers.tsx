import * as React from 'react';
import * as Numeral from 'numeral';
import * as moment from 'moment';

export const tacoIdRenderer = (column_name) => (cellData, { column, rowData }) => (rowData[column_name] ? rowData[column_name].slug : undefined);
export const tacoIntegerRenderer = (cellData, { column, rowData }) => Numeral(cellData).format('0,0');
export const tacoDecimalRenderer = (cellData, { column, rowData }) => Numeral(cellData).format('0.000');
export const tacoBooleanRenderer = (cellData, { column, rowData }) => cellData ? 'true' : 'false';
export const tacoDateRenderer = (cellData, { column, rowData }) => moment(cellData).format('DD/MM/YYYY');
export const tacoTdStyle = cellData => { return { border: `1px dashed`, }; };