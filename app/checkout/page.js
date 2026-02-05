'use client';

import { useEffect, useState } from 'react';
import { trackPageView, trackEvent } from '../lib/gtm';

export default function Checkout() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    cardNumber: '',
  });

  const [orderComplete, setOrderComplete] = useState(false);

  useEffect(() => {
    trackPageView('Checkout Page', {
      page_location: window.location.href,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.address || !formData.cardNumber) {
      alert('Please fill in all fields');
      return;
    }

    // Track begin_checkout event
    trackEvent('begin_checkout', {
      currency: 'USD',
      value: 159.97,
      items: [
        {
          item_id: 1,
          item_name: 'Product A',
          price: 29.99,
          quantity: 1,
        },
        {
          item_id: 2,
          item_name: 'Product B',
          price: 49.99,
          quantity: 1,
        },
      ],
    });

    // Simulate purchase processing
    setTimeout(() => {
      // Track purchase event (conversion)
      trackEvent('purchase', {
        currency: 'USD',
        transaction_id: 'TXN_' + Date.now(),
        value: 159.97,
        items: [
          {
            item_id: 1,
            item_name: 'Product A',
            price: 29.99,
            quantity: 1,
          },
          {
            item_id: 2,
            item_name: 'Product B',
            price: 49.99,
            quantity: 1,
          },
        ],
      });

      setOrderComplete(true);
      setFormData({ name: '', email: '', address: '', cardNumber: '' });
    }, 1000);
  };

  if (orderComplete) {
    return (
      <div style={styles.successContainer}>
        <h1>Order Placed Successfully! ✓</h1>
        <p>Your purchase event was tracked in Google Analytics.</p>
        <p>Check the Console in DevTools to see the purchase event in dataLayer.</p>
        <button
          onClick={() => setOrderComplete(false)}
          style={{ ...styles.button, backgroundColor: '#0070f3', color: 'white' }}
        >
          Complete Another Order
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="name">Full Name:</label>
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
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            style={{ ...styles.input, minHeight: '100px' }}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="cardNumber">Card Number:</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            style={styles.input}
            placeholder="1234 5678 9012 3456"
            required
          />
        </div>

        <div style={styles.orderSummary}>
          <h3>Order Summary</h3>
          <p>Product A: $29.99</p>
          <p>Product B: $49.99</p>
          <hr />
          <p><strong>Total: $159.97</strong></p>
        </div>

        <button
          type="submit"
          style={{ ...styles.button, backgroundColor: '#28a745', color: 'white', width: '100%' }}
        >
          Complete Purchase
        </button>
      </form>

      <div style={styles.info}>
        <h3>Events Tracked:</h3>
        <ul>
          <li>Page View on checkout page load</li>
          <li>begin_checkout when form is submitted</li>
          <li>purchase (conversion event) on successful order</li>
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
  },
  orderSummary: {
    backgroundColor: '#f9f9f9',
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '1.5rem',
  },
  successContainer: {
    textAlign: 'center',
    padding: '3rem',
    backgroundColor: '#d4edda',
    border: '1px solid #c3e6cb',
    borderRadius: '8px',
    color: '#155724',
  },
  info: {
    marginTop: '2rem',
    padding: '1.5rem',
    backgroundColor: '#e2e3e5',
    borderRadius: '8px',
  },
};
