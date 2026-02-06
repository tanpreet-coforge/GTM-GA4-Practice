# GTM & GA4 Practice Website — Step‑by‑Step Tutorial

A hands-on Next.js website for learning and practicing **Google Tag Manager (GTM)** and **Google Analytics 4 (GA4)**.  
You'll deploy quickly, verify events in GTM Preview and GA4 Realtime, and follow best practices for tags, triggers, and variables.

***

## What You'll Build

*   ✅ Multi-page Next.js app (Home, Products, Checkout, Contact)
*   ✅ **Automatic page view** tracking (via GTM + GA4 Configuration)
*   ✅ **Custom events**: `view_item`, `add_to_cart`, `begin_checkout`, `purchase`, `contact_form_submit`
*   ✅ **E‑commerce examples** following GA4 recommended parameters
*   ✅ Vercel-ready deployment + environment variables
*   ✅ Debug-friendly setup (Tag Assistant & GA4 Realtime)

***

## Prerequisites

*   A Google account with access to **Google Tag Manager** and **Google Analytics**
*   Node.js 18+ and npm
*   A Vercel account (free)

***

## 1) Clone & Install

```bash
git clone https://github.com/tanpreet-coforge/GTM-GA4-Practice.git
cd GTM-GA4-Practice
npm install
```

***

## 2) Create GTM & GA4 Properties

### 2.1 Create a GTM Web Container

1.  Go to **tagmanager.google.com** and click **Create Account**.
2.  Add an **Account name**, **Container name**, choose **Web**, then **Create**.
3.  Copy the Container ID: looks like `GTM-XXXXXXX`.

### 2.2 Create a GA4 Property & Web Data Stream

1.  Go to **analytics.google.com** → **Admin** → **Create Property**.
2.  Set up a **Web** data stream for your site.
3.  Copy the **Measurement ID**: looks like `G-XXXXXXXXXX`.

> You won't paste raw GTM/GA snippets into code; this project loads GTM dynamically using `NEXT_PUBLIC_GTM_ID`, and your **GA4 runs via GTM** using a GA4 Configuration tag. This is a clean, scalable pattern.

***

## 3) Configure Environment Variables

Create **`.env.local`** in the project root:

