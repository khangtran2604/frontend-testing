/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('Display UI', () => {
  it('Should show loading before loading data', () => {});

  it('Should render 64 squares on UI', () => {
    const { container } = render(<App />);

    expect(container.getElementsByClassName('squareElement').length).toBe(64);
  });
});
