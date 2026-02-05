'use client';

import { useEffect, useState } from 'react';
import { trackPageView, trackEvent } from '@/lib/gtm';

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    { id: 1, name: 'Product A', price: 29.99, category: 'Category 1' },
    { id: 2, name: 'Product B', price: 49.99, category: 'Category 2' },
    { id: 3, name: 'Product C', price: 79.99, category: 'Category 1' },
    { id: 4, name: 'Product D', price: 99.99, category: 'Category 3' },
  ];

  useEffect(() => {
    trackPageView('Products Page', {
      page_location: window.location.href,
    });
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    // Track view_item event
    trackEvent('view_item', {
      currency: 'USD',
      value: product.price,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: product.category,
          price: product.price,
        },
      ],
    });
  };

  const handleAddToCart = (product) => {
    // Track add_to_cart event
    trackEvent('add_to_cart', {
      currency: 'USD',
      value: product.price,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: product.category,
          price: product.price,
          quantity: 1,
        },
      ],
    });
    alert(`${product.name} added to cart!`);
  };

  return (
    <div>
      <h1>Products</h1>
      <p>Click on a product to view details or add to cart.</p>

      <div style={styles.grid}>
        {products.map((product) => (
          <div key={product.id} style={styles.card}>
            <h3>{product.name}</h3>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <div style={styles.buttonGroup}>
              <button
                onClick={() => handleProductClick(product)}
                style={{ ...styles.button, backgroundColor: '#0070f3' }}
              >
                View Details
              </button>
              <button
                onClick={() => handleAddToCart(product)}
                style={{ ...styles.button, backgroundColor: '#28a745' }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div style={styles.details}>
          <h2>Selected: {selectedProduct.name}</h2>
          <p>Price: ${selectedProduct.price}</p>
          <p>Category: {selectedProduct.category}</p>
          <p>This product detail view was tracked in dataLayer.</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginTop: '2rem',
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1.5rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  buttonGroup: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '1rem',
  },
  button: {
    flex: 1,
    padding: '0.75rem',
    border: 'none',
    borderRadius: '4px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  details: {
    marginTop: '2rem',
    padding: '1.5rem',
    backgroundColor: '#e8f4f8',
    borderRadius: '8px',
    borderLeft: '4px solid #0070f3',
  },
};