```env
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

*   `NEXT_PUBLIC_GTM_ID`: Your GTM Container ID
*   `NEXT_PUBLIC_GA_ID`: Your GA4 Measurement ID (used by GTM's GA4 Configuration tag or for validation)

> Keep IDs in env vars to avoid leaking them in source code and to support multiple environments (Dev/Prod). Vercel will let you set these per environment at deploy time.

***

## 4) Run Locally

```bash
npm run dev
```

Open **http://localhost:3000**.  
You can start reading the next sections while the app is running.

***

## 5) Deploy to Vercel

```bash
npm install -g vercel
vercel
```

*   When prompted, select your scope and project settings.
*   In Vercel → **Project Settings → Environment Variables**, add:
    *   `NEXT_PUBLIC_GTM_ID`
    *   `NEXT_PUBLIC_GA_ID`

Deploy to **Production** when ready.

***

## 6) Connect GTM to GA4 (Tags, Triggers, Variables)

We'll wire up GA4 through GTM so your site's `dataLayer` pushes become GA4 events.

### 6.1 Variables (create first; they'll be reused)

Create the following in **GTM → Variables → New**:

**User-Defined Variables**

*   **`DLV – page_title`** → *Data Layer Variable* → Name: `page_title` → Version: v2 → Default: `{{Page Title}}`
*   **`DLV – page_location`** → *Data Layer Variable* → Name: `page_location`
*   **`DLV – page_path`** → *Data Layer Variable* → Name: `page_path`
*   **`DLV – ecommerce`** → *Data Layer Variable* → Name: `ecommerce`

**Recommended Built-in Variables** (enable in **Configure**):

*   **Clicks**: `Click URL`, `Click Text`, `Click Classes`
*   **Forms**: `Form ID`, `Form Classes`, `Form Target`, `Form URL`
*   **Pages**: `Page URL`, `Page Hostname`, `Page Path`, `Referrer`

> Naming convention: `DLV – <name>` for Data Layer Variable, `JS – <name>` for JS variables, `CE – <name>` for constants, etc. Keep it consistent and searchable.

### 6.2 Triggers

Create these in **GTM → Triggers → New**:

1.  **All Pages – Page View**

*   Type: **Page View** → *All Page Views*
*   Name: `PV – All Pages`

2.  **Custom Event – view\_item**

*   Type: **Custom Event**
*   Event name: `view_item`
*   Name: `CE – view_item`

3.  **Custom Event – add\_to\_cart**

*   Type: **Custom Event**
*   Event name: `add_to_cart`
*   Name: `CE – add_to_cart`

4.  **Custom Event – begin\_checkout**

*   Type: **Custom Event**
*   Event name: `begin_checkout`
*   Name: `CE – begin_checkout`

5.  **Custom Event – purchase**

*   Type: **Custom Event**
*   Event name: `purchase`
*   Name: `CE – purchase`

6.  **Custom Event – contact\_form\_submit**

*   Type: **Custom Event**
*   Event name: `contact_form_submit`
*   Name: `CE – contact_form_submit`

> You can add more later (e.g., `view_item_list`, `select_item`, `add_payment_info`, etc.). Start focused to validate your plumbing first.

### 6.3 Tags

Create these in **GTM → Tags → New**:

**A) GA4 Configuration (required)**

*   Tag Type: **Google Analytics: GA4 Configuration**
*   Measurement ID: `G-XXXXXXXXXX` (your GA4 ID)
*   Trigger: `PV – All Pages`
*   Advanced Settings: *Leave defaults* (Optionally set **Send to server container** if you use GA4 SS later)
*   Name: `GA4 – Config`

**B) GA4 Events** (one tag per event OR use a single event tag with a Lookup Table—start simple first)

1.  **GA4 – Event – view\_item**
    *   Tag Type: **GA4 Event**
    *   Configuration Tag: `GA4 – Config`
    *   Event Name: `view_item`
    *   Event Parameters → Add:
        *   `items` → Value: `{{DLV – ecommerce}}` (the `items` array is inside `ecommerce`)
    *   Trigger: `CE – view_item`

2.  **GA4 – Event – add\_to\_cart**
    *   Event Name: `add_to_cart`
    *   Parameters: `items` → `{{DLV – ecommerce}}`
    *   Trigger: `CE – add_to_cart`

3.  **GA4 – Event – begin\_checkout**
    *   Event Name: `begin_checkout`
    *   Parameters: `items` → `{{DLV – ecommerce}}`, `value`, `currency` (if you push them at root)
    *   Trigger: `CE – begin_checkout`

4.  **GA4 – Event – purchase**
    *   Event Name: `purchase`
    *   Parameters: `transaction_id`, `value`, `currency`, `items` → map from your dataLayer push
    *   Trigger: `CE – purchase`

5.  **GA4 – Event – contact\_form\_submit**
    *   Event Name: `contact_form_submit`
    *   Parameters: `form_name`, `form_location`, `user_email` (avoid PII in GA—see note below)
    *   Trigger: `CE – contact_form_submit`

> **PII Reminder:** GA4 policies prohibit collecting PII (emails, names) unless properly hashed and compliant with policies. Prefer non-PII attributes (e.g., form name, form type). If you must, implement hashing client-side and confirm policy compliance.

***

## 7) How Events Are Pushed (What the Site Emits)

Your app pushes a mixture of **page view context** and **event payloads** into `window.dataLayer`. Examples you'll likely see:

### 7.1 Page Views

Typically handled by the **GA4 Configuration tag** in GTM (All Pages).  
If you also push virtual pageviews (for SPA behaviors), they may look like:

```js
window.dataLayer.push({
  event: 'page_view',
  page_title: document.title,
  page_location: window.location.href,
  page_path: window.location.pathname
});
```

### 7.2 E‑commerce Events (Products / Checkout)

```js
// view_item
window.dataLayer.push({
  event: 'view_item',
  ecommerce: {
    items: [
      { item_id: 'sku-123', item_name: 'Demo Product', item_category: 'Category A', price: 49.0, quantity: 1 }
    ]
  }
});

// add_to_cart
window.dataLayer.push({
  event: 'add_to_cart',
  ecommerce: {
    items: [
      { item_id: 'sku-123', item_name: 'Demo Product', item_category: 'Category A', price: 49.0, quantity: 1 }
    ]
  }
});

// begin_checkout
window.dataLayer.push({
  event: 'begin_checkout',
  value: 49.0,
  currency: 'USD',
  ecommerce: {
    items: [
      { item_id: 'sku-123', item_name: 'Demo Product', price: 49.0, quantity: 1 }
    ]
  }
});

