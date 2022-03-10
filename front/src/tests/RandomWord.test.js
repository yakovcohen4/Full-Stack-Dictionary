import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import RandomWord from '../Components/RandomWord';

describe('<RandomWord />', () => {
  beforeEach(() => {
    render(<RandomWord />);
  });
  test('test the Header', () => {
    const headerElement = screen.getByText(/Random Word - POS/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('test the sub title', () => {
    const subTitleElement = screen.getByText(
      /You can search random word and get all part of speech, or search with specific part of speech./i
    );
    expect(subTitleElement).toBeInTheDocument();
  });

  test('test the part of speech list', () => {
    const listOfLiElements = screen.getAllByRole('listitem');
    expect(listOfLiElements.length).toBe(10);
  });
});
