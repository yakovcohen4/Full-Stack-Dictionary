import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import loader from './../Data/loader-gif-no-background.gif';
import Loading from '../Components/Loading';

test('renders Loading -> test the image alt', () => {
  render(<Loading />);
  const imageAlt = screen.getByAltText(/loading-gif/i);
  expect(imageAlt).toBeInTheDocument();
});
test('renders Loading -> test the image src', () => {
  render(<Loading />);
  const image = screen.getByAltText(/loading-gif/i);
  expect(image.src).toContain(loader);
});
