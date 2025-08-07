import React, { useState, useEffect, useCallback, memo } from 'react';

const ContactModal = memo(({ 
  showModal, 
  formData, 
  handleInputChange, 
  handleSubmit, 
  closeModal, 
  setShowPrivacyModal 
}) => {
  if (!showModal) return null;
  
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button 
          className="modal-close"
          onClick={closeModal}
        >
          ×
        </button>
        <h2 className="modal-title">🇵🇱 Book Your FREE Expat Psychology Consultation with Anna</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name *</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName || ''}
              onChange={handleInputChange}
              required
              autoComplete="given-name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="lastName">Last Name *</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName || ''}
              onChange={handleInputChange}
              required
              autoComplete="family-name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email || ''}
              onChange={handleInputChange}
              required
              autoComplete="email"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone || ''}
              onChange={handleInputChange}
              required
              autoComplete="tel"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="experience">How long have you been living in Poland/Gdansk? *</label>
            <select
              id="experience"
              name="experience"
              value={formData.experience || ''}
              onChange={handleInputChange}
              required
            >
              <option value="">Select...</option>
              <option value="new-arrival">Just arrived (0-6 months)</option>
              <option value="settling-in">Settling in (6 months - 2 years)</option>
              <option value="established">Established (2-5 years)</option>
              <option value="long-term">Long-term resident (5+ years)</option>
              <option value="considering">Considering moving to Poland</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="goal">What's your biggest challenge as an expat? *</label>
            <select
              id="goal"
              name="goal"
              value={formData.goal || ''}
              onChange={handleInputChange}
              required
            >
              <option value="">Select...</option>
              <option value="cultural-adaptation">Cultural adaptation & homesickness</option>
              <option value="language-barriers">Language barriers & communication stress</option>
              <option value="social-isolation">Feeling isolated & making friends</option>
              <option value="relationship-strain">Relationship strain due to relocation</option>
              <option value="work-stress">Work stress & career challenges in Poland</option>
              <option value="identity-crisis">Identity & belonging issues</option>
              <option value="anxiety-depression">Anxiety, depression, or mood issues</option>
              <option value="trauma-healing">Trauma processing & healing</option>
              <option value="family-adjustment">Family/children adjustment to Poland</option>
              <option value="burnout-stress">Burnout and chronic stress management</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="budget">Preferred way to receive support *</label>
            <select
              id="budget"
              name="budget"
              value={formData.budget || ''}
              onChange={handleInputChange}
              required
            >
              <option value="">Select...</option>
              <option value="online-sessions">Online therapy sessions (worldwide)</option>
              <option value="in-person-gdansk">In-person sessions in Gdansk</option>
              <option value="couples-therapy">Couples therapy for expats</option>
              <option value="family-therapy">Family therapy & children support</option>
              <option value="intensive-program">Intensive therapy program</option>
              <option value="consultation-first">Free consultation first</option>
            </select>
          </div>
          
          <div className="form-group">
            <div className="consent-section">
              <input
                type="checkbox"
                id="consent"
                name="consent"
                checked={formData.consent || false}
                onChange={handleInputChange}
                required
                className="consent-checkbox"
              />
              <div className="consent-text">
                I agree to be contacted by Anna Rozkwitalska about psychology and therapy services. *
              </div>
            </div>
            <div className="privacy-notice">
              By submitting this form, you accept our{' '}
              <button 
                type="button"
                onClick={() => setShowPrivacyModal(true)}
                className="privacy-link"
              >
                Privacy Policy
              </button>
              .
            </div>
          </div>
          
          <button type="submit" className="send-button">
            BOOK MY FREE CONSULTATION
          </button>
        </form>
      </div>
    </div>
  );
});

