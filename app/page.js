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

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <h3>Current Configuration:</h3>
        <p><strong>GTM ID:</strong> {process.env.NEXT_PUBLIC_GTM_ID || 'Not configured (GTM-XXXXXXX)'}</p>
        <p><strong>GA4 ID:</strong> {process.env.NEXT_PUBLIC_GA_ID || 'Not configured (G-XXXXXXXXXX)'}</p>
        <p style={{ fontSize: '0.9rem', color: '#666' }}>Open browser DevTools Console to see dataLayer events</p>
      </div>
    </div>
  );
}
