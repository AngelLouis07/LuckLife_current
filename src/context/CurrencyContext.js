import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { cachedRates, CHOICE_KEY, checkoutCurrency, currencyCodes, detectCountry, getRates, readStored, saveStored } from '../services/currency';
const CurrencyContext = createContext(null);
export function CurrencyProvider({ children }) {
  const saved = readStored(CHOICE_KEY);
  const [currency, setCurrency] = useState(currencyCodes.includes(saved) ? saved : 'USD');
  const manualCurrency = useRef(currencyCodes.includes(saved));
  const manualCountry = useRef(false);
  const [country, setCountry] = useState('');
  const [rates, setRates] = useState(cachedRates);
  useEffect(() => {
    let active = true;
    getRates().then(value => { if (active) setRates(value); });
    detectCountry().then(code => {
      if (!active) return;
      if (!manualCurrency.current) setCurrency(checkoutCurrency(code) || 'USD');
      if (!manualCountry.current) setCountry(code === 'NG' ? 'NG' : code === 'GB' ? 'GB' : code ? 'OTHER' : '');
    });
    return () => { active = false; };
  }, []);
  const chooseCurrency = code => {
    if (!rates[code]) return;
    manualCurrency.current = true;
    setCurrency(code);
    saveStored(CHOICE_KEY, code);
  };
  const chooseCountry = code => { manualCountry.current = true; setCountry(code); };
  // Preserve a saved manual choice while rates load; never estimate a missing rate.
  const displayCurrency = rates[currency] ? currency : 'USD';
  return <CurrencyContext.Provider value={{ currency: displayCurrency, rates, chooseCurrency, country, chooseCountry }}>{children}</CurrencyContext.Provider>;
}
export const useCurrency = () => useContext(CurrencyContext);
