'use client';

import { useEffect } from 'react';
import { trackPageView } from '@/lib/gtm';

export default function Home() {
  useEffect(() => {
    trackPageView('Home Page', {
      page_location: window.location.href,
    });
  }, []);

  return (
    <div>
      <h1>Welcome to GTM & GA4 Practice Website</h1>
      <p>This is a practice website to help you learn Google Tag Manager and Google Analytics 4 implementation.</p>
      
      <h2>What You'll Practice:</h2>
      <ul>
        <li>Setting up Google Tag Manager container</li>
        <li>Implementing GA4 measurement tracking</li>
        <li>Tracking page views automatically</li>
        <li>Tracking custom events</li>
        <li>Setting up conversion tracking</li>
      </ul>

      <h2>Getting Started:</h2>
      <p>
        Check the <strong>Setup Instructions</strong> section at the bottom of this page or
        read the README.md file for detailed GTM and GA4 configuration.
      </p>

      <h2>Practice Outbound Link Tracking:</h2>
      <p>Click these external links to practice tracking outbound link clicks in GTM and GA4:</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem', marginBottom: '2rem' }}>
        <a 
          href="https://www.google.com" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ padding: '1rem', border: '2px solid #007bff', borderRadius: '4px', textAlign: 'center', textDecoration: 'none', color: '#007bff', backgroundColor: '#f0f7ff', fontWeight: 'bold' }}
        >
          Google
        </a>
        
        <a 
          href="https://www.github.com" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ padding: '1rem', border: '2px solid #28a745', borderRadius: '4px', textAlign: 'center', textDecoration: 'none', color: '#28a745', backgroundColor: '#f0fff4', fontWeight: 'bold' }}
        >
          GitHub
        </a>
        
        <a 
          href="https://www.stackoverflow.com" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ padding: '1rem', border: '2px solid #f48024', borderRadius: '4px', textAlign: 'center', textDecoration: 'none', color: '#f48024', backgroundColor: '#fff5f0', fontWeight: 'bold' }}
        >
          Stack Overflow
        </a>
        
        <a 
          href="https://www.youtube.com" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ padding: '1rem', border: '2px solid #ff0000', borderRadius: '4px', textAlign: 'center', textDecoration: 'none', color: '#ff0000', backgroundColor: '#fff0f0', fontWeight: 'bold' }}
        >
          YouTube
        </a>
        
        <a 
          href="https://www.linkedin.com" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ padding: '1rem', border: '2px solid #0a66c2', borderRadius: '4px', textAlign: 'center', textDecoration: 'none', color: '#0a66c2', backgroundColor: '#f0f5ff', fontWeight: 'bold' }}
        >
          LinkedIn
        </a>
        
        <a 
          href="https://www.twitter.com" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ padding: '1rem', border: '2px solid #1da1f2', borderRadius: '4px', textAlign: 'center', textDecoration: 'none', color: '#1da1f2', backgroundColor: '#f0f7ff', fontWeight: 'bold' }}
        >
          Twitter/X
        </a>
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <h3>Current Configuration:</h3>
        <p><strong>GTM ID:</strong> {process.env.NEXT_PUBLIC_GTM_ID || 'Not configured (GTM-XXXXXXX)'}</p>
        <p><strong>GA4 ID:</strong> {process.env.NEXT_PUBLIC_GA_ID || 'Not configured (G-XXXXXXXXXX)'}</p>
        <p style={{ fontSize: '0.9rem', color: '#666' }}>Open browser DevTools Console to see dataLayer events</p>
      </div>
    </div>
  );
}
