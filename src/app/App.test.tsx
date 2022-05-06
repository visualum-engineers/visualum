import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe("<App />", () => {
  test("Renders <App /> component correctly", async () => {
    render(<App />);
    const greeting = await screen.findByText(
      /The easiest way to train create, organize & teach online./i
    );
    expect(greeting).not.toEqual({});
  });
});
