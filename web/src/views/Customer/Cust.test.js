import React from 'react';
import ReactDOM from 'react-dom';
import Cust from './Cust';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Cust />, div);
  ReactDOM.unmountComponentAtNode(div);
});
