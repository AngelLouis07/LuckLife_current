import { render, screen, fireEvent, act } from '@testing-library/react';
import { CurrencyProvider, useCurrency } from './CurrencyContext';
import Price from '../components/Price';
import * as service from '../services/currency';
jest.mock('../services/currency', () => ({ ...jest.requireActual('../services/currency'), getRates: jest.fn(), detectCountry: jest.fn() }));
function Probe() {
  const { currency, country, chooseCurrency, chooseCountry } = useCurrency();
  return <><span data-testid="state">{currency}/{country}</span><button onClick={() => chooseCurrency('GBP')}>GBP</button><button onClick={() => chooseCountry('GB')}>UK</button><Price usd={10} region="NG" /><Price region="NG" exact={1234} /></>;
}
beforeEach(() => { localStorage.clear(); service.getRates.mockResolvedValue({ USD: 1, GBP: .75, NGN: 1400 }); });
test('manual currency and delivery choice win over delayed IP response', async () => {
  let resolve;
  service.detectCountry.mockReturnValue(new Promise(r => { resolve = r; }));
  render(<CurrencyProvider><Probe /></CurrencyProvider>);
  await act(async () => {});
  fireEvent.click(screen.getByText('GBP')); fireEvent.click(screen.getByText('UK'));
  await act(async () => resolve('NG'));
  expect(screen.getByTestId('state').textContent).toBe('GBP/GB');
  expect(localStorage.getItem(service.CHOICE_KEY)).toBe('"GBP"');
  expect(screen.queryByText(/approx\./)).toBeNull();
  expect(screen.getByText(/NGN/).textContent).toContain('1,234.00');
});
test('IP sets the first-visit default but preserves a saved manual currency', async () => {
  localStorage.setItem(service.CHOICE_KEY, '"GBP"');
  service.detectCountry.mockResolvedValue('NG');
  render(<CurrencyProvider><Probe /></CurrencyProvider>);
  await act(async () => {});
  expect(screen.getByTestId('state').textContent).toBe('GBP/NG');
});
test('Nigeria receives NGN by default', async () => {
  service.detectCountry.mockResolvedValue('NG');
  render(<CurrencyProvider><Probe /></CurrencyProvider>);
  await act(async () => {});
  expect(screen.getByTestId('state').textContent).toBe('NGN/NG');
});
