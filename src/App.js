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
        <h2 className="modal-title">Contact With Us</h2>
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
            <label htmlFor="experience">Your Age Range *</label>
            <select
              id="experience"
              name="experience"
              value={formData.experience || ''}
              onChange={handleInputChange}
              required
            >
              <option value="">Select...</option>
              <option value="18-25">18-25 years old</option>
              <option value="26-35">26-35 years old</option>
              <option value="36-45">36-45 years old</option>
              <option value="46-55">46-55 years old</option>
              <option value="56-65">56-65 years old</option>
              <option value="65+">65+ years old</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="goal">What brings you here today? *</label>
            <select
              id="goal"
              name="goal"
              value={formData.goal || ''}
              onChange={handleInputChange}
              required
            >
              <option value="">Select...</option>
              <option value="anxiety-stress">Feeling anxious or stressed</option>
              <option value="depression-mood">Low mood or depression</option>
              <option value="relationship-support">Relationship difficulties</option>
              <option value="life-changes">Major life transitions</option>
              <option value="work-burnout">Work stress or burnout</option>
              <option value="expat-challenges">Expat/cultural adjustment</option>
              <option value="personal-growth">Personal development</option>
              <option value="other-concerns">Other concerns</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="budget">Preferred Session Type *</label>
            <select
              id="budget"
              name="budget"
              value={formData.budget || ''}
              onChange={handleInputChange}
              required
            >
              <option value="">Select...</option>
              <option value="online-sessions">Online therapy sessions</option>
              <option value="in-person-gdansk">In-person sessions (Gdansk)</option>
              <option value="life-coaching">Life coaching sessions</option>
              <option value="couples-therapy">Couples therapy</option>
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
                I agree to be contacted regarding therapy services. *
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
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
});

