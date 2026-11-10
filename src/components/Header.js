import CurrencySwitcher from './CurrencySwitcher';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { honorAwards } from '../data/products';
import './Header.css';
import { useLocation, Link } from 'react-router-dom';

const navLinks = [
  {
    label: 'About The Company',
    children: ['About Us', 'Research Team', 'News'],
    href: '/#about',
  },
  { label: 'Products', href: '/products' },
  {
    label: 'Honor',
    children: honorAwards,
    href: '/#honor',
  },
];

export default function Header() {
  const { pathname } = useLocation();
  const { itemCount, setIsOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''} ${pathname.startsWith('/products') ? 'header--product' : ''}`}>
      <div className="container header__inner">
        <a href="/" className="header__logo">
          <span className="header__logo-icon">LL</span>
          <div className="header__logo-text">
            <span className="header__logo-name">Luck Life</span>
            <span className="header__logo-tag">International</span>
          </div>
        </a>

        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
          <ul className="header__nav-list">
            {navLinks.map((link) => (
              <li
                key={link.label}
                className="header__nav-item"
                onMouseEnter={() => link.children && setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {link.href === '/products' ? <Link to="/products" className="header__nav-link" aria-current={pathname.startsWith('/products') ? 'page' : undefined} onClick={() => { setMenuOpen(false); window.scrollTo(0, 0); }}>{link.label}</Link> : <a href={link.href} className="header__nav-link" onClick={() => setMenuOpen(false)}>
                  {link.label}
                  {link.children && (
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor">
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    </svg>
                  )}
                </a>}
                {link.children && (
                  <ul className={`header__dropdown ${openDropdown === link.label ? 'header__dropdown--visible' : ''}`}>
                    {link.children.map((child) => (
                      <li key={child}>
                        <a href={child === 'News' ? '/#news' : link.href} onClick={() => setMenuOpen(false)}>{child}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <CurrencySwitcher />
          <button
            className="header__cart"
            onClick={() => setIsOpen(true)}
            aria-label={`Shopping cart, ${itemCount} items`}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
            </svg>
            {itemCount > 0 && <span className="header__cart-badge">{itemCount}</span>}
          </button>

          <button
            className={`header__menu-toggle ${menuOpen ? 'header__menu-toggle--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