// purchase
window.dataLayer.push({
  event: 'purchase',
  transaction_id: 'T' + Math.floor(Math.random() * 1e7),
  value: 49.0,
  currency: 'USD',
  ecommerce: {
    items: [
      { item_id: 'sku-123', item_name: 'Demo Product', price: 49.0, quantity: 1 }
    ]
  }
});
```

### 7.3 Contact Form

```js
window.dataLayer.push({
  event: 'contact_form_submit',
  form_name: 'Contact',
  form_location: 'Contact Page'
  // Avoid PII like raw email/name unless hashed and policy-compliant
});
```

***

## 8) Test & Debug (The Right Way)

### 8.1 GTM Preview (Tag Assistant)

1.  In GTM, click **Preview**.
2.  Enter your local URL (`http://localhost:3000`) or the Vercel URL.
3.  Interact with pages and buttons; watch events appear in the **Tag Assistant** stream.
4.  Verify that your GA4 tags fire on the correct custom events and that parameters map correctly.

### 8.2 GA4 Realtime

1.  In GA4 → **Reports → Realtime**, confirm active users/events.
2.  Use the **Events** card to validate event names (exact matches).
3.  For e‑commerce, check DebugView (Admin → DebugView) with GTM Preview to inspect parameters.

> Tip: If events show in Tag Assistant but not in GA4 Realtime, confirm your **GA4 Configuration tag** is firing, and your **Measurement ID** is correct.

***

## 9) Best Practices & Conventions

*   **Consistent Naming**
    *   Tags: `GA4 – Event – <event_name>`
    *   Triggers: `CE – <event_name>` (Custom Event), `PV – All Pages`
    *   Variables: `DLV – <data_layer_key>`
*   **Map Once, Reuse Often**: Put GA4 Configuration on **All Pages** to simplify GA4 Event tags.
*   **Separation of Concerns**: App pushes **clean dataLayer events**; GTM handles transport/tagging.
*   **Use Recommended GA4 Event Names** (e.g., `view_item`, `add_to_cart`, `purchase`) to unlock native reports.
*   **No PII in GA4**: Avoid collecting raw emails/names. If needed, hash on client and validate policy compliance.
*   **Version & Publish Carefully**: Always **Preview**, then **Submit** changes with clear version notes.
*   **Environments**: Consider GTM **Environments** (Dev/QA/Prod) and Vercel env vars per environment.

***

## 10) Project Structure (Recap)

    ├── app/
    │   ├── layout.js          # Loads GTM via NEXT_PUBLIC_GTM_ID; noscript fallback
    │   ├── page.js            # Home page
    │   ├── products/
    │   │   └── page.js        # E-commerce demo events
    │   ├── checkout/
    │   │   └── page.js        # begin_checkout / purchase examples
    │   └── contact/
    │       └── page.js        # contact_form_submit example
    ├── lib/
    │   └── gtm.js             # helpers: dataLayer push, pageview helpers (optional usage)
    ├── package.json
    ├── next.config.js
    ├── .env.local             # add your IDs here (not committed)
    └── README.md              # this file

***

## 11) Common Issues & Fixes

*   **I see events in Tag Assistant, but nothing in GA4 Realtime**
    *   Confirm **GA4 – Config** tag fires on **All Pages**.
    *   Verify **Measurement ID** matches your web data stream.
    *   Check for blocked network requests (ad blockers, corporate firewall).

*   **Duplicate page\_view events**
    *   Ensure you're not manually pushing `page_view` on every route if GA4 Config already handles pageviews (for SPAs, push *virtual pageviews* only on route changes—avoid double counts).

*   **E‑commerce parameters missing**
    *   Ensure `ecommerce.items` exists **and** you map `items` param in the GA4 Event tag.
    *   For `purchase`, map `transaction_id`, `value`, and `currency` as top-level event params alongside `items`.

*   **Preview connects but shows no events**
    *   Open the site in the **same browser/profile** with third‑party cookies allowed; ensure your Vercel URL is accessible.

***

## 12) Extend This Practice

*   Add **outbound link** and **file download** tracking (use GTM's built‑in Click triggers + filters).
*   Add **scroll depth** trigger and a `scroll` event.
*   Introduce **consent mode** and default states (e.g., `ad_storage`/`analytics_storage` = denied until user consents).
*   Experiment with **Lookup Tables**: One GA4 Event tag fed by a table that maps event names to parameter sets.
*   Try a **Server-Side GA4** container later to improve data quality.

***

## 13) Resources

*   GA4 Event Reference  
    https://support.google.com/analytics/answer/9322688
*   Google Tag Manager Help Center  
    https://support.google.com/tagmanager
*   Consent Mode (Advanced)  
    https://support.google.com/analytics/answer/9976101
*   Next.js Docs  
    https://nextjs.org/docs
*   Vercel Deployment  
    https://vercel.com/docs

***

## License

Free to use for learning and practice.
