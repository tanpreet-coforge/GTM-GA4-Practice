'use client';

export function trackEvent(eventName, eventData = {}) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventData,
    });
    console.log(`Event tracked: ${eventName}`, eventData);
  }
}

export function trackPageView(pageName, pageData = {}) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'page_view',
      page_title: pageName,
      ...pageData,
    });
    console.log(`Page view tracked: ${pageName}`, pageData);
  }
}
