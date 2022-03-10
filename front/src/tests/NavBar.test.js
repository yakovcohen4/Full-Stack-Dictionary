import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
// components
import NavBar from '../Components/NavBar';
import SearchWord from '../Components/SearchWord';
import RandomWord from '../Components/RandomWord';
import HomePage from '../Components/HomePage';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Mock = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/word/" element={<SearchWord />} />
        <Route path="/part-of-speech/" element={<RandomWord />} />
      </Routes>
    </Router>
  );
};

test('renders NavBar and test the options Home', () => {
  render(<Mock />);
  const headerElement = screen.getByText(/Home Page/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders NavBar and test the options Search words', () => {
  render(<Mock />);
  const headerElement = screen.getByText(/search words/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders NavBar and test the options Random words', () => {
  const { container } = render(<Mock />);
  const sidenavSpan = container.querySelector('#mySidenav');

  expect(sidenavSpan.children[3].innerHTML).toEqual('Random Words');
  expect(sidenavSpan).toBeInTheDocument();
});