function App() {
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
    const subject = encodeURIComponent('New Client Application - Mind in Blue');
    const body = encodeURIComponent(`
New Client Information:

First Name: ${formData.firstName}
Last Name: ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Age Range: ${formData.experience}
Primary Concern: ${formData.goal}
Preferred Session Type: ${formData.budget}
Consent Given: ${formData.consent ? 'Yes' : 'No'}

This application was submitted from the Mind in Blue website sales funnel.
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
      {/* Header Section */}
      <header className="header">
        <div className="container">
          <img src="/header_logo.png" alt="Mind in Blue Logo" className="logo" />
          <p>Counselling • Psychotherapy • Life Coaching</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          {/* Hero Section */}
          <section className="hero-section">
            <h2 className="hero-title">Professional Therapy & Life Coaching</h2>
            <p className="hero-subtitle">
              Transform your life with expert counselling, psychotherapy, and life coaching services. 
              Specializing in supporting expats, digital nomads, and professionals navigating life's challenges 
              with culturally sensitive, English-speaking therapists.
            </p>
          </section>

          {/* Features Grid */}
          <section className="features-grid">
            <div className="feature-card">
              <h3>🌍 Expat & Digital Nomad Specialists</h3>
              <p>
                Expert support for adapting to new cultures, managing long-distance relationships, 
                and overcoming the unique challenges of living abroad.
              </p>
            </div>
            <div className="feature-card">
              <h3>🎯 Professional Counselling</h3>
              <p>
                Licensed psychologists and therapists providing evidence-based treatment for 
                depression, anxiety, relationship issues, and burnout.
              </p>
            </div>
            <div className="feature-card">
              <h3>💪 Culturally Sensitive Approach</h3>
              <p>
                Judgment-free, confidential support welcoming all backgrounds, religions, 
                and sexual orientations with multilingual therapists.
              </p>
            </div>
            <div className="feature-card">
              <h3>⚡ Online & In-Person Sessions</h3>
              <p>
                Flexible therapy options - meet in our Gdansk office or connect remotely 
                from anywhere in the world at competitive rates.
              </p>
            </div>
            <div className="feature-card">
              <h3>🌟 Life Transformation</h3>
              <p>
                Go beyond symptom relief to achieve personal growth, self-awareness, 
                and meaningful life changes through our holistic approach.
              </p>
            </div>
            <div className="feature-card">
              <h3>🚀 Proven Results</h3>
              <p>
                Join hundreds of clients who have successfully overcome challenges and 
                built fulfilling lives with our professional support system.
              </p>
            </div>
          </section>

          {/* Call to Action */}
          <section className="cta-section">
            <h2 style={{ marginBottom: '1rem', fontSize: '2.2rem' }}>
              Ready to Start Your Journey?
            </h2>
            <p style={{ marginBottom: '2rem', fontSize: '1.2rem', opacity: '0.9' }}>
              Take the first step toward better mental health and personal growth. 
              Our professional team is here to support you through life's challenges.
            </p>
            <button 
              className="cta-button"
              onClick={() => setShowModal(true)}
            >
              Get Professional Support Today
            </button>
          </section>

          {/* Why Choose Mind in Blue */}
          <section className="why-choose-section">
            <h2 className="section-title">Why Choose Mind in Blue?</h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <h3>🏆 Experienced Professionals</h3>
                <p>Our team of 6 licensed psychologists and therapists provide expert care with years of experience in counselling and psychotherapy.</p>
              </div>
              <div className="benefit-card">
                <h3>🌐 Multilingual Support</h3>
                <p>Services available in 4 languages including English, Polish, Italian, and Spanish - perfect for international clients.</p>
              </div>
              <div className="benefit-card">
                <h3>💰 Competitive Pricing</h3>
                <p>Located in Poland, we offer high-quality mental health services at accessible prices compared to Western Europe rates.</p>
              </div>
            </div>
          </section>

          {/* Specialized Services */}
          <section className="services-section">
            <h2 className="section-title">Specialized Mental Health Services</h2>
            <div className="services-grid">
              <div className="service-item">
                <h4>Individual Counselling & Psychotherapy</h4>
                <p>Confidential, judgment-free support for depression, anxiety, relationship problems, and emotional instability.</p>
              </div>
              <div className="service-item">
                <h4>Expat & Digital Nomad Support</h4>
                <p>Specialized help with cultural adaptation, loneliness, long-distance relationships, and lifestyle transitions.</p>
              </div>
              <div className="service-item">
                <h4>Couples Therapy & Relationship Counselling</h4>
                <p>Professional guidance for relationship difficulties and intercultural relationship challenges.</p>
              </div>
            </div>
          </section>

          {/* Social Proof */}
          <section className="testimonial-section">
            <h2 className="section-title">Trusted by Hundreds of Clients Worldwide</h2>
            <div className="testimonial-content">
              <p className="testimonial-text">
                "Mind in Blue provides a safe, welcoming space for everyone regardless of religion, sexual orientation, 
                or cultural background. Our approach focuses on understanding your unique needs and creating a 
                personalized therapy journey that promotes genuine healing and growth."
              </p>
              <div className="stats-row">
                <div className="stat-item">
                  <h3>6+</h3>
                  <p>Licensed Therapists</p>
                </div>
                <div className="stat-item">
                  <h3>4</h3>
                  <p>Languages Supported</p>
                </div>
                <div className="stat-item">
                  <h3>100+</h3>
                  <p>Satisfied Clients</p>
                </div>
                <div className="stat-item">
                  <h3>24/7</h3>
                  <p>Online Availability</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

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
            </div>
          </div>
        </div>
      </footer>
    </div>
  );

  const ThankYouPage = () => (
    <div className="thank-you-page">
      <div className="container">
        {/* Thank You Header */}
        <div className="thank-you-content">
          <h1 className="thank-you-title">Thank You for Your Application</h1>
          <p className="thank-you-subtitle">
            Your consultation request has been received successfully. Our professional team will contact you within 24 hours 
            to discuss how we can support your mental health journey.
          </p>
        </div>

        {/* Video Section */}
        <section className="video-section">
          <h2 className="video-title">Meet Our Professional Team</h2>
          <div className="video-container">
            <iframe
              src="https://www.youtube.com/embed/jPKA73f1rHI"
              title="Mind in Blue Professional Therapy Services"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <p className="video-description">
            Learn about our evidence-based approach to mental health and how we can help you achieve lasting positive change.
          </p>
        </section>

        {/* Priority CTA - Free Consultation */}
        <section className="priority-cta-section">
          <div className="priority-cta-card">
            <h2 className="priority-title">Schedule Your Free Consultation</h2>
            <p className="priority-description">
              Don't wait - take the next step today. Book your complimentary 15-minute consultation 
              with one of our licensed therapists to discuss your specific needs and goals.
            </p>
            <a 
              href="https://calendly.com/mindinblue/free-15-minute-consultation-call"
              target="_blank"
              rel="noopener noreferrer"
              className="priority-button"
            >
              Book Your Free Call Now
            </a>
          </div>
        </section>

        {/* Professional Social Media Section */}
        <section className="professional-social-section">
          <h2 className="social-section-title">Connect With Us</h2>
          <div className="social-grid">
            <div className="professional-social-card">
              <div className="social-header">
                <svg className="facebook-icon" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <h3>Facebook</h3>
              </div>
              <p>Join our community for mental health tips, resources, and support for expats and professionals.</p>
              <a 
                href="https://www.facebook.com/Mind-in-blue-100352962679857/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="professional-social-link"
              >
                Follow Our Page
              </a>
            </div>
            <div className="professional-social-card">
              <div className="social-header">
                <svg className="instagram-icon" viewBox="0 0 24 24" fill="url(#instagram-gradient)">
                  <defs>
                    <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f09433" />
                      <stop offset="25%" stopColor="#e6683c" />
                      <stop offset="50%" stopColor="#dc2743" />
                      <stop offset="75%" stopColor="#cc2366" />
                      <stop offset="100%" stopColor="#bc1888" />
                    </linearGradient>
                  </defs>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <h3>Instagram</h3>
              </div>
              <p>Follow us for daily inspiration, mental health awareness, and behind-the-scenes content from our team.</p>
              <a 
                href="https://www.instagram.com/themindinblue/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="professional-social-link"
              >
                Follow Our Account
              </a>
            </div>
          </div>
        </section>
      </div>
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
            <p>Mind in Blue, located at Gdansk, Poland, is the data controller for the personal data you provide through this website.</p>
          </div>
          
          <div className="privacy-section">
            <h3>What Data We Collect</h3>
            <p>We collect the following personal data when you submit the contact form:</p>
            <ul>
              <li>First and last name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Age range</li>
              <li>Primary concerns and session preferences</li>
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
    <div className="App">
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

export default App;
