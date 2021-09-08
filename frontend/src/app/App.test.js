import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import App from './App';

describe("<App />", () => {
  it("Renders <App /> component correctly", () => {
    const { getAllByText } = render(<App />);
    expect(getAllByText(/visualum/i)).toBeInTheDocument();
  });
});
