import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SearchWord from '../Components/SearchWord';

describe('<SearchWord />', () => {
  beforeEach(() => {
    render(<SearchWord />);
  });
  test('test the Header', () => {
    const { container } = render(<SearchWord />);
    const headerElement = container.querySelector('.headers-h5');

    expect(headerElement).toBeInTheDocument();
  });

  test('test the sub title', () => {
    const subTitleElement = screen.getByText(
      /You can search words or search words with a specific part of speech./i
    );
    expect(subTitleElement).toBeInTheDocument();
  });

  test('test the part of speech list', () => {
    const listOfLiElements = screen.getAllByRole('listitem');
    expect(listOfLiElements.length).toBe(10);
  });
});
