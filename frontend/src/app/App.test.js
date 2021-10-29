import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe("<App />", () => {
  test("Renders <App /> component correctly", async () => {
    render(<App />);
    const greeting = await screen.findByText(/A world class education for anyone, anywhere./i);
    expect(greeting).not.toEqual({});
  });
});
