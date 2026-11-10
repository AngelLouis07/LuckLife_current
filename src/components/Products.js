import Price from './Price';
import { useState } from 'react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import './Products.css';

export default function Products() {
  const { addToCart } = useCart();
  const [activeProduct, setActiveProduct] = useState(null);

  return (
    <section className="products section" id="products">
      <div className="container">
        <h2 className="section-title">Our Products</h2>
        <p className="section-subtitle">
          Premium health supplements crafted with natural ingredients and advanced technology
        </p>

        <div className="products__grid">
          {products.map((product) => (
            <article key={product.id} className="product-card">
              <div className="product-card__image-wrap">
                <img src={product.image} alt={product.name} className="product-card__image" />
                <div className="product-card__overlay">
                  <button
                    className="btn btn-gold btn-sm"
                    onClick={() => setActiveProduct(product)}
                  >
                    Quick View
                  </button>
                </div>
              </div>

              <div className="product-card__body">
                <span className="product-card__tagline">{product.tagline}</span>
                <h3 className="product-card__name">{product.name}</h3>

                <ul className="product-card__benefits">
                  {product.benefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>

                <div className="product-card__footer">
                  <span className="product-card__price"><Price usd={product.price_usd} /></span>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {activeProduct && (
        <div className="product-modal" onClick={() => setActiveProduct(null)}>
          <div className="product-modal__content" onClick={(e) => e.stopPropagation()}>
            <button className="product-modal__close" onClick={() => setActiveProduct(null)} aria-label="Close">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="product-modal__grid">
              <img src={activeProduct.image} alt={activeProduct.name} />
              <div>
                <span className="product-card__tagline">{activeProduct.tagline}</span>
                <h2>{activeProduct.name}</h2>
                <p className="product-modal__desc">{activeProduct.description}</p>

                <h4>Main Functions</h4>
                <ul className="product-card__benefits">
                  {activeProduct.benefits.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>

                <div className="product-modal__actions">
                  <span className="product-card__price"><Price usd={activeProduct.price_usd} /></span>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      addToCart(activeProduct);
                      setActiveProduct(null);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
