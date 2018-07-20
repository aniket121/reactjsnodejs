import React from 'react';
import ReactDOM from 'react-dom';
import ViewGroup from './ViewGroup';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ViewOrder />, div);
  ReactDOM.unmountComponentAtNode(div);
});
