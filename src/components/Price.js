import { useCurrency } from '../context/CurrencyContext';
import { checkoutCurrency } from '../services/currency';
// `exact` is a stored regional amount, never an FX conversion. Browsing only uses `usd`.
export default function Price({ usd, region, exact }) {
  const { currency, rates, country } = useCurrency();
  const chargeCurrency = checkoutCurrency(region ?? country);
  const code = exact !== undefined ? chargeCurrency : currency;
  const value = exact !== undefined ? exact : usd * rates[currency];
  if (!code || !Number.isFinite(value)) return <span>—</span>;
  return <span>{new Intl.NumberFormat(undefined, { style: 'currency', currency: code, currencyDisplay: 'code' }).format(value)}</span>;
}
