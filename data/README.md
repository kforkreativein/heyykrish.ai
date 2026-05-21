# Email Data Storage

This directory stores local email subscriptions, download leads, and contact inquiries.

## Files:
- `newsletter-subscribers.csv` - Newsletter signups from homepage and sidebar
- `download-leads.csv` - People who downloaded resources (name + email)
- `local/*.json` - Local app data used by the admin dashboard. This folder is ignored by git.

## Columns:

### newsletter-subscribers.csv
- Timestamp
- Email  
- Source (homepage/sidebar)

### download-leads.csv
- Timestamp
- Name
- Email
- Resource ID
- Resource Title

## Usage:
You can open these files in Excel, Google Sheets, or import into any email marketing service.
