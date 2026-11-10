import { CurrencyProvider } from './context/CurrencyContext';
import Checkout from './components/Checkout';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Production from './components/Production';
import Ingredients from './components/Ingredients';
import Products from './components/Products';
import TripPromo from './components/TripPromo';
import News from './components/News';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ProductPage from './components/ProductPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <CurrencyProvider><CartProvider>
      <BrowserRouter>
      <Header />
      <main>
        <Routes>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="*" element={<>
        <Hero />
        <Stats />
        <Production />
        <Ingredients />
        <Products />
        <TripPromo />
        <News />
        </>} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
      </BrowserRouter>
    </CartProvider></CurrencyProvider>
  );
}

export default App;
