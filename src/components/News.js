import { newsItems } from '../data/products';
import './News.css';

export default function News() {
  return (
    <section className="news section" id="news">
      <div className="container">
        <h2 className="section-title">Lucklife News</h2>
        <p className="section-subtitle">
          Stay updated with our latest events, conferences, and international business news
        </p>

        <div className="news__grid">
          {newsItems.map((item, index) => (
            <article
              key={item.id}
              className={`news-card ${index === 0 ? 'news-card--featured' : ''}`}
            >
              <div className="news-card__image">
                <img src={item.image} alt="" />
                <span className="news-card__date">{item.date}</span>
              </div>
              <div className="news-card__body">
                <h3>{item.title}</h3>
                <a href="#" className="news-card__link">
                  Read More
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="news__cta">
          <a href="#" className="btn btn-outline">Read More News</a>
        </div>
      </div>
    </section>
  );
}