function AnnaRozkwitalskaTherapy() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showModal, setShowModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experience: '',
    goal: '',
    budget: '',
    consent: false
  });

  // Handle body scroll when modal is open
  useEffect(() => {
    if (showModal || showPrivacyModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal, showPrivacyModal]);

  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const subject = encodeURIComponent('🇵🇱 NEW CLIENT APPLICATION - Anna Rozkwitalska Psychology Services');
    const body = encodeURIComponent(`
🇵🇱 NEW EXPAT CLIENT FROM SALES FUNNEL:

Client Information:
First Name: ${formData.firstName}
Last Name: ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}

Expat Background:
Time in Poland/Gdansk: ${formData.experience}
Main Challenge: ${formData.goal}
Preferred Support Type: ${formData.budget}
Marketing Consent: ${formData.consent ? 'Yes' : 'No'}

SOURCE: Anna Rozkwitalska Professional Website
TARGET: Expats in Poland & Gdansk
PRIORITY: FREE CONSULTATION REQUESTED

This is a qualified lead from Anna's professional therapy sales funnel.
Client is specifically seeking English-speaking psychological support in Poland.
    `);
    
    // Open email client
    window.location.href = `mailto:oyunraptiyesi1@gmail.com?subject=${subject}&body=${body}`;
    
    // Reset form data after successful submit
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      experience: '',
      goal: '',
      budget: '',
      consent: false
    });
    
    // Close modal and go to thank you page
    setShowModal(false);
    setCurrentPage('thankyou');
  };

  const HomePage = () => (
    <div>
      {/* Top Banner - Market Call Out */}
      <div className="top-banner">
        <div className="container">
          <p>🇵🇱 Licensed Psychologist Anna Rozkwitalska - FREE consultation for expats in Poland/Gdansk</p>
        </div>
      </div>

      {/* Blue Highlight Section - VSL Hook */}
      <div className="highlight-section">
        <div className="container">
          <p>English, Polish, Italian & Spanish sessions - Professional psychology degree from SWPS University</p>
        </div>
      </div>

      {/* Main Hero Section */}
      <main className="main-content">
        <div className="container">
          <section className="hero-section">
            <h1 className="hero-title">
              Transform Your Expat Experience in Poland with Professional English-Speaking Psychology Support
            </h1>
            <p className="hero-subtitle">
              Anna Rozkwitalska - Licensed Psychologist & Cultural Expert helping expats thrive in Poland since 2018
            </p>
          </section>

          {/* Main Content Grid */}
          <section className="main-grid">
            <div className="product-image">
              <img 
                src={process.env.PUBLIC_URL + "/high_ticket_book.png"} 
                alt="Anna Rozkwitalska - Licensed Psychologist in Gdansk Poland" 
                className="therapy-image" 
                onError={(e) => {
                  // Fallback to a professional image if Anna's photo fails to load
                  e.target.src = process.env.PUBLIC_URL + "/high_ticket_book.png";
                  e.target.alt = "Professional Psychology Services in Poland";
                }}
              />
            </div>
            
            <div className="benefits-section">
              <h2 className="benefits-title">In your FREE consultation, you'll discover:</h2>
              <ul className="benefits-list">
                <li>✓ How Anna's psychodynamic approach helps expats overcome cultural adaptation challenges, anxiety, and depression in Poland</li>
                <li>✓ The "Cultural Bridge Method" - psychology tailored to your international background and expat journey</li>
                <li>✓ Why expats choose Anna over other therapists: University-trained, trauma-certified, and internationally experienced</li>
                <li>✓ Flexible online sessions (worldwide) AND in-person appointments in Gdansk for specialized expat support</li>
              </ul>
              <button 
                className="cta-button"
                onClick={() => setShowModal(true)}
              >
                ➤ BOOK MY FREE CONSULTATION WITH ANNA
              </button>
              <p className="warning-text">⚠️ LIMITED AVAILABILITY: Anna accepts only 10 new expat clients per month</p>
            </div>
          </section>
        </div>
      </main>

      {/* Black Section - What's Included */}
      <section className="what-includes-section">
        <div className="container">
          <h2 className="section-title-white">Anna Rozkwitalska's Professional Psychology Services:</h2>
          
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">🎓</div>
              <h3>University-Trained Psychologist</h3>
              <p>SWPS University Sopot graduate with specialized training in psychodynamic therapy, psychotraumatology, and multicultural psychology. Certified for adults, children, couples & families.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🌍</div>
              <h3>International Experience Expert</h3>
              <p>Personal experience living, studying & working across multiple countries. Deep understanding of expat challenges, cultural adaptation, and identity transformation.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">�️</div>
              <h3>Multilingual Therapy Sessions</h3>
              <p>Professional therapy in English, Polish, Italian & Spanish. Online sessions worldwide + in-person appointments in Gdansk for maximum accessibility.</p>
            </div>
          </div>

          <div className="bottom-text">
            <p>
              🇵🇱 SPECIALIZED FOR EXPATS: Anna combines university psychology training with personal expat experience. 
              She understands the unique challenges of cultural adaptation, identity shifts, and building a new life in Poland. 
              Professional support for stress, anxiety, depression, trauma, and relationship challenges.
            </p>
            <button 
              className="cta-button secondary"
              onClick={() => setShowModal(true)}
            >
              ➤ START MY THERAPY JOURNEY WITH ANNA
            </button>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="steps-section">
        <div className="container">
          <h2 className="section-title">🇵🇱 How to start your therapy journey with Anna (3 simple steps):</h2>
          
          <div className="steps-grid">
            <div className="step-item">
              <div className="step-icon">📝</div>
              <h3>1. Complete the expat psychology assessment (2 minutes)</h3>
            </div>
            <div className="step-item">
              <div className="step-icon">📞</div>
              <h3>2. Anna personally contacts you within 24 hours</h3>
            </div>
            <div className="step-item">
              <div className="step-icon">🎯</div>
              <h3>3. Schedule your first session (online or in-person in Gdansk)</h3>
            </div>
          </div>

          <button 
            className="cta-button final"
            onClick={() => setShowModal(true)}
          >
            BEGIN MY TRANSFORMATION WITH ANNA
          </button>
        </div>
      </section>

      {/* Founder Section */}
      <section className="founder-section">
        <div className="container">
          <h2 className="section-title-white">Meet Anna Rozkwitalska - Your Expert Expat Psychologist</h2>
          
          <div className="founder-grid">
            <div className="founder-content">
              <h3>Licensed Psychologist & Cultural Adaptation Expert</h3>
              <p>
                Anna holds a psychology degree from SWPS University in Sopot and completed advanced training 
                at the University of Kent (UK). She specializes in psychodynamic therapy and psychotraumatology 
                with extensive international experience.
              </p>
              <p>
                Having lived, studied, and worked across multiple countries, Anna deeply understands the 
                unique challenges expats face - from cultural shock and identity shifts to relationship 
                strains and career transitions in Poland.
              </p>
              <p>
                🎓 QUALIFICATIONS: SWPS University Psychology degree + psychotherapy certification
              </p>
              <p>
                🌍 LANGUAGES: English, Polish, Italian & Spanish therapy sessions
              </p>
              <p>
                📍 SESSIONS: Online worldwide + In-person in Gdansk
              </p>
              <p>
                🎯 SPECIALIZATIONS: Adults, children, couples, families + trauma and cultural adaptation
              </p>
              <p>
                ⭐ APPROACH: Psychodynamic therapy combined with culturally sensitive coaching techniques
              </p>
            </div>
            <div className="founder-image">
              <img 
                src="/anna_rozkwitalska.png" 
                alt="Anna Rozkwitalska - Licensed Psychologist in Gdansk Poland" 
                className="founder-photo"
                onError={(e) => {
                  e.target.src = "/high_ticket_book.png";
                  e.target.alt = "Professional Psychology Services";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta-section">
        <div className="container">
          <h2 className="final-cta-title">🇵🇱 Ready to transform your expat experience in Poland?</h2>
          <p className="final-cta-text">
            Don't let cultural adaptation challenges hold you back. Anna combines university psychology training 
            with personal expat experience to help you thrive in Poland. Book your FREE consultation today.
          </p>
          <button 
            className="cta-button final-cta"
            onClick={() => setShowModal(true)}
          >
            YES, I WANT MY FREE CONSULTATION WITH ANNA
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section">
        <div className="container">
          <div className="footer-content">
            <img src="/mindinblue_logo.png" alt="Mind in Blue Logo" className="footer-logo" />
            <div className="footer-text">
              <h3>Disclaimer</h3>
              <p>
                <strong>RESULTS AND THERAPY OUTCOMES DISCLAIMER</strong>
              </p>
              <p>
                All testimonials on this website are from real clients. The results presented on this page are not typical. 
                Their experiences do not guarantee similar results. Individual outcomes may vary depending on your commitment, 
                participation, motivation, and other unforeseen factors. The company has not yet conducted research on the 
                outcomes of its typical clients. Your results may differ.
              </p>
              <p>
                Mind in Blue does not sell business opportunities, "get rich quick" programs, or money-making systems. 
                We believe that through professional therapy and counseling, individuals can be better prepared to make 
                life decisions and improve their mental health, but we do not guarantee success in our treatment. We make 
                no representations regarding therapeutic outcomes, efforts, or claims that our therapy will solve all your problems.
              </p>
              <p>
                Mental health treatment involves personal commitment and possible emotional discomfort during the therapeutic process. 
                Some strategies may not be suitable for all individuals or situations. We make no representations regarding the 
                probability that any actual therapy will achieve specific results or perform in a predictable manner.
              </p>
              <p>
                Statements and descriptions are opinions, results, or experiences of individuals who have typically purchased 
                our services. Results vary, are not typical, and depend on individual effort, time, skills, and unknown 
                conditions and other factors. We do not measure earnings or financial results. Instead, we track completed 
                therapy sessions and service satisfaction through voluntary surveys.
              </p>
              <p>
                Mind in Blue may refer to content or services created by or provided by third parties that are not affiliated 
                with the company. The company is not responsible for such content and does not endorse or approve it. The company 
                may provide services or refer you to external companies. Some of these companies may have shared interests and 
                owners with the company.
              </p>
              <p>
                Mind in Blue is not part of YouTube, Bing, Google, or Facebook services; Google Inc, Microsoft INC, or Meta Inc. 
                Furthermore, Mind in Blue is not supported in any way by YouTube, Google, Bing, or Facebook. FACEBOOK is a 
                trademark of FACEBOOK, Inc. YOUTUBE is a trademark of GOOGLE Inc. BING is a trademark of MICROSOFT Inc.
              </p>
              <p>
                <strong>Mind in Blue - Professional Mental Health Services</strong><br/>
                Located in Gdansk, Poland<br/>
                Services provided in accordance with Polish healthcare regulations and EU GDPR compliance.
              </p>
              <div className="footer-social-section">
                <h3>Connect With Us</h3>
                <div className="footer-social">
                  <a href="https://www.facebook.com/themindinblue#" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/themindinblue/" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="https://www.tiktok.com/@themindinblue" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                    </svg>
                  </a>
                  <a href="https://www.youtube.com/@themindinblue" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/company/themindinblue" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );

  const ThankYouPage = () => (
    <div>
      {/* Top Banner - Success Message */}
      <div className="top-banner">
        <div className="container">
          <p>🇵🇱 Application Received - Anna Rozkwitalska will contact you within 24 hours</p>
        </div>
      </div>

      {/* Blue Highlight Section */}
      <div className="highlight-section">
        <div className="container">
          <p>NEXT STEP: Book your FREE consultation call directly with Anna below</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          <section className="hero-section">
            <h1 className="hero-title">
              Thank You for Your Application
            </h1>
            <p className="hero-subtitle">
              Anna has received your consultation request. Schedule your free call below to secure your spot.
            </p>
          </section>

          {/* Video and CTA Grid */}
          <section className="main-grid">
            <div className="product-image">
              <div className="video-container">
                <iframe
                  src="https://www.youtube.com/embed/jPKA73f1rHI"
                  title="Mind in Blue Professional Therapy Services"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            
            <div className="benefits-section">
              <h2 className="benefits-title">🇵🇱 Ready to start your therapy journey?</h2>
              <ul className="benefits-list">
                <li>✓ FREE 15-minute consultation with licensed psychologist</li>
                <li>✓ English-speaking therapists who understand expat challenges</li>
                <li>✓ Online or in-person sessions in Gdansk</li>
                <li>✓ Flexible scheduling (Monday-Friday, 9am-8pm)</li>
                <li>✓ Culturally sensitive approach for expats in Poland</li>
                <li>✓ Same-day or next-day appointment availability</li>
              </ul>
              <a 
                href="https://calendly.com/mindinblue/free-15-minute-consultation-call"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button"
              >
                ➤ BOOK YOUR FREE CONSULTATION NOW
              </a>
              <p className="warning-text">📞 Don't wait - schedule your call today and take the first step toward better mental health</p>
            </div>
          </section>
        </div>
      </main>

      {/* Black Section - What to Expect */}
      <section className="what-includes-section">
        <div className="container">
          <h2 className="section-title-white">What to expect in your free consultation:</h2>
          
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">🎯</div>
              <h3>Assessment & Goals</h3>
              <p>Discuss your specific challenges as an expat and what you want to achieve through therapy.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🗣️</div>
              <h3>Approach Explanation</h3>
              <p>Learn about our culturally sensitive therapy methods and how we support expats in Poland.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📅</div>
              <h3>Session Planning</h3>
              <p>Schedule your first therapy session and choose between online or in-person options in Gdansk.</p>
            </div>
          </div>

          <div className="bottom-text">
            <p>
              🇵🇱 EXPAT-FOCUSED: Our team has helped 400+ expats successfully navigate life in Poland. 
              From cultural adaptation to relationship challenges, we understand your unique situation 
              and provide professional support in English.
            </p>
            <a 
              href="https://calendly.com/mindinblue/free-15-minute-consultation-call"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button secondary"
            >
              ➤ SCHEDULE MY FREE CALL
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta-section">
        <div className="container">
          <h2 className="final-cta-title">🇵🇱 Ready to thrive as an expat in Poland?</h2>
          <p className="final-cta-text">
            Don't wait another day to get the support you deserve. Book your FREE consultation now 
            and start your journey toward better mental health with Poland's #1 English-speaking therapy team.
          </p>
          <a 
            href="https://calendly.com/mindinblue/free-15-minute-consultation-call"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button final-cta"
          >
            BOOK MY FREE CONSULTATION CALL
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section">
        <div className="container">
          <div className="footer-content">
            <img src="/mindinblue_logo.png" alt="Mind in Blue Logo" className="footer-logo" />
            <div className="footer-text">
              <h3>Connect With Us</h3>
              <div className="footer-social">
                <a href="https://www.facebook.com/themindinblue#" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/themindinblue/" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://www.tiktok.com/@themindinblue" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </a>
                <a href="https://www.youtube.com/@themindinblue" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/company/themindinblue" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
              <p>
                <strong>Mind in Blue - Professional Mental Health Services</strong><br/>
                Located in Gdansk, Poland<br/>
                English-speaking therapy for expats
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );

  const PrivacyPolicyModal = () => (
    <div className="modal-overlay">
      <div className="privacy-modal-content">
        <button 
          className="modal-close"
          onClick={() => setShowPrivacyModal(false)}
        >
          ×
        </button>
        <h2 className="privacy-modal-title">Privacy Policy</h2>
        <div className="privacy-content">
          <div className="privacy-section">
            <h3>Data Controller</h3>
            <p>Anna Rozkwitalska, Licensed Psychologist, located in Gdansk, Poland, is the data controller for the personal data you provide through this website.</p>
          </div>
          
          <div className="privacy-section">
            <h3>What Data We Collect</h3>
            <p>We collect the following personal data when you submit the consultation request form:</p>
            <ul>
              <li>First and last name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Time living in Poland/Gdansk</li>
              <li>Primary challenges and preferred support type</li>
            </ul>
          </div>
          
          <div className="privacy-section">
            <h3>Legal Basis for Processing</h3>
            <p>We process your personal data based on your explicit consent (GDPR Art. 6(1)(a)) for:</p>
            <ul>
              <li>Contacting you about our mental health services</li>
              <li>Providing consultation and therapy services</li>
              <li>Sending information about our treatments and programs</li>
            </ul>
          </div>
          
          <div className="privacy-section">
            <h3>How We Use Your Data</h3>
            <p>Your personal data is used exclusively to:</p>
            <ul>
              <li>Respond to your inquiry within 24 hours</li>
              <li>Schedule and conduct therapy sessions</li>
              <li>Provide personalized mental health services</li>
              <li>Maintain therapy records as required by Polish law</li>
            </ul>
          </div>
          
          <div className="privacy-section">
            <h3>Data Retention</h3>
            <p>We retain your personal data for the duration necessary to provide our services and as required by Polish healthcare regulations, typically 5 years after the last therapy session.</p>
          </div>
          
          <div className="privacy-section">
            <h3>Your Rights Under GDPR</h3>
            <p>You have the following rights regarding your personal data:</p>
            <ul>
              <li>Right to access your data</li>
              <li>Right to rectification of inaccurate data</li>
              <li>Right to erasure ("right to be forgotten")</li>
              <li>Right to restrict processing</li>
              <li>Right to data portability</li>
              <li>Right to withdraw consent at any time</li>
              <li>Right to lodge a complaint with supervisory authority</li>
            </ul>
          </div>
          
          <div className="privacy-section">
            <h3>Data Security</h3>
            <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.</p>
          </div>
          
          <div className="privacy-section">
            <h3>Contact Information</h3>
            <p>For any questions about this privacy policy or to exercise your rights, please contact us at: <strong>info@mindinblue.com</strong></p>
          </div>
          
          <div className="privacy-footer">
            <strong>Last updated:</strong> August 2025<br/>
            This privacy policy complies with Polish Personal Data Protection Act and EU GDPR regulations.
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="AnnaRozkwitalskaTherapy">
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'thankyou' && <ThankYouPage />}
      <ContactModal 
        showModal={showModal}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        closeModal={closeModal}
        setShowPrivacyModal={setShowPrivacyModal}
      />
      {showPrivacyModal && <PrivacyPolicyModal />}
    </div>
  );
}

export default AnnaRozkwitalskaTherapy;
