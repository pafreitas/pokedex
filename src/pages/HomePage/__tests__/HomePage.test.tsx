import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HomePage from '../HomePage.tsx';
import '@testing-library/jest-dom';

test('HomePage renders correctly', () => {
  render(<HomePage />);
  const linkElement = screen.getByText(/Pokemon Logo/i); // replace with actual text that appears on your home page
  expect(linkElement).toBeInTheDocument();
});

test('typeahead works correctly', async () => {
  render(<HomePage />);

  userEvent.type(screen.getByRole('textbox'), 'pikachu');

  await waitFor(() => expect(screen.getByText('pikachu')).toBeInTheDocument());
});

test('ghost input updates correctly', async () => {
  render(<HomePage />);

  userEvent.type(screen.getByRole('textbox'), 'pika');

  await waitFor(() =>
    expect(screen.getByPlaceholderText('Ghost Input')).toHaveValue('pikachu'),
  );
});
