import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg">
        <img
          src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1920&h=1080&fit=crop"
          alt=""
          className="hero__bg-image"
        />
        <div className="hero__overlay" />
      </div>

      <div className="container hero__content">
        <div className="hero__badge">International Business</div>
        <h1 className="hero__title">
          Born In <span>Luck Life</span>
        </h1>
        <p className="hero__subtitle">
          Premium health and wellness products crafted with cutting-edge technology
          and natural ingredients for a healthier world.
        </p>
        <div className="hero__actions">
          <a href="#products" className="btn btn-gold">Shop Products</a>
          <a href="#about" className="btn btn-outline" style={{ color: '#fff', borderColor: '#fff' }}>
            Learn More
          </a>
        </div>
      </div>

      <div className="hero__scroll">
        <span>Discovering</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
