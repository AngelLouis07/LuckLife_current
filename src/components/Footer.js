import { honorAwards } from '../data/products';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-icon">LL</span>
              <div>
                <span className="footer__logo-name">Luck Life</span>
                <span className="footer__logo-cn">幸运生活股份有限公司</span>
              </div>
            </div>
            <p className="footer__tagline">
              International health and wellness products born from years of research
              and global business excellence.
            </p>
            <p className="footer__copyright">
              &copy; {new Date().getFullYear()} LUCKLIFE INC. All rights reserved.
            </p>
          </div>

          <div className="footer__col">
            <h4>About The Company</h4>
            <ul>
              <li><a href="/#about">About Us</a></li>
              <li><a href="/#about">Research Team</a></li>
              <li><a href="/#news">News</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>Products</h4>
            <ul>
              <li><a href="/products#collection">Lucklife Lingzhi</a></li>
              <li><a href="/products#collection">Haizhao Gai</a></li>
              <li><a href="/products#collection">Slimming Tea</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>Honor</h4>
            <ul>
              {honorAwards.map((award) => (
                <li key={award}><a href="/#honor">{award}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer__col footer__col--contact">
            <h4>Visit Us</h4>
            <address>
              No. 3, Chuangye North Road, Shuanglin Area,<br />
              Liangang Industrial Zone, Hongqi Town,<br />
              Jinwan District, Zhuhai City
            </address>
          </div>
        </div>
      </div>

      <button
        className="footer__scroll-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </footer>
  );
}
