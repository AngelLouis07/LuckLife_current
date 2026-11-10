import Price from './Price';
import { useEffect, useMemo, useRef, useState } from 'react';
import { products, productCategories } from '../data/products';
import { useCart } from '../context/CartContext';
import './ProductCatalog.css';

const categoryName = (id) => productCategories.find((category) => category.id === id)?.label || id;

export default function ProductCatalog({ category, onCategoryChange: setCategory }) {
  const { addToCart } = useCart();
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('featured');
  const [limit, setLimit] = useState(12);
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);

  useEffect(() => {
    if (!selected) return;
    const modal = dialog.current;
    modal.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      modal.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [selected]);

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    const result = products.filter((product) =>
      (category === 'all' || product.category === category) &&
      `${product.name} ${product.tagline} ${categoryName(product.category)}`.toLowerCase().includes(search)
    );
    if (sort === 'price-low') result.sort((a, b) => a.price_usd - b.price_usd);
    if (sort === 'price-high') result.sort((a, b) => b.price_usd - a.price_usd);
    if (sort === 'name') result.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'featured') result.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
    return result;
  }, [category, query, sort]);

  function resetFilters() {
    setCategory('all');
    setQuery('');
    setLimit(12);
  }

  return (
    <section className="collection-catalog" id="collection" aria-labelledby="collection-title">
      <div className="collection-toolbar">
        <div className="collection-heading">
          <h2 id="collection-title">Curated wellness</h2>
          <p aria-live="polite">Showing {Math.min(limit, filtered.length)} of {filtered.length} products</p>
        </div>
        <label className="collection-search">
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg>
          <span className="collection-sr-only">Search products</span>
          <input type="search" value={query} placeholder="Find your daily essentials" onChange={(event) => { setQuery(event.target.value); setLimit(12); }} />
        </label>
        <label className="collection-sort">Sort by
          <select value={sort} onChange={(event) => { setSort(event.target.value); setLimit(12); }}>
            <option value="featured">Featured</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
            <option value="name">Name: A–Z</option>
          </select>
        </label>
      </div>
      <div className="collection-categories" role="group" aria-label="Filter products by category">
        {productCategories.map((item) => (
          <button type="button" key={item.id} aria-pressed={category === item.id} onClick={() => { setCategory(item.id); setLimit(12); }}>
            {item.label}
          </button>
        ))}
      </div>
      <div className="collection-grid">
        {filtered.slice(0, limit).map((product) => (
          <article className="collection-card" key={product.id}>
            <div className="collection-image-wrap">
              <button type="button" className="collection-image-button" onClick={() => setSelected(product)} aria-label={`View ${product.name}`}>
                <img src={product.image} alt={product.name} loading="lazy" width="400" height="500" />
              </button>
              {product.featured && <span className="collection-badge">Signature collection</span>}
              <button type="button" className="collection-add" onClick={() => addToCart(product)} aria-label={`Add ${product.name} to bag`}>Add to bag <span aria-hidden="true">+</span></button>
            </div>
            <div className="collection-card-copy">
              <p className="collection-category">{categoryName(product.category)}</p>
              <h3><button type="button" onClick={() => setSelected(product)}>{product.name}</button></h3>
              <p className="collection-price"><Price usd={product.price_usd} /></p>
            </div>
          </article>
        ))}
      </div>
      {filtered.length === 0 && <div className="collection-empty"><h3>No products found</h3><p>Try another search or explore the complete collection.</p><button type="button" onClick={resetFilters}>Clear filters</button></div>}
      {limit < filtered.length && <div className="collection-more"><button type="button" onClick={() => setLimit((value) => value + 12)}>Explore more products <span aria-hidden="true">↓</span></button><p>{Math.min(limit, filtered.length)} of {filtered.length} products</p></div>}
      <dialog className="collection-dialog" ref={dialog} aria-labelledby="collection-detail-title" onClose={() => setSelected(null)} onClick={(event) => { if (event.target === event.currentTarget) dialog.current.close(); }}>
        {selected && <div className="collection-detail">
          <button type="button" className="collection-detail-close" aria-label="Close product details" onClick={() => dialog.current.close()} autoFocus>×</button>
          <img src={selected.image} alt={selected.name} width="500" height="600" />
          <div className="collection-detail-copy">
            <p className="collection-category">{categoryName(selected.category)}</p>
            <h2 id="collection-detail-title">{selected.name}</h2>
            <p>{selected.tagline}</p>
            <p className="collection-detail-description">Part of the Luck Life International collection. Explore everyday essentials for your personal wellness routine.</p>
            <p className="collection-detail-price"><Price usd={selected.price_usd} /></p>
            <button type="button" className="collection-detail-add" onClick={() => { dialog.current.close(); addToCart(selected); }}>Add to bag <span aria-hidden="true">+</span></button>
          </div>
        </div>}
      </dialog>
    </section>
  );
}
