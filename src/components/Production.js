import './Production.css';

export default function Production() {
  return (
    <section className="production section" id="about">
      <div className="container production__inner">
        <div className="production__image">
          <img
            src="https://images.unsplash.com/photo-1582719471137-c3967fa390ee?w=700&h=500&fit=crop"
            alt="High-tech production facility"
          />
          <div className="production__badge">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Certified Quality</span>
          </div>
        </div>

        <div className="production__content">
          <span className="production__eyebrow">Our Facility</span>
          <h2 className="production__title">High-Tech Production</h2>
          <p className="production__text">
            Automated cutting-edge equipment from Japan, South Korea, Europe and Russia
            allows us to produce the highest quality products in the volume required
            to meet client demand from all over the world.
          </p>
          <ul className="production__features">
            <li>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 13l4 4L19 7" />
              </svg>
              GMP Certified Manufacturing
            </li>
            <li>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 13l4 4L19 7" />
              </svg>
              International Quality Standards
            </li>
            <li>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 13l4 4L19 7" />
              </svg>
              Advanced R&D Laboratory
            </li>
          </ul>
          <a href="#products" className="btn btn-primary">Learn More</a>
        </div>
      </div>
    </section>
  );
}
