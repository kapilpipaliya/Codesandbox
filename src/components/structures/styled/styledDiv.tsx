import styled, { css } from 'styled-components';

export const Div = styled.div`
  width: 180px;
  border : solid 1px;
  background: darkgrey;
  margin-left : -1px;
  margin-top : -1px;
  
  ${(props) => props.background && css`
    background: ${props.background};
  `}
  
  ${(props) => props.width && css`
    width: ${props.width}px;
  `}
  
  ${(props) => (props.type == 'integer' || props.type == 'number') && css`
    background: skyblue;
  `}
  ${(props) => props.type == 'float' && css`
    background: skyblue;
  `}
  ${(props) => props.type == 'text' && css`
    background: skyblue;
  `}
  ${(props) => props.type == 'checkbox' && css`
    background: skyblue;
  `}

`;

export const renderFields = () => {
  const r = [];
  this.state.form.map((f) => {
    if (f.type == 'number') {
      r.push(<Div type={f.type}><label>{f.label}</label><InputNumber {...f.bind()} min={0} max={1000000} precision={0}/></Div>);
    } else if (f.type == 'float') {
      r.push(<Div type={f.type}><SimpleSelectMaterial field={f} /></Div>);
    } else if (f.type == 'text') {
      r.push(<Div type={f.type}><SimpleSelectMaterial field={f} /></Div>);
    } else if (f.type == 'checkbox') {
      r.push(<Div type={f.type}><SimpleSelectMaterial field={f} /></Div>);
    }
  });
  return r;
};
