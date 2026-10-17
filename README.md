# Indigo Jewellery — B2B Fine Diamond Jewellery Manufacturing

Digital flagship for **Indigo Jewellery** and **Indigo Evolve** (SV Group). Vertically integrated diamond jewellery manufacturing across 7 manufacturing units (250,000+ sq ft) in Mumbai and Surat.

---

## 💎 Features & Structure

* **Main Site (`index.html`)**: Natural mined diamond jewellery, company history, 7 manufacturing facilities, leadership, sustainability, and B2B partner inquiry form.
* **Lab-Grown Site (`indigo_evolve.html`)**: Indigo Evolve lab-grown diamond collections (Type IIa, CVD & HPHT), sustainability milestones, and wholesale inquiry form.
* **Serverless Backend (`api/contact.js`)**: Lead capture handler powered by [Resend](https://resend.com) with HTML email notifications.
* **Local Dev Server (`server.js`)**: Static asset server with API routing for local testing on `http://localhost:3000`.

---

## 🚀 Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/bandhir/indigo.git
   cd indigo
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env` and fill in your Resend credentials:
   ```bash
   cp .env.example .env
   ```
   ```env
   RESEND_API_KEY=re_your_api_key_here
   CONTACT_TO_EMAIL=ensure01@gmail.com
   CONTACT_FROM_EMAIL=Indigo Jewellery <info@svinodkumar.com>
   ```

4. **Start the local server**:
   ```bash
   npm start
   ```
   Open `http://localhost:3000` in your browser.

---

## ☁️ Deployment on Vercel

This repository is pre-configured for zero-config Vercel deployment:

1. Import this repository into your [Vercel Dashboard](https://vercel.com/new).
2. Set the following **Environment Variables** in Vercel Project Settings:
   * `RESEND_API_KEY`: Your Resend API key (`re_...`)
   * `CONTACT_TO_EMAIL`: `ensure01@gmail.com`
   * `CONTACT_FROM_EMAIL`: `Indigo Jewellery <info@svinodkumar.com>`
3. Deploy! Vercel will automatically serve the static pages and host `api/contact.js` as a serverless function.

---

## 🔒 Security

* Sensitive credentials (`.env`) are strictly excluded via `.gitignore`.
* Never commit production API keys to source control.
