import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { testStore } from './testStore';

test('renders frontend test title', () => {
  render(
    <Provider store={testStore}>
      <App />
    </Provider>
  );
  const linkElement = screen.getByText(/Frontend test/i);
  expect(linkElement).toBeInTheDocument();
});
