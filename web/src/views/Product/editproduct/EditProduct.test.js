import React from 'react';
import ReactDOM from 'react-dom';
import EditProduct from './EditProduct';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddProduct />, div);
  ReactDOM.unmountComponentAtNode(div);
});
