import './TripPromo.css';

export default function TripPromo() {
  return (
    <section className="trip section" id="honor">
      <div className="container trip__inner">
        <div className="trip__content">
          <span className="trip__eyebrow">Exclusive Opportunity</span>
          <h2 className="trip__title">LuckLife Nigeria-China Trip</h2>
          <p className="trip__text">
            Join our exclusive international tour program. Top-performing members
            earn the opportunity to explore business opportunities across Nigeria,
            Malaysia, and China while celebrating achievements at our annual awards ceremony.
          </p>
          <a href="#news" className="btn btn-gold">Learn More</a>
        </div>

        <div className="trip__image">
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=700&h=500&fit=crop"
            alt="International travel"
          />
        </div>
      </div>
    </section>
  );
}
