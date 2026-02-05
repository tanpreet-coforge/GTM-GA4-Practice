'use client';

import { useEffect, useState } from 'react';
import { trackPageView, trackEvent } from '@/lib/gtm';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    trackPageView('Contact Page', {
      page_location: window.location.href,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields');
      return;
    }

    // Track form_submit custom event
    trackEvent('contact_form_submit', {
      form_name: 'contact_form',
      form_location: 'contact_page',
      user_name: formData.name,
      user_email: formData.email,
      message_length: formData.message.length,
    });

    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });

    // Reset success message after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div>
      <h1>Contact Us</h1>
      <p>Have a question or feedback? We'd love to hear from you.</p>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            style={{ ...styles.input, minHeight: '150px' }}
            required
          />
        </div>

        <button
          type="submit"
          style={{ ...styles.button, backgroundColor: '#0070f3', color: 'white' }}
        >
          Send Message
        </button>
      </form>

      {submitted && (
        <div style={styles.successMessage}>
          <p>✓ Thank you! Your message has been sent and tracked in Google Analytics.</p>
          <p>Check DevTools Console to see the contact_form_submit event in dataLayer.</p>
        </div>
      )}

      <div style={styles.info}>
        <h3>Events Tracked on This Page:</h3>
        <ul>
          <li>Page View when page loads</li>
          <li>Custom "contact_form_submit" event when form is submitted</li>
          <li>Event includes form name, location, and message length as custom parameters</li>
        </ul>
      </div>
    </div>
  );
}

const styles = {
  form: {
    maxWidth: '500px',
    margin: '2rem auto',
    padding: '1.5rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  formGroup: {
    marginBottom: '1.5rem',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    marginTop: '0.5rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  },
  button: {
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    width: '100%',
  },
  successMessage: {
    marginTop: '1.5rem',
    padding: '1rem',
    backgroundColor: '#d4edda',
    border: '1px solid #c3e6cb',
    borderRadius: '4px',
    color: '#155724',
  },
  info: {
    marginTop: '2rem',
    padding: '1.5rem',
    backgroundColor: '#e2e3e5',
    borderRadius: '8px',
  },
};
