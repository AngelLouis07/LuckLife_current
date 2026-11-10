import { useState, useEffect, useRef } from 'react';
import { stats } from '../data/products';
import './Stats.css';

function AnimatedCounter({ value, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="stat-card__number">
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="stats section" id="about">
      <div className="container">
        <h2 className="section-title">Discovering</h2>
        <p className="section-subtitle">
          Years of successful business across Russia and countries worldwide
        </p>

        <div className="stats__grid">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="stat-card__label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
