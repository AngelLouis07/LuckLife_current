import { useState } from 'react';
import ProductCatalog from './ProductCatalog';
import './ProductPage.css';

const spotlights = [
  { label: 'The everyday ritual', title: 'A little nature.\nA lot of possibility.', text: 'Discover thoughtful essentials for your daily routine. From botanical supplements to personal care, find your own way to feel well.', category: 'all', action: 'Explore the collection', image: '/images/products/spotlight-lingzhi.png', alt: 'Lucklife Lingzhi capsules arranged with reishi mushrooms and natural wood', notes: ['Botanical supplements', 'Considered personal care', 'Teas for a slower moment'] },
  { label: 'A moment for yourself', title: 'Small rituals.\nEveryday radiance.', text: 'Make room for a little self-care. Explore our collection of creams, gels and serums for your everyday skincare ritual.', category: 'skincare', action: 'Explore skincare', image: '/images/products/polypeptide-serum.png', alt: 'Lucklife multi-peptide skincare collection', notes: ['Face and body care', 'Creams, gels and serums', 'Your routine, your rhythm'] },
  { label: 'Pause. Pour. Enjoy.', title: 'Find comfort\nin the everyday.', text: 'From your first morning cup to a quiet afternoon pause, discover teas and beverages to make the moment yours.', category: 'beverages', action: 'Explore teas & beverages', image: '/images/products/spotlight-tea.jpg', alt: 'Lucklife tea packaging with green tea leaves', notes: ['Herbal tea blends', 'Coffee essentials', 'A moment worth making'] },
];

export default function ProductPage() {
  const [slide, setSlide] = useState(0);
  const [category, setCategory] = useState('all');
  const spotlight = spotlights[slide];

  return (
    <div className="product-page">
      <div className="collection-intro"><span>Nature, thoughtfully considered.</span><a href="#collection">Discover your everyday essentials <span aria-hidden="true">↗</span></a></div>
      <section className="collection-spotlight" aria-label="Collection spotlight">
        <div className="collection-spotlight__inner">
          <div className="collection-spotlight__image"><img src={spotlight.image} alt={spotlight.alt} fetchPriority="high" /><span className="collection-image-caption">THE LUCK LIFE COLLECTION</span></div>
          <div className="collection-spotlight__content">
            <span className="collection-eyebrow">Collection spotlight <span aria-hidden="true">—</span> {String(slide + 1).padStart(2, '0')}</span>
            <div className="collection-spotlight__copy" aria-live="polite">
              <p className="collection-eyebrow collection-gold">{spotlight.label}</p>
              <h1>{spotlight.title}</h1>
              <p className="collection-spotlight__description">{spotlight.text}</p>
              <ul className="collection-spotlight__notes">{spotlight.notes.map(note => <li key={note}><span aria-hidden="true">✧</span>{note}</li>)}</ul>
              <a className="collection-button" href="#collection" onClick={() => setCategory(spotlight.category)}>{spotlight.action}<span aria-hidden="true">↗</span></a>
            </div>
            <div className="collection-slide-controls"><span>{String(slide + 1).padStart(2, '0')} <span className="collection-slide-line" /> 03</span><div><button onClick={() => setSlide((slide + 2) % 3)} aria-label="Previous collection spotlight">←</button><button onClick={() => setSlide((slide + 1) % 3)} aria-label="Next collection spotlight">→</button></div></div>
          </div>
        </div>
      </section>
      <ProductCatalog category={category} onCategoryChange={setCategory} />
      <section className="collection-philosophy">
        <span className="collection-eyebrow collection-gold">The Luck Life philosophy</span>
        <h2>Rooted in tradition.<br />Made for your everyday.</h2>
        <p>Wellness is personal. Explore a collection that brings botanical inspiration and modern daily rituals together, and find the essentials that fit your life.</p>
        <a href="/#about">Get to know Luck Life <span aria-hidden="true">↗</span></a>
      </section>
    </div>
  );
}
