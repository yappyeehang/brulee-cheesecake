# Brûlée Cheesecake Website

## Setup

```bash
npm install
npm start
```

## Pages

| URL | Description |
|-----|-------------|
| `/` | Home page |
| `/menu` | Product menu (reads from Google Sheets) |
| `/cart` | Cart & checkout (sends order via WhatsApp) |
| `/#/brulee-admin` | **Admin page** (password: `brulee2025`) |

## Adding Products

1. Open Google Sheets: https://docs.google.com/spreadsheets/d/1GAOkBLngJcf2E87Zmz521-l_mFipc9edRCyMydQb2rc
2. Add a new row with: id, name, category, price, description, available (TRUE/FALSE), image (optional URL)
3. The website updates automatically!

## Adding Product Images

Place images in `public/images/` folder, then in Google Sheets column G, put:
```
/images/your-image.jpg
```

## Admin Password

Change the password in `src/pages/Admin.jsx`:
```js
const PASSWORD = "brulee2025";
```

## Deploy to GitHub Pages

```bash
npm run build
npm run deploy
```

## WhatsApp Number

To change the WhatsApp number, edit `src/pages/Cart.jsx`:
```js
window.open(`https://wa.me/60164330090?text=...`)
```
