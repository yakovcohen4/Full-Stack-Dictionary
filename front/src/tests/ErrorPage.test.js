import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ErrorPage from '../Components/ErrorPage';

describe('ErrorPage', () => {
  test('renders Error page -> test the header', () => {
    render(<ErrorPage />);
    const headerElement = screen.getByText(/we are sorry/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('renders home page -> test the button Element', () => {
    render(<ErrorPage />);
    const buttonElement = screen.getByText('back to search');
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders home page with not a word in English -> test the explanation Error', () => {
    render(<ErrorPage wordError={'not a word in English'} />);
    const subTitleElement = screen.getByText(/Try to search only words in/i);
    expect(subTitleElement).toBeInTheDocument();
  });

  test('renders home page with not a word in English -> test the explanation Error', () => {
    render(<ErrorPage wordError={'notWordInEnglish'} />);
    const subTitleElement = screen.getByText(
      /we've search more 100,000 words, but did not match/i
    );
    expect(subTitleElement).toBeInTheDocument();
  });
});
