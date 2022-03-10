import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import HomePage from '../Components/HomePage';

describe('<HomePage />', () => {
  test('renders home page and test the header', () => {
    render(<HomePage />);
    const headerElement = screen.getByText(/home page/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('renders home page and test the sub title', () => {
    render(<HomePage />);
    const subTitleElement = screen.getByText(/welcome to my dictionary/i);
    expect(subTitleElement).toBeInTheDocument();
  });

  test('renders home page and test the explanation to the user', () => {
    render(<HomePage />);
    const listOfLiElements = screen.getAllByRole('listitem');
    expect(listOfLiElements.length).toBe(5);
  });
});
