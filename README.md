# Facturo

<div align="center">

<img src="assets/logo.svg" alt="Facturo Logo" width="80" />

### Professional Invoice & Quotation Generator

**Create · Manage · Print**

A bilingual, privacy-focused invoicing application built with HTML5, CSS3, and Vanilla JavaScript.

![Version](https://img.shields.io/badge/version-1.0-0b2545?style=flat-square)
![HTML5](https://img.shields.io/badge/HTML5-e34f26?logo=html5&logoColor=white&style=flat-square)
![CSS3](https://img.shields.io/badge/CSS3-1572b6?logo=css3&logoColor=white&style=flat-square)
![JavaScript](https://img.shields.io/badge/Vanilla_JavaScript-f7df1e?logo=javascript&logoColor=black&style=flat-square)
![Languages](https://img.shields.io/badge/languages-FR%20%7C%20EN-5d6b82?style=flat-square)
![Dependencies](https://img.shields.io/badge/dependencies-0-2f6fed?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-2f6fed?style=flat-square)

<br />

<img src="assets/dashboard.png" alt="Facturo Dashboard" width="100%" />

</div>

---

## Overview

**Facturo** is a lightweight web application for creating, managing, and printing professional invoices and quotations.

Built with pure HTML5, CSS3, and Vanilla JavaScript, it provides real-time financial calculations, document management, bilingual support, and print-ready A4 layouts — without frameworks or external dependencies.

## Features

- **Document Management** — Create, edit, duplicate, delete, search, filter, and sort invoices and quotations.
- **Financial Calculations** — Automatic subtotals, discounts, taxes, totals, payments, and outstanding balances.
- **Quotation Conversion** — Convert quotations into invoices while preserving document details.
- **Dashboard** — View document statistics, payment summaries, and recent activity.
- **Company Branding** — Configure company information, tax identification, payment details, and logos.
- **Internationalization** — Complete English and French interfaces and generated documents.
- **Multiple Currencies** — EUR, USD, GBP, TND, MAD, CAD, and CHF.
- **A4 Document Output** — Live previews and browser-native PDF printing.
- **Responsive Interface** — Desktop, tablet, and mobile layouts.
- **Local Persistence** — Store documents and settings using browser `localStorage`.

## Screenshots

### Document Management

<img src="assets/list.png" alt="Facturo Document Management" width="100%" />

### Invoice Editor

<img src="assets/editor-invoice.png" alt="Facturo Invoice Editor with Live A4 Preview" width="100%" />

### Quotation Editor

<img src="assets/editor-quotation.png" alt="Facturo Quotation Editor" width="100%" />

### Company Settings

<img src="assets/settings.png" alt="Facturo Company Settings" width="100%" />

### English Interface

<img src="assets/dashboard-en.png" alt="Facturo Dashboard in English" width="100%" />

### A4 PDF Output

| Invoice | Quotation |
|:---:|:---:|
| <img src="assets/pdf-invoice.png" alt="Invoice PDF Preview" width="100%" /> | <img src="assets/pdf-quotation.png" alt="Quotation PDF Preview" width="100%" /> |

**Sample documents:** [Invoice PDF](assets/pdf-invoice.pdf) · [Quotation PDF](assets/pdf-quotation.pdf)

### Mobile Interface

| Dashboard | Navigation | Editor |
|:---:|:---:|:---:|
| <img src="assets/mobile-dashboard.png" alt="Mobile Dashboard" width="230" /> | <img src="assets/mobile-menu.png" alt="Mobile Navigation" width="230" /> | <img src="assets/mobile-editor.png" alt="Mobile Editor" width="230" /> |

## Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Semantic structure |
| CSS3 | Styling, Grid, Flexbox, responsive layouts, and print styles |
| Vanilla JavaScript | Application logic and financial calculations |
| LocalStorage | Client-side persistence |
| Intl API | Date and currency formatting |
| Browser Print | A4 documents and PDF output |

## Project Structure

```text
Facturo/
├── index.html
├── css/
│   ├── style.css
│   └── responsive.css
├── js/
│   ├── translations.js
│   ├── storage.js
│   ├── invoice.js
│   └── app.js
├── assets/
│   ├── logo.svg
│   ├── dashboard.png
│   ├── dashboard-en.png
│   ├── list.png
│   ├── editor-invoice.png
│   ├── editor-quotation.png
│   ├── settings.png
│   ├── pdf-invoice.png
│   ├── pdf-quotation.png
│   ├── mobile-dashboard.png
│   ├── mobile-menu.png
│   ├── mobile-editor.png
│   ├── pdf-invoice.pdf
│   └── pdf-quotation.pdf
├── README.md
└── LICENSE
```

## Getting Started

**1. Clone the repository**

```bash
git clone https://github.com/mohamedaziz-chebbi/Facturo.git
cd Facturo
```

**2. Launch the application**

Open `index.html` in your browser, or use the Live Server extension in Visual Studio Code.

No installation, build process, or package manager is required.

## Technical Highlights

- Modular JavaScript architecture with separated application logic, storage, calculations, and translations.
- Reusable document rendering for live previews and printed output.
- Centralized English and French translation dictionaries.
- Input validation and guarded local storage operations.
- Responsive layouts and print-specific CSS.
- No frameworks, external libraries, or CDN dependencies.

## Privacy & Limitations

- Application data is stored locally in the browser.
- Data is not encrypted by the application or synchronized across devices.
- Clearing browser site data may remove saved records.
- Mixed-currency totals are not automatically converted.
- Tax rates and fiscal information must be verified by the user.
- Facturo does not guarantee compliance with the invoicing regulations of any particular country.

## Roadmap

- [ ] JSON import and export
- [ ] CSV export and date-range filtering
- [ ] Client and product catalogs
- [ ] Partial payment tracking
- [ ] Automated tests
- [ ] Arabic language and RTL support
- [ ] Installable Progressive Web App (PWA)

## Developer

**Mohamed Aziz Chebbi**  
Computer Science Student

## License

Released under the [MIT License](LICENSE).

---

<div align="center">

<img src="assets/logo.svg" alt="Facturo Logo" width="44" />

**Facturo** · Version 1.0

Developed by **Mohamed Aziz Chebbi**

</div>