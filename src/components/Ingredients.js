import './Ingredients.css';

const harmfulFree = [
  'Sulfates', 'Parabens', 'Phthalates', 'Artificial Dyes',
  'Mineral Oils', 'Synthetic Fragrances',
];

export default function Ingredients() {
  return (
    <section className="ingredients section">
      <div className="container">
        <div className="ingredients__header">
          <span className="ingredients__eyebrow">Ingredients Of</span>
          <h2 className="section-title">Luck Life Products</h2>
          <p className="section-subtitle">
            Safety is our top concern. Our products are free from harmful substances
            that may affect humans and nature.
          </p>
        </div>

        <div className="ingredients__grid">
          <div className="ingredients__visual">
            <img
              src="https://images.unsplash.com/photo-1615485509057-21d2a1a9d984?w=600&h=600&fit=crop"
              alt="Natural ingredients"
            />
            <div className="ingredients__leaf ingredients__leaf--1" />
            <div className="ingredients__leaf ingredients__leaf--2" />
          </div>

          <div className="ingredients__content">
            <h3>100% Natural & Safe</h3>
            <p>
              We carefully select every ingredient to ensure the highest purity
              and effectiveness. Our formulations combine traditional herbal wisdom
              with modern scientific research.
            </p>

            <div className="ingredients__free">
              <h4>Free From:</h4>
              <div className="ingredients__tags">
                {harmfulFree.map((item) => (
                  <span key={item} className="ingredients__tag">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
