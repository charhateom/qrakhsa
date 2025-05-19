import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

const Homepage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.emergencyQRBrandTopLeftContainer}>
        <Link to="/" style={styles.brandLink}>
          <AlertCircle style={styles.brandIcon} />
          <span style={styles.brandText}>EmergencyQR</span>
        </Link>
      </div>
      <div style={styles.loginButtonTopRightContainer}>
        <Link to="/logintype" style={styles.loginButton}>
          Continue with Login
        </Link>
      </div>

      <section style={styles.heroSection}>
        <header style={styles.header}>
          <h1 style={styles.title}>QRaksha</h1>
          <p style={styles.subtitle}>Revolutionizing Emergency Response & Workplace Safety</p>
        </header>
      </section>

      <section style={styles.offerSection}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>What We Offer</h2>
          <p style={styles.description}>
            QRaksha is a smart Emergency QR Code System designed to boost workplace safety and speed up emergency response. It integrates easily with existing security, using QR codes, live tracking, and instant alerts for quick access to vital info when it matters most.
          </p>
        </div>
      </section>

      <section style={styles.featuresSection}>
        <h2 style={styles.sectionTitle}>Key Features & Real-Time Impact</h2>
        <div style={styles.featureCardsContainerHorizontal}>
          <div style={styles.featureCardHorizontal}>
            <h3 style={styles.featureCardTitle}>Employee QR Codes</h3>
            <p style={styles.featureCardDescription}>
              Unique, scannable codes with emergency contacts & medical info. Facilitates instant access to crucial data during crises.
            </p>
          </div>
          <div style={styles.featureCardHorizontal}>
            <h3 style={styles.featureCardTitle}>SOS Alert System</h3>
            <p style={styles.featureCardDescription}>
              One-click emergency button sends live location via SMS, email, and push notifications. Ensures rapid response and real-time tracking of distress signals.
            </p>
          </div>
          <div style={styles.featureCardHorizontal}>
            <h3 style={styles.featureCardTitle}>Admin Dashboard for Incident Tracking</h3>
            <p style={styles.featureCardDescription}>
              Role-based access to monitor emergency alerts & locations. Centralized system improves incident handling efficiency by 25%.
            </p>
          </div>
          <div style={styles.featureCardHorizontal}>
            <h3 style={styles.featureCardTitle}>Live Location Tracking with Geo-Fencing</h3>
            <p style={styles.featureCardDescription}>
              Monitors employees in real time with GPS-based location accuracy. Enhances security with proactive boundary alerts.
            </p>
          </div>
          <div style={styles.featureCardHorizontal}>
            <h3 style={styles.featureCardTitle}>AI-Driven Emergency Prediction (Future Scope)</h3>
            <p style={styles.featureCardDescription}>
              Uses anomaly detection for predicting potential security threats. Iterative ML integration enhances proactive safety measures.
            </p>
          </div>
        </div>
      </section>

      {/* <footer style={styles.footer}> */}
      {/* </footer> */}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'center',
    padding: '60px 30px',
    backgroundColor: '#111827',
    fontFamily: "'Roboto', 'Helvetica Neue', Arial, sans-serif",
    color: '#f8f8f8',
    textAlign: 'center',
    position: 'relative',
  },
  emergencyQRBrandTopLeftContainer: {
    position: 'absolute',
    top: '20px',
    left: '30px',
    zIndex: 10,
  },
  brandLink: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: 'inherit',
  },
  brandIcon: {
    height: '2.5rem',
    width: '2.5rem',
    color: 'red',
  },
  brandText: {
    marginLeft: '0.5rem',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#f8f8f8',
  },
  loginButtonTopRightContainer: {
    position: 'absolute',
    top: '20px',
    right: '30px',
    zIndex: 10,
  },
  heroSection: {
    marginBottom: '60px',
  },
  header: {
    marginBottom: '20px',
  },
  title: {
    fontSize: '3.5em',
    fontWeight: '700',
    color: '#fff',
    marginBottom: '10px',
    letterSpacing: '1px',
    textShadow: '2px 2px 3px rgba(0,0,0,0.3)',
  },
  subtitle: {
    fontSize: '1.2em',
    color: '#ddd',
    marginBottom: '20px',
    fontStyle: 'italic',
  },
  offerSection: {
    marginBottom: '60px',
    width: '100%',
    maxWidth: '800px',
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#1e293b',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
    border: '1px solid #374151',
    textAlign: 'left',
    width: 'auto',
    maxWidth: '100%',
    marginRight: '0',
  },
  cardTitle: {
    fontSize: '1.8em',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#3498db',
    textAlign: 'center',
  },
  description: {
    fontSize: '1.15em',
    lineHeight: '1.7',
    color: '#ddd',
  },
  featuresSection: {
    marginBottom: '70px',
    width: '100%',
  },
  sectionTitle: {
    fontSize: '2.2em',
    fontWeight: 'bold',
    marginBottom: '40px',
    color: '#fff',
    textAlign: 'center',
    letterSpacing: '0.5px',
  },
  featureCardsContainerHorizontal: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    gap: '20px',
    overflowX: 'auto', // Changed from hidden to auto to allow horizontal scroll if needed
    paddingBottom: '20px', // Added padding to accommodate scrollbar if it appears on smaller screens

    // Media Query for smaller screens (e.g., tablets and phones)
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'center',
      gap: '30px', // Adjusted vertical gap for stacked cards
      overflowX: 'hidden', // Hide horizontal scroll when stacked vertically
      paddingBottom: '0px', // Remove bottom padding when vertically stacked
    },
  },
  featureCardHorizontal: {
    backgroundColor: '#1e293b',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
    border: '1px solid #374151',
    textAlign: 'left',
    flex: '1 1 300px', // Flex-grow, flex-shrink, flex-basis. flex-basis set to a minimum width
    minWidth: '300px', //  Ensures cards don't shrink too much
    maxWidth: '400px', // Added maxWidth to control max width of cards

    // Media Query adjustments for smaller screens
    '@media (max-width: 768px)': {
      minWidth: 'auto',
      maxWidth: '100%', // Take full width of container when stacked
      width: '100%',
      textAlign: 'center',
      padding: '30px', // Adjusted padding for stacked cards
    },
  },
  featureCardTitle: {
    fontSize: '1.5em',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#3498db',
  },
  featureCardDescription: {
    fontSize: '1.1em',
    lineHeight: '1.7',
    color: '#ddd',
  },
  footer: {
    marginBottom: '20px',
    marginTop: '60px',
    paddingBottom: '20px',
  },
  loginButton: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '12px 24px',
    fontSize: '1em',
    fontWeight: '500',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    textDecoration: 'none',
    textAlign: 'center',
    display: 'inline-block',
    '&:hover': {
      backgroundColor: '#2980b9',
      transform: 'scale(1.03)',
      boxShadow: '0 6px 14px rgba(0,0,0,0.2)',
    },
    '&:active': {
      transform: 'scale(0.99)',
      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
    },
  },
  footerText: {
    marginTop: '20px',
    fontSize: '0.95em',
    color: '#ccc',
  },
};

export default Homepage;