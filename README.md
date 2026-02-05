# GTM & GA4 Practice Website

A simple Next.js website designed for practicing Google Tag Manager (GTM) and Google Analytics 4 (GA4) implementation. Perfect for learning event tracking, conversion tracking, and analytics setup.

## Features

- ✅ Multiple pages for tracking (Home, Products, Checkout, Contact)
- ✅ Page view tracking automatically on each page load
- ✅ Custom event tracking (view_item, add_to_cart, purchase, form_submit)
- ✅ E-commerce event examples for GA4
- ✅ Form submission tracking
- ✅ Vercel-ready deployment
- ✅ Easy environment variable configuration

## Quick Start

### 1. Clone/Download Files

https://github.com/tanpreet-coforge/GTM-GA4-Practice.git

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Replace with your actual IDs:
- **GTM_ID**: Your Google Tag Manager Container ID (e.g., GTM-ABC1234)
- **GA_ID**: Your Google Analytics 4 Measurement ID (e.g., G-ABC1234XYZ)

### 4. Run Locally

```bash
npm run dev
```

Visit `http://localhost:3000` to see the website.

### 5. Deploy to Vercel

```bash
npm install -g vercel
vercel
```

During deployment, add your environment variables:
- `NEXT_PUBLIC_GTM_ID`
- `NEXT_PUBLIC_GA_ID`

## How to Get GTM & GA4 IDs

### Getting Your GTM Container ID

1. Go to [Google Tag Manager](https://tagmanager.google.com)
2. Create a new account and container (choose "Web")
3. Your Container ID will be shown (e.g., GTM-XXXXXXX)
4. Accept the Terms of Service
5. You'll see the GTM installation code with your Container ID

### Getting Your GA4 Measurement ID

1. Go to [Google Analytics](https://analytics.google.com)
2. Create a new property
3. Set up data stream for Web
4. Your Measurement ID will be shown (e.g., G-XXXXXXXXXX)

## Events Tracked

### Page Views
- Automatically tracked on every page load
- Event: `page_view`
- Includes page title and location

### E-commerce Events (Products Page)
- **view_item**: When user clicks "View Details"
  - Includes: item_id, item_name, item_category, price, currency
- **add_to_cart**: When user clicks "Add to Cart"
  - Includes: item_id, item_name, item_category, price, quantity, currency

### Conversion Events (Checkout Page)
- **begin_checkout**: When checkout form is submitted
  - Includes: items list, total value, currency
- **purchase**: When order is completed (conversion event)
  - Includes: transaction_id, items, value, currency

### Custom Events (Contact Page)
- **contact_form_submit**: When contact form is submitted
  - Includes: form_name, form_location, user_name, user_email, message_length

## Testing Your Setup

### 1. Check dataLayer in Browser Console

Open DevTools (F12) → Console tab and type:

```javascript
console.log(window.dataLayer);
```

You'll see all events pushed to the dataLayer.

### 2. Monitor Real-time Events in GTM Preview

1. Go to Google Tag Manager dashboard
2. Click "Preview" button
3. Enter your website URL
4. A GTM preview panel will appear showing all events and dataLayer values in real-time
5. Navigate your website to see events being captured

### 3. Check GA4 Real-time Report

1. Go to Google Analytics 4 property
2. Navigate to Reports → Real-time
3. You should see active users and events in real-time as you browse the website

## Project Structure

```
├── app/
│   ├── layout.js          # Root layout with GTM setup
│   ├── page.js            # Home page
│   ├── products/
│   │   └── page.js        # Products page with e-commerce events
│   ├── checkout/
│   │   └── page.js        # Checkout page with purchase events
│   └── contact/
│       └── page.js        # Contact page with form events
├── lib/
│   └── gtm.js             # GTM and GA4 utilities and helper functions
├── package.json           # Dependencies
├── next.config.js         # Next.js configuration
├── .env.local             # Environment variables (create this)
└── README.md              # This file
```

## Key Files

### `lib/gtm.js`
Contains helper functions:
- `GTMHead()`: React component that loads GTM and GA4 scripts
- `trackEvent()`: Push custom events to dataLayer
- `trackPageView()`: Track page views with custom data

### `app/layout.js`
- Sets up GTM/GA4 in the head
- Includes GTM noscript fallback
- Navigation between pages

## Customization

### Adding New Events

In any component, use the `trackEvent()` function:

```javascript
import { trackEvent } from '@/lib/gtm';

// In your event handler
trackEvent('your_event_name', {
  custom_param1: 'value1',
  custom_param2: 'value2',
});
```

### Adding New Pages

1. Create a new folder in `app/` (e.g., `app/about/`)
2. Add `page.js` inside
3. Import and use `trackPageView()` in `useEffect`
4. Add navigation link in `app/layout.js`

## Troubleshooting

### Events Not Appearing in GA4

1. **Check Preview Mode**: Use GTM preview mode first to verify events are in dataLayer
2. **Wait for Real-time**: GA4 real-time report shows data within 1-2 minutes
3. **Check Tags in GTM**: Ensure you have a GA4 configuration tag set up in GTM
4. **Verify IDs**: Double-check your GTM_ID and GA_ID are correct
5. **Check Filters**: Ensure no filters are blocking your traffic (check as internal traffic)

### Events in Console but Not in GA4

- Your GTM container may not have GA4 tags properly configured
- In GTM: Create a GA4 Configuration tag and a Pageview trigger
- In GTM: Create triggers for your custom events

## Next Steps

After setting up this website:

1. **Create GTM Tags**: Set up GA4 tags in GTM for each event
2. **Create GA4 Events**: Custom events may need to be registered in GA4
3. **Set Up Conversions**: Mark important events as conversions in GA4
4. **Create Audiences**: Build audiences based on tracked events
5. **Set Up Goals**: Monitor conversion metrics and user behavior

## Resources

- [Google Tag Manager Documentation](https://support.google.com/tagmanager/)
- [Google Analytics 4 Help](https://support.google.com/analytics/)
- [GA4 Event Reference](https://support.google.com/analytics/answer/9322688)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)

## License

Free to use for learning and practice purposes.
