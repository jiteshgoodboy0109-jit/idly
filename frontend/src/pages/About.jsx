import React from 'react';
import '../styles/About.css';
import aboutFamily from '../assets/about_family.jpeg';
import aboutTradition from '../assets/about_tradition.png';
import aboutSketch from '../assets/about_sketch.png';

const About = () => {
    return (
        <div className="about-page">
            {/* Hero Section - Early Morning Sunlight */}
            <div className="about-hero-emotional">
                <div className="hero-content">
                    <span className="hero-subtitle">Est. 1984 — A Family Tradition</span>
                    <h1></h1>
                    <p>Every morning at dawn, we light our stove to bring you the taste of home.</p>
                    <button className="cta-sambar-orange">Discover Our Roots</button>
                </div>
                <div className="hero-steam-overlay"></div>
            </div>

            <div className="about-container">
                {/* Story Section - Grandmother's Kitchen */}
                <section className="story-section">
                    <div className="story-image">
                        <div className="rustic-frame">
                            <img src={aboutTradition} alt="Traditional Kitchen" className="main-story-img" />
                            <div className="photo-caption">Amma's kitchen, where it all began.</div>
                        </div>
                    </div>
                    <div className="story-text">
                        <h2 className="title-banana-green">The Hands That Fed Us</h2>
                        <p className="emotional-p">
                            Long before <strong>Idly Shop</strong> was a name, it was a smell—the scent of roasted urad dal and fresh coconut
                            wafting from our grandmother's kitchen in the golden hour of the morning.
                        </p>
                        <p>
                            She believed that an idly isn't just breakfast; it's a blessing. She taught us that the secret to the perfect fluffiness
                            isn't just the stone-ground batter, but the patience to let it ferment under the warm South Indian sun.
                        </p>
                        <blockquote className="quote-idly">
                            "The softest idlis come from the warmest hearts."
                        </blockquote>
                    </div>
                </section>

                {/* Timeline Section - 4AM and 6AM */}
                <section className="timeline-section">
                    <h2 className="section-title-center">Our Morning Ritual</h2>
                    <div className="timeline-container">
                        <div className="timeline-item">
                            <div className="timeline-time">4:00 AM</div>
                            <div className="timeline-content">
                                <h3>The Awakening</h3>
                                <p>While the city sleeps, our hand-carved stone grinders hum. We prepare the hand-picked grains, maintaining a legacy of slow, natural fermentation.</p>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-time">6:00 AM</div>
                            <div className="timeline-content">
                                <h3>The First Steam</h3>
                                <p>The first batch is laid on traditional hand-woven cotton cloth. The aroma of jasmine-soft idlis signals the start of a new day.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;
